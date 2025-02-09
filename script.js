function openArticle(url) {
    window.open(url, "_blank");
}



document.addEventListener("DOMContentLoaded", () => {
    // Select all grid items
    const gridItems = document.querySelectorAll(".grid-item");

    gridItems.forEach(item => {
        item.addEventListener("click", () => {
            // Get the URL from the data attribute
            const url = item.getAttribute("data-url");
            if (url) {
                window.location.href = url; // Redirect to the URL
            }
        });
    });
});