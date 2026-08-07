import { RequestData } from "../models/types";

export function buildEmailTemplate(request: RequestData, jiraUrl: string): string {
  return `

    <p>
        Dear All,
    </p>

    <p>
        Please grant approval to execute the following script on the
        <b>AFIN LIVE</b> database.
    </p>

    <br>

    <p>
        Dear DB Team,
    </p>

    <p>
        Please find the below section in reference to an AFIN IT request.
    </p>

    <br>

    <p>
        <b>Category:</b> ${request.categoryName}
        &nbsp;|&nbsp;

        <b>Reason:</b> ${request.reason}
        &nbsp;|&nbsp;

        <b>Ref. No.:</b> ${request.referenceNo}
        &nbsp;|&nbsp;

         <b>Jira:</b> <a href="${jiraUrl}" target="_blank"> VIEW_JIRA </a>
        <!--<b>Jira:</b> ${jiraUrl}-->
        &nbsp;|&nbsp;


        <b>Script Handle By:</b> ${request.handler}
    </p>

    <br>

    <p>
        <b>Note:</b>
        Once the script has been executed, please confirm by sending a verification email.
    </p>

    `;
}
