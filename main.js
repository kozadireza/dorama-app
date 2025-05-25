(function () {
  const clientId = 53621217; // замените на ваш client_id из настроек VK
  // redirect_uri = текущий URL без хеша
  const redirect = window.location.origin + window.location.pathname;

  // 1) Рисуем ссылку «Войти через VK»
  const auth = document.getElementById("vk-auth");
  const btn = document.createElement("a");
  btn.href =
    "https://oauth.vk.com/authorize?" +
    "client_id=" +
    clientId +
    "&" +
    "display=page&" +
    "scope=video,groups&" +
    "response_type=token&" +
    "v=5.131&" +
    "redirect_uri=" +
    encodeURIComponent(redirect);
  btn.textContent = "Войти через VK";
  btn.className = "vk-btn";
  auth.append(btn);

  // 2) Извлечение access_token из URL (hash)
  function getToken() {
    const hash = window.location.hash.substring(1);
    return new URLSearchParams(hash).get("access_token");
  }

  // 3) Ошибки
  function showError(msg) {
    console.error("Error:", msg);
    document.getElementById("video-list").innerText = "Ошибка: " + msg;
  }

  // 4) Запрос списка групп
  function loadGroups(token) {
    fetch(
      `https://api.vk.com/method/groups.get?extended=1&v=5.131&access_token=${token}`
    )
      .then((r) => r.json())
      .then((json) => {
        if (json.error) throw new Error(json.error.error_msg);
        const list = json.response.items;
        let html = "<h2>Ваши группы:</h2>";
        list.forEach((g) => {
          html += `<div class="group"><b>${g.name}</b> (ID:${g.id})</div>`;
        });
        document.getElementById("video-list").innerHTML = html;
        auth.remove(); // прячем кнопку
      })
      .catch((e) => showError(e.message));
  }

  // 5) Если токен уже есть — сразу грузим
  const token = getToken();
  if (token) loadGroups(token);
})();
