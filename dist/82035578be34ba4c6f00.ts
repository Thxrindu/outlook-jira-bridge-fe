console.log("OAuth callback loaded");
var params = new URLSearchParams(window.location.search);
var code = params.get("code");
var state = params.get("state");
Office.onReady(function () {
  Office.context.ui.messageParent(JSON.stringify({
    code: code,
    state: state
  }));
});