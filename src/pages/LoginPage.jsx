import React, { useEffect } from "react";
import { initVKID, onVKSuccess, onVKError } from "../services/auth";

export default function LoginPage() {
  useEffect(() => {
    initVKID({
      containerId: "vk-login-container",
      scope: "groups",
    });
    window.vkidOnSuccess = onVKSuccess;
    window.vkidOnError = onVKError;
  }, []);

  return (
    <div>
      <h1>Войдите через ВКонтакте</h1>
      <div id="vk-login-container"></div>
    </div>
  );
}
