document.addEventListener("DOMContentLoaded", function() {
    // Hamburger dropdown functionality
    const hamburger = document.querySelector(".hamburger");
    const hamburgerDropdown = document.querySelector(".hamburger-dropdown");

    hamburger.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent the click from closing the dropdown immediately
        hamburgerDropdown.style.display = hamburgerDropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function(event) {
        if (!event.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown-content").forEach(dropdown => {
                dropdown.style.display = "none";
            });
        }
    });

    // Open dropdown on hover for navigation
    document.querySelectorAll("nav .dropdown").forEach(dropdown => {
        dropdown.addEventListener("mouseenter", function() {
            this.querySelector(".dropdown-content").style.display = "block";
        });

        dropdown.addEventListener("mouseleave", function() {
            this.querySelector(".dropdown-content").style.display = "none";
        });
    });
});