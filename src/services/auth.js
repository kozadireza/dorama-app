export function saveToken(data) {
  sessionStorage.setItem("vkAuth", JSON.stringify(data));
}

export function getToken() {
  return JSON.parse(sessionStorage.getItem("vkAuth") || "null");
}

export function isLoggedIn() {
  const tk = getToken();
  return Boolean(tk && tk.access_token);
}

export function initVKID({ containerId, scope }) {
  const SDK = window.VKIDSDK;
  SDK.Config.init({
    app: 53621233,
    redirectUrl: "https://kozadireza.github.io/dorama-portal/",
    responseMode: SDK.ConfigResponseMode.Callback,
    source: SDK.ConfigSource.LOWCODE,
    scope,
  });

  const widget = new SDK.OneTap();
  widget
    .render({
      container: document.getElementById(containerId),
      showAlternativeLogin: true,
    })
    .on(SDK.WidgetEvents.ERROR, onVKError)
    .on(SDK.OneTapInternalEvents.LOGIN_SUCCESS, ({ code, device_id }) => {
      SDK.Auth.exchangeCode(code, device_id).then(onVKSuccess).catch(onVKError);
    });
}

export function onVKSuccess(data) {
  saveToken(data);
  window.location.hash = "#/groups";
}

export function onVKError(err) {
  console.error("VKID Error:", err);
}
