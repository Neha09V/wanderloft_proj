// =========================================
// WANDERLOFT THEME TOGGLE
// =========================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const themeIcon = themeToggle.querySelector("i");

    // Load saved theme
    const savedTheme = localStorage.getItem("wanderloft-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");

        // Save preference
        localStorage.setItem(
            "wanderloft-theme",
            isDark ? "dark" : "light"
        );

        // Change icon
        if (themeIcon) {

            if (isDark) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            } else {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }

        }

    });

}