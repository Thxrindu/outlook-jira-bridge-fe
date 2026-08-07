import { hideLoader, showLoader } from "./loading";
import { populateDropdown } from "../taskpane/formRenderer";
import { showError } from "./messages";
import { getIssueTypes } from "../jira/jiraApi";
import { loadJiraMetadata } from "../jira/metadataService";

export async function setupProjectChangeListener() {
  const projectDropdown = document.getElementById("projectId") as HTMLSelectElement;

  console.log("projectDropdown", projectDropdown);

  projectDropdown.addEventListener("change", async () => {
    const projectId = projectDropdown.value;

    if (!projectId) {
      return;
    }

    try {
      showLoader("Loading issue types...");

      const issueTypes = await getIssueTypes(projectId);

      populateDropdown("issueTypeId", issueTypes.issueTypes, "-- Select Issue Type --");
    } catch (error) {
      console.error("Issue type loading failed", error);

      showError("Unable to load issue types");
    } finally {
      hideLoader();
    }
  });
}

export async function setupIssueTypeChangeListener() {
  const projectDropdown = document.getElementById("projectId") as HTMLSelectElement;

  const issueTypeDropdown = document.getElementById("issueTypeId") as HTMLSelectElement;

  issueTypeDropdown.addEventListener("change", async () => {
    const projectId = projectDropdown.value;

    const issueTypeId = issueTypeDropdown.value;

    if (!projectId || !issueTypeId) {
      return;
    }

    try {
      showLoader("Loading fields...");

      const metadata = await loadJiraMetadata(projectId, issueTypeId);

      console.log("Dynamic metadata", metadata);

      const categoryField = metadata.fields.find((field) => field.name === "Category");

      console.log("categoryField", categoryField.allowedValues);

      if (categoryField?.allowedValues) {
        populateDropdown("categoryId", categoryField.allowedValues, "-- Select Category --");
      }

      const componentField = metadata.fields.find((field) => field.name === "Component");

      if (componentField?.allowedValues) {
        populateDropdown("componentId", componentField.allowedValues, "-- Select Component --");
      }
    } finally {
      hideLoader();
    }
  });
}
