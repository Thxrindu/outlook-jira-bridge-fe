// //this is only used for testing purposes

// import { getCreateIssueTypes, getCreateMetadata, getIssueTypes, getProjects } from "./jiraApi";

// import { getAccessToken } from "../jira/oauth";

// import { getCloudId } from "../jira/oauth";

// import { JIRA_CONFIG } from "../config/jiraConfig";

// // function output(data: any) {

// //     const result =
// //         document.getElementById(
// //             "apiResult"
// //         ) as HTMLTextAreaElement;

// //     result.value =
// //         JSON.stringify(
// //             data,
// //             null,
// //             2
// //         );

// // }

// // export async function testProjects() {
// //   const projects = await getProjects(getAccessToken(), getCloudId());
// // }

// export async function testIssueTypes() {
//   const issueTypes = await getCreateIssueTypes(
//     getAccessToken(),
//     getCloudId(),
//     JIRA_CONFIG.project.id
//   );
// }

// export async function testCreateMeta() {
//   const metaData = await getCreateMetadata(
//     getAccessToken(),
//     getCloudId(),
//     JIRA_CONFIG.project.id,
//     JIRA_CONFIG.issueType.id
//   );
// }

// export async function testBackendProjects() {
//   const response = await fetch("http://localhost:3001/api/jira/projects", {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       accessToken: getAccessToken(),

//       cloudId: getCloudId(),
//     }),
//   });

//   const data = await response.json();

//   console.log("Backend Projects:");

//   console.log(data);
// }

// export async function testBackendIssueTypes() {
//   const response = await fetch(
//     "http://localhost:3001/api/jira/projects/10000/issuetypes",

//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify({
//         accessToken: getAccessToken(),

//         cloudId: getCloudId(),
//       }),
//     }
//   );

//   const data = await response.json();

//   console.log("Backend Issue Types:");

//   console.log(data);
// }

// export async function testBackendMetadata() {
//   const response = await fetch(
//     "http://localhost:3001/api/jira/projects/10000/issuetypes/10003/metadata",

//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify({
//         accessToken: getAccessToken(),

//         cloudId: getCloudId(),
//       }),
//     }
//   );

//   const data = await response.json();

//   console.log("Backend Metadata:");

//   console.log(data);
// }

// export async function testCreateIssue() {
//   const issueData = {
//     fields: {
//       project: {
//         id: "10000",
//       },

//       issuetype: {
//         id: "10003",
//       },

//       summary: "Backend API Test Issue",

//       description: {
//         type: "doc",
//         version: 1,
//         content: [
//           {
//             type: "paragraph",
//             content: [
//               {
//                 type: "text",
//                 text: "Created from Outlook",
//               },
//             ],
//           },
//         ],
//       },

//       customfield_10044: {
//         id: "10020",
//       },

//       customfield_10046: {
//         id: "10022",
//       },
//       labels: ["backend-test"],
//     },
//   };

//   const response = await fetch(
//     "http://localhost:3001/api/jira/issue/create",

//     {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify({
//         accessToken: getAccessToken(),

//         cloudId: getCloudId(),

//         issueData,
//       }),
//     }
//   );

//   const data = await response.json();

//   console.log("Created Jira Issue:");

//   console.log(data);
// }
