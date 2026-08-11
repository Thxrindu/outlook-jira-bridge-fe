import { RequestData } from "../models/types";
import { showLoader, hideLoader } from "../utils/loading";
import { JIRA_CONFIG } from "../config/jiraConfig";
import { backendApi } from "../helpers/apiHelper";
import { showError } from "../utils/messages";
import { APP_CONFIG } from "../config/appConfig";
import { setJiraSession } from "./session";

//backend call
export async function createJiraIssue(request: any) {
  const response = await backendApi("/api/jira/issue/create", {
    method: "POST",

    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Unable to create Jira issue");
  }

  return await response.json();
}

export async function getProjects() {
  try {
    const response = await backendApi("/api/jira/projects", {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message === "LOGIN_REQUIRED") {
      showError("Please sign in to Jira before continuing.");
      return;
    }

    showError(error instanceof Error ? error.message : "Unexpected error.");
  }
}

// backend call
export async function getIssueTypes(projectId: string) {
  const response = await backendApi(`/api/jira/projects/${projectId}/issuetypes`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve issue types");
  }

  return await response.json();
}

export async function getCreateIssueTypes(accessToken: string, cloudId: string, projectId: string) {
  const response = await fetch(
    `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/createmeta/${projectId}/issuetypes`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();

  console.log("Create Issue Types:");
  console.log(data);

  return data;
}

export async function getAccessibleResources(accessToken: string) {
  const response = await fetch("https://api.atlassian.com/oauth/token/accessible-resources", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();

  console.log("Accessible Jira Resources:CLOUDID");
  console.log(data);
}

export async function getCurrentJiraUser(accessToken: string, cloudId: string) {
  console.log("myself API token:");
  console.log(accessToken);

  console.log("cloudId:");
  console.log(cloudId);

  const response = await fetch(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/myself`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve Jira user information.");
  }

  const data = await response.json();

  console.log("Current Jira User:");
  console.log(data);

  return data;
}

export async function getCreateMetadata(
  accessToken: string,
  cloudId: string,
  projectId: string,
  issueTypeId: string
) {
  const response = await fetch(
    `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issue/createmeta/${projectId}/issuetypes/${issueTypeId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();

  console.log("META DATA:");
  console.log(data);

  return data;
}

export async function loadJiraConfiguration() {
  const response = await backendApi("/api/jira/configuration", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Unable to load configuration");
  }

  return response.json();
}

export async function restoreJiraSession() {
  const sessionId = localStorage.getItem("jira_session_id");

  if (!sessionId) {
    return null;
  }

  const response = await fetch(`${APP_CONFIG.apiUrl}/api/auth/session`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("jira_session_id");
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to restore Jira session");
  }

  const data = await response.json();

  setJiraSession({
    sessionId: data.sessionId,
    user: data.user,
  });

  return data;
}
