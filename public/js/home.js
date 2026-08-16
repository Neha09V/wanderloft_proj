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