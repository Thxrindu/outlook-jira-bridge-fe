import { loadJiraConfiguration } from "./jiraApi";
import { updateJiraAccountUI } from "./authUI";
import { populateDropdown } from "../taskpane/formRenderer";
import { setupIssueTypeChangeListener, setupProjectChangeListener } from "../utils/listners";

export async function initializeJiraUI(user: any) {
  updateJiraAccountUI(user.displayName, user.avatarUrls);

  const configuration = await loadJiraConfiguration();

  console.log("Jira Configuration", configuration);

  populateDropdown("projectId", configuration.projects, "-- Select Project --");

  setupProjectChangeListener();
  setupIssueTypeChangeListener();
}
