// export interface RequestData {

//     category: string;
//     reason: string;
//     referenceNo: string;
//     handler: string;

// }

export interface RequestData {
  projectId: string;

  issueTypeId: string;

  categoryId: string;

  categoryName?: string;

  componentId: string;

  reason: string;

  referenceNo: string;

  handler: string;

  labels: string;
}

export interface JiraTokenResponse {
  access_token: string;

  refresh_token: string;

  expires_in: number;

  scope: string;

  token_type: string;
}
