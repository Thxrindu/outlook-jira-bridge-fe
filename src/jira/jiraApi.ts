import { RequestData } from "../models/types";
import { showLoader, hideLoader } from "../utils/loading";
import { JIRA_CONFIG } from "../config/jiraConfig";
import { backendApi } from "../helpers/apiHelper";
import { showError } from "../utils/messages";
// import { getAccessToken, getCloudId } from "./oauth";

// export async function createJiraIssue(
//     accessToken: string,
//     cloudId: string,
//     request: RequestData
// ) {

//     showLoader("Creating Jira issue...");

//     const payload = {
//         fields: {

//             project: {
//                 id: JIRA_CONFIG.project.id
//             },

//             issuetype: {
//                 id: JIRA_CONFIG.issueType.id
//             },

//             summary: request.referenceNo,

//             description: {
//                 type: "doc",
//                 version: 1,
//                 content: [
//                     {
//                         type: "paragraph",
//                         content: [
//                             {
//                                 type: "text",
//                                 text: `Category: ${request.categoryId}`
//                             }
//                         ]
//                     },
//                     {
//                         type: "paragraph",
//                         content: [
//                             {
//                                 type: "text",
//                                 text: `Reason: ${request.reason}`
//                             }
//                         ]
//                     },
//                     {
//                         type: "paragraph",
//                         content: [
//                             {
//                                 type: "text",
//                                 text: `Ref. No.: ${request.referenceNo}`
//                             }
//                         ]
//                     },
//                     {
//                         type: "paragraph",
//                         content: [
//                             {
//                                 type: "text",
//                                 text: `Script Handle By: ${request.handler}`
//                             }
//                         ]
//                     }
//                 ]
//             },

//             customfield_10044: {
//                 id: request.categoryId
//             },

//             customfield_10046: {
//                 id: request.componentId
//             }

//         }
//     };

//     const url = `${JIRA_CONFIG.apiBaseUrl}/${cloudId}/rest/api/3/issue`;

//     const response = await fetch(
//         url,
//         {
//             method: "POST",

//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 Accept: "application/json",
//                 "Content-Type": "application/json"
//             },

//             body: JSON.stringify(payload)
//         }
//     );

//     const data = await response.json();

//     console.log("Jira Create Response:");
//     console.log(data);

//     if (data.key) {

//         return `https://outlook-jira.atlassian.net/browse/${data.key}`;

//     }

//     throw new Error("Jira issue creation failed");

//     hideLoader();

// }

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

// export async function getProjects(accessToken: string, cloudId: string) {
//   const response = await fetch(
//     `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/project/search`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         Accept: "application/json",
//       },
//     }
//   );

//   const data = await response.json();

//   console.log("Projects:");
//   console.log(data);

//   return data;
// }

export async function getProjects() {
  // const response = await fetch("http://localhost:3001/api/jira/projects", {
  //   method: "POST",

  //   headers: {
  //     "Content-Type": "application/json",
  //   },

  //   body: JSON.stringify({
  //     accessToken: getAccessToken(),

  //     cloudId: getCloudId(),
  //   }),
  // });

  // const data = await response.json();

  // console.log("Backend Projects:");

  // console.log(data);

  // return data;

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

// export async function getIssueTypes(accessToken: string, cloudId: string) {
//   const response = await fetch(
//     `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/issuetype`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         Accept: "application/json",
//       },
//     }
//   );

//   const data = await response.json();

//   console.log("Issue Types:");
//   console.log(data);
// }

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
