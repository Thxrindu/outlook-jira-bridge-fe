export interface JiraSession {
  sessionId: string;

  user: any;
}

let jiraSession: JiraSession | null = null;

export function setJiraSession(session: JiraSession) {
  jiraSession = session;
}

export function getJiraSession(): JiraSession | null {
  return jiraSession;
}

export function getCurrentSessionId(): string {
  return jiraSession?.sessionId ?? "";
}

// export function updateJiraSession(session: JiraSession) {
//   jiraSession = session;
// }
