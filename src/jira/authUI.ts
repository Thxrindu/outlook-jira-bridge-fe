export function updateJiraAccountUI(username?: string, userImage?: any[]) {
  const name = document.getElementById("jira-user-name");
  const handlerInput = document.getElementById("handler") as HTMLInputElement;
  const status = document.getElementById("jira-user-status");
  // const bridge = document.getElementById("bridge-section");
  const image = document.getElementById("jira-profile-image") as HTMLImageElement;

  const loginButton = document.getElementById("jira-login") as HTMLButtonElement;

  if (!name || !loginButton) {
    console.error("Jira account UI elements not found.");
    return;
  }

  if (username) {
    name!.innerHTML = username;

    if (handlerInput) {
      handlerInput.value = username;
      handlerInput.disabled = false;
    }

    image.src = userImage ? userImage["48x48"] : "";

    status!.innerHTML = "";

    loginButton.style.display = "none";

    // bridge.style.display = "block";
  } else {
    name!.innerHTML = "Not signed in";

    loginButton.style.display = "block";
  }
}
