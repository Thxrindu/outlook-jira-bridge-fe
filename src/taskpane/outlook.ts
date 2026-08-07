/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

import { createJiraIssue, getProjects } from "../jira/jiraApi";
import { buildEmailTemplate } from "../email/emailTemplate";
import { RequestData } from "../models/types";
import { showSuccess, showError } from "../utils/messages";
import { showLoader, hideLoader } from "../utils/loading";
import { getRecipients } from "../email/recipients";
import { validateRequest } from "../utils/validation";
import { loginToJira } from "../jira/oauth";
import { getJiraSession } from "../jira/session";

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "block";
    document.getElementById("run").onclick = runOutlook;
    document.getElementById("jira-login")!.onclick = loginToJira;
  }
});

export async function runOutlook() {
  const runButton = document.getElementById("run") as HTMLButtonElement;

  runButton.disabled = true;

  try {
    // Check Jira login first
    const session = getJiraSession();

    if (!session) {
      showError("Please sign in to Jira.");
      return;
    }

    const project = await getProjects();
    console.log("project", project);
    const category = document.getElementById("categoryId") as HTMLSelectElement;

    const request: RequestData = {
      projectId: (document.getElementById("projectId") as HTMLSelectElement).value,
      categoryId: category.value,
      // categoryName: category.options[category.selectedIndex].text,
      categoryName: category.selectedOptions[0]?.text || "",
      reason: (document.getElementById("reason") as HTMLTextAreaElement).value,
      referenceNo: (document.getElementById("referenceNo") as HTMLInputElement).value,
      handler: (document.getElementById("handler") as HTMLInputElement).value,
      issueTypeId: (document.getElementById("issueTypeId") as HTMLSelectElement).value,
      componentId: (document.getElementById("componentId") as HTMLSelectElement).value,
      labels: "",
    };

    const validationError = validateRequest(request);

    if (validationError) {
      showError(validationError);
      return;
    }

    showLoader("Creating Jira issue...");

    const jiraIssue = await createJiraIssue(request);

    console.log("Created issue", jiraIssue);

    const emailTemplate = buildEmailTemplate(request, jiraIssue.self);

    showLoader("Updating Outlook email...");

    const item = Office.context.mailbox.item as Office.MessageCompose;

    await new Promise<void>((resolve, reject) => {
      item.body.prependAsync(
        emailTemplate,
        {
          coercionType: Office.CoercionType.Html,
        },

        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            resolve();
          } else {
            reject(result.error.message);
          }
        }
      );
    });

    const recipients = getRecipients(request);

    item.to.setAsync(recipients.to);

    item.cc.setAsync(recipients.cc);

    showSuccess("Email template inserted successfully.");
  } catch (error) {
    console.error("Request generation failed:", error);

    showError(error instanceof Error ? error.message : String(error));
  } finally {
    hideLoader();

    runButton.disabled = false;
  }
}
