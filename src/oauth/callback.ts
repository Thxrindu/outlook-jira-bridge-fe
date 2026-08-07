console.log("OAuth callback loaded");

const params = new URLSearchParams(window.location.search);

const code = params.get("code");

const state = params.get("state");


Office.onReady(() => {

    Office.context.ui.messageParent(
        JSON.stringify({

            code,

            state

        })
    );

});