import { showLoader, hideLoader } from "../utils/loading";
import { setJiraSession } from "./session";
import { updateJiraAccountUI } from "./authUI";
import { loadJiraMetadata } from "./metadataService";
import { populateDropdown } from "../taskpane/formRenderer";
import { loadJiraConfiguration } from "./jiraApi";
import { setupIssueTypeChangeListener, setupProjectChangeListener } from "../utils/listners";

const JIRA_CLIENT_ID = "ZvZ89GrSZ97P1WeTi7CSOAkhkOeTUd6y";
// const JIRA_CLIENT_ID = "fMQvJka21QNyHOZ7PQHtxbK2TGRo4uJ4";
const REDIRECT_URI = "https://localhost:3000/oauth/callback.html";
const AUTHORIZATION_URL = "https://auth.atlassian.com/authorize";

export async function exchangeCodeForToken(code: string) {
  const codeVerifier = sessionStorage.getItem("jira_code_verifier");

  const response = await fetch("http://localhost:3001/api/auth/token", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      code,
      codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend token exchange failed");
  }

  const data = await response.json();

  return data;
}

function generateRandomString(length: number): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

  const randomValues = new Uint8Array(length);

  crypto.getRandomValues(randomValues);

  return Array.from(randomValues)
    .map((value) => charset[value % charset.length])
    .join("");
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();

  const data = encoder.encode(verifier);

  const digest = await crypto.subtle.digest("SHA-256", data);

  return base64UrlEncode(digest);
}

export async function loginToJira() {
  showLoader("Logging into Jira...");
  const loginButton = document.getElementById("jira-login") as HTMLButtonElement;

  loginButton.disabled = true;

  const verifier = generateRandomString(64);

  const challenge = await generateCodeChallenge(verifier);

  sessionStorage.setItem("jira_code_verifier", verifier);

  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    audience: "api.atlassian.com",

    client_id: JIRA_CLIENT_ID,

    scope: "read:jira-user read:jira-work write:jira-work offline_access",

    redirect_uri: REDIRECT_URI,

    response_type: "code",

    prompt: "consent",

    state: state,

    code_challenge: challenge,

    code_challenge_method: "S256",
  });

  const authUrl = `${AUTHORIZATION_URL}?${params.toString()}`;

  const dialogUrl = `https://localhost:3000/oauth/login.html?url=${encodeURIComponent(authUrl)}`;

  Office.context.ui.displayDialogAsync(
    dialogUrl,
    {
      height: 60,
      width: 40,
      displayInIframe: false,
    },
    function (asyncResult) {
      if (asyncResult.status === Office.AsyncResultStatus.Failed) {
        console.error(asyncResult.error.message);
        return;
      }

      const dialog = asyncResult.value;

      dialog.addEventHandler(
        Office.EventType.DialogMessageReceived,

        async function (arg) {
          const result = JSON.parse(arg.message);

          const jiraUser = await exchangeCodeForToken(result.code);

          setJiraSession({
            sessionId: jiraUser.sessionId,
            user: jiraUser.user,
          });

          localStorage.setItem("jira_session_id", jiraUser.sessionId);

          updateJiraAccountUI(jiraUser.user.displayName, jiraUser.user.avatarUrls);

          // const metadata = await loadJiraMetadata();

          // const categoryField = metadata.fields.find((field) => field.name === "Category");
          // //   console.log(categoryField);
          // if (categoryField?.options) {
          //   populateDropdown("categoryId", categoryField.options, "-- Select Category --");
          // }

          // const componentField = metadata.fields.find((field) => field.name === "Component");
          // //   console.log(componentField);

          // if (componentField?.options) {
          //   populateDropdown("componentId", componentField.options, "-- Select component --");
          // }

          const configuration = await loadJiraConfiguration();

          console.log("Jira Configuration", configuration);

          // Load projects

          populateDropdown("projectId", configuration.projects, "-- Select Project --");

          setupProjectChangeListener();

          setupIssueTypeChangeListener();

          const output = document.getElementById("item-subject");

          output.style.display = "block";

          output.innerHTML = `
          <span style="color:green;">
          Login success
          </span>
          `;

          dialog.close();
        }
      );
    }
  );
  loginButton.disabled = false;
  hideLoader();
}
