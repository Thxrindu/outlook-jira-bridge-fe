export function populateDropdown(elementId: string, options: any[], placeholder: string) {
  const select = document.getElementById(elementId) as HTMLSelectElement;

  if (!select) {
    return;
  }

  // keep placeholder
  select.innerHTML = `
        <option value="">
            ${placeholder}
        </option>
    `;

  console.log("options", options);

  options.forEach((option) => {
    const item = document.createElement("option");

    item.value = option.id;

    item.text = option.value ? option.value : option.name;

    select.appendChild(item);
  });
}
