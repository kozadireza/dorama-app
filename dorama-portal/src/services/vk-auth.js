import { initVKID } from "../services/auth";

// Убедимся, что DOM и SDK готовы
window.addEventListener("DOMContentLoaded", () => {
  if (!window.VKIDSDK) {
    console.error(
      "VKID SDK не загружен. Проверьте правильность пути к скрипту."
    );
    return;
  }

  // Инициализируем виджет после загрузки SDK и DOM
  initVKID({
    containerId: "vk-login-container",
    scope: "groups",
  });
});
