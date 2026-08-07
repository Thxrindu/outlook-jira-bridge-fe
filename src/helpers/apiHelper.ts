import { showError } from "../utils/messages";
import { getCurrentSessionId } from "../jira/session";
// const API_URL = process.env.OUTLOOK_API_URL;
import { APP_CONFIG } from "../config/appConfig";

export async function backendApi(url: string, options: any = {}) {
  const sessionId = getCurrentSessionId();

  // fetch(`${APP_CONFIG.apiUrl}/api/jira/projects`);

  if (sessionId == "") {
    throw new Error("LOGIN_REQUIRED");
  }

  return fetch(`${APP_CONFIG.apiUrl}${url}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${sessionId}`,

      ...(options.headers || {}),
    },
  });
}
