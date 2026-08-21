const slider = document.querySelector(".category-slider");
const nextBtn = document.querySelector(".category-next");
const prevBtn = document.querySelector(".category-prev");

if (slider && nextBtn && prevBtn) {

    nextBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: 320,
            behavior: "smooth"
        });
    });

    prevBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: -320,
            behavior: "smooth"
        });
    });

}
// =========================
// WANDER MOOD
// =========================

const moodCards = document.querySelectorAll(".mood-card");
const homePage = document.querySelector(".home-page");

if (moodCards.length && homePage) {

    moodCards.forEach(card => {

        card.addEventListener("click", () => {

            const selectedMood = card.dataset.mood;

            // Remove previous mood
            homePage.classList.remove(
                "mood-rainy",
                "mood-golden",
                "mood-midnight",
                "mood-forest",
                "mood-beach",
                "mood-adventure",
                "mood-cozy",
                "mood-roadtrip"
            );

            // Add selected mood
            homePage.classList.add(`mood-${selectedMood}`);

            // Highlight selected mood
            moodCards.forEach(item => {
                item.classList.remove("active");
            });

            card.classList.add("active");

        });

    });

}
document.querySelectorAll(".mood-card").forEach(card => {

    card.addEventListener("click", () => {

        const mood = card.dataset.mood;

        localStorage.setItem("wanderMood", mood);

        window.location.href = `/listings?mood=${mood}`;

    });

});