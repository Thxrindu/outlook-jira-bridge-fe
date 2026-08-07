import { RequestData } from "../models/types";


interface Recipients {

    to: Office.EmailAddressDetails[];

    cc: Office.EmailAddressDetails[];

}


export function getRecipients(
    request: RequestData
): Recipients {


    const to: Office.EmailAddressDetails[] = [];

    const cc: Office.EmailAddressDetails[] = [];


    if (
        request.categoryName === "System Bug" ||
        request.categoryName === "System Modification" ||
        request.categoryName === "System Maintenance"
    ) {


        to.push({
            emailAddress: "AFINIT-SCRIPT-APPROVE@assetlinefinance.lk",
            displayName: "AFINIT-SCRIPT-APPROVE"
        });


        cc.push({
            emailAddress: "AFINIT-QA@assetlinefinance.lk",
            displayName: "AFINIT-QA"
        });


        cc.push({
            emailAddress: "AFINIT-SUPPORT@assetlinefinance.lk",
            displayName: "AFINIT-SW-SUPPORT"
        });


    } else {


        to.push({
            emailAddress: "AFINIT-QA@assetlinefinance.lk",
            displayName: "AFINIT-QA"
        });


        cc.push({
            emailAddress: "AFINIT-SUPPORT@assetlinefinance.lk",
            displayName: "AFINIT-SW-SUPPORT"
        });

    }


    return {
        to,
        cc
    };

}