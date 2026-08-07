export const APP_CONFIG = {
  cloudId: "148f8e3d-8a9b-4b69-bf29-16d9813d8226",
  // cloudId: "e5611b8f-f17e-4398-a1a0-75c6aab614d0"
  apiUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://your-api-url.azurewebsites.net",
};
