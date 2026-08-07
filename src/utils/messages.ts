// export function showSuccess(message: string) {

//     const output =
//         document.getElementById("item-subject")!;

//     output.style.display = "block";

//     output.innerHTML =
//         `<span style="color:green;">✓ ${message}</span>`;

// }

import { showToast } from "../utils/nortification";

export function showSuccess(message: string) {
  showToast(`✓ ${message}`, "success");

  const output = document.getElementById("item-subject")!;

  output.style.display = "block";

  output.innerHTML = `
    <strong>
    Last Action
    </strong>
    <br><br>
    ✓ ${message}
    `;
}

// export function showError(message: string) {
//   const output = document.getElementById("item-subject")!;

//   output.style.display = "block";

//   output.innerHTML = `<span style="color:red;">${message}</span>`;
// }

export function showError(message: string) {
  showToast(`⚠ ${message}`, "error");

  const output = document.getElementById("item-subject")!;

  output.style.display = "block";

  output.innerHTML = `
    <strong>
    Error
    </strong>

    <br><br>

    ${message}
    `;
}
