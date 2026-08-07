import { backendApi } from "../helpers/apiHelper";
import { getJiraSession } from "./session";

// export async function loadJiraMetadata() {
//   const response = await backendApi("/api/jira/metadata", {
//     method: "POST",
//   });

//   if (!response.ok) {
//     throw new Error("Unable to load metadata");
//   }

//   return response.json();
// }

export async function loadJiraMetadata(projectId: string, issueTypeId: string) {
  const response = await backendApi(
    `/api/jira/projects/${projectId}/issuetypes/${issueTypeId}/metadata`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load metadata");
  }

  return response.json();
}
