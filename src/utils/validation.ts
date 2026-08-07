import { RequestData } from "../models/types";

export function validateRequest(request: RequestData): string | null {
  if (!request.projectId) {
    return "Please select a project.";
  }
  if (!request.issueTypeId) {
    return "Please select a issue type.";
  }
  if (!request.categoryId) {
    return "Please select a category.";
  }

  if (!request.componentId.trim()) {
    return "Please enter the JIRA component";
  }

  if (!request.reason.trim()) {
    return "Please enter a reason.";
  }

  if (!request.referenceNo.trim()) {
    return "Please enter a reference number.";
  }

  if (!request.handler.trim()) {
    return "Please enter the script handler.";
  }

  return null;
}
