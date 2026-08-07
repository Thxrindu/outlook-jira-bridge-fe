export function showLoader(message: string) {

    const overlay =
        document.getElementById("loading-overlay")!;

    const text =
        document.getElementById("loading-text")!;

    text.innerHTML = message;

    overlay.style.display = "flex";

}

export function hideLoader() {

    document.getElementById("loading-overlay")!
        .style.display = "none";

}