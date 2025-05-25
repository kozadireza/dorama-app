// vk-auth.js

// Проверяем, что SDK загрузился
if ("VKIDSDK" in window) {
  const VKID = window.VKIDSDK;

  // Конфигурируем SDK
  VKID.Config.init({
    app: 53621233,
    redirectUrl: "https://kozadireza.github.io/dorama-portal/",
    responseMode: VKID.ConfigResponseMode.Callback,
    source: VKID.ConfigSource.LOWCODE,
    scope: "groups", // Запрашиваем доступ к списку групп
  });

  // Инициализируем и рендерим OneTap-виджет
  const oneTap = new VKID.OneTap();
  oneTap
    .render({
      container: document.getElementById("vk-login-container"),
      showAlternativeLogin: true,
    })
    .on(VKID.WidgetEvents.ERROR, vkidOnError)
    .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, ({ code, device_id }) => {
      // Обмениваем код на токены
      VKID.Auth.exchangeCode(code, device_id)
        .then(vkidOnSuccess)
        .catch(vkidOnError);
    });
}

// Функция-обработчик успешной авторизации
function vkidOnSuccess(data) {
  console.log("VKID Auth Success:", data);
  // Здесь можно вызвать методы API, например:
  // getUserGroups(data.access_token, data.user_id);
}

// Функция-обработчик ошибок
function vkidOnError(error) {
  console.error("VKID Error:", error);
}

// Пример функции для получения списка групп (необязательно здесь)
async function getUserGroups(access_token, user_id) {
  const apiBase = "https://api.vk.com/method";
  const apiVersion = "5.131";

  const response = await fetch(
    `${apiBase}/groups.get?access_token=${access_token}` +
      `&user_id=${user_id}&extended=1&count=1000&v=${apiVersion}`
  );
  const json = await response.json();
  console.log("Группы пользователя:", json.response.items);
}
