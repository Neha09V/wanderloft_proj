document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const mood = params.get("mood");

    if (!mood) return;

    document.body.classList.add(`${mood}-mood`);


    /* =========================
       RAINY — FALLING RAIN
    ========================= */

    if (mood === "rainy") {

        let counter = 100;

        for (let i = 0; i < counter; i++) {

            const hrElement = document.createElement("hr");

            hrElement.className = "rain-drop";

            hrElement.style.left =
                Math.floor(Math.random() * window.innerWidth) + "px";

            hrElement.style.animationDuration =
                0.2 + Math.random() * 0.3 + "s";

            hrElement.style.animationDelay =
                Math.random() * 5 + "s";

            document.body.appendChild(hrElement);
        }
    }

/* =========================
   FOREST — FALLING LEAVES
========================= */

if (mood === "forest") {


const leaves = [
    "🍃",
    "🍂",
    "🍁",
    "🌿",
    "🌱",
    "🌲",
    "🌳",
    "🌴",
    "🌵",
    "🌾",
    "🌷",
    "🌸",
    "🌺",
    "🌻",
    "🌼",
    "💐",
    "🪻",
    "🥀",
    "🌹",
    "🪷"
];



    for (let i = 0; i < 30; i++) {

        const leaf = document.createElement("span");

        leaf.className = "falling-leaf";

        leaf.textContent =
            leaves[Math.floor(Math.random() * leaves.length)];

        leaf.style.left = Math.random() * 100 + "vw";

        leaf.style.fontSize =
            (14 + Math.random() * 14) + "px";

        leaf.style.animationDuration =
            (5 + Math.random() * 7) + "s";

        leaf.style.animationDelay =
            (Math.random() * 6) + "s";

        document.body.appendChild(leaf);
    }
}


/* =========================
   BEACH — SHORE & WATER
========================= */

if (mood === "beach") {

    /* 🌊 Ocean waves */

    for (let i = 0; i < 4; i++) {

        const wave = document.createElement("div");

        wave.className = "beach-wave";

        wave.style.animationDelay =
            (i * 1.2) + "s";

        wave.style.bottom =
            (i * 12) + "px";

        document.body.appendChild(wave);
    }


    /* ✨ Water reflections */

    for (let i = 0; i < 18; i++) {

        const shimmer = document.createElement("span");

        shimmer.className = "water-shimmer";

        shimmer.style.left =
            Math.random() * 100 + "vw";

        shimmer.style.top =
            (55 + Math.random() * 35) + "vh";

        shimmer.style.animationDelay =
            Math.random() * 4 + "s";

        shimmer.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        document.body.appendChild(shimmer);
    }


    /* 🫧 Water particles */

    for (let i = 0; i < 12; i++) {

        const bubble = document.createElement("span");

        bubble.className = "water-bubble";

        bubble.style.left =
            Math.random() * 100 + "vw";

        bubble.style.animationDelay =
            Math.random() * 5 + "s";

        bubble.style.animationDuration =
            (5 + Math.random() * 5) + "s";

        document.body.appendChild(bubble);
    }
}

/* =========================
   ADVENTURE — MIST + SNOW + BIRDS
========================= */

if (mood === "adventure") {

    /* Snow / mountain particles */

    for (let i = 0; i < 35; i++) {

        const snow = document.createElement("span");

        snow.className = "adventure-snow";

        snow.textContent = "•";

        snow.style.left =
            Math.random() * 100 + "vw";

        snow.style.fontSize =
            (4 + Math.random() * 7) + "px";

        snow.style.animationDuration =
            (7 + Math.random() * 8) + "s";

        snow.style.animationDelay =
            Math.random() * 8 + "s";

        document.body.appendChild(snow);
    }


    /* Occasional birds */

    for (let i = 0; i < 3; i++) {

        const bird = document.createElement("span");

        bird.className = "adventure-bird";

        bird.textContent = "⌁";

        bird.style.top =
            (15 + Math.random() * 30) + "vh";

        bird.style.animationDelay =
            (Math.random() * 8) + "s";

        bird.style.animationDuration =
            (12 + Math.random() * 8) + "s";

        document.body.appendChild(bird);
    }
}


/* =========================
   COZY WEEKEND — FIRE EMBERS
========================= */

if (mood === "cozy") {

    for (let i = 0; i < 25; i++) {

        const ember = document.createElement("span");

        ember.className = "cozy-ember";

        ember.textContent = "•";

        ember.style.left =
            (20 + Math.random() * 60) + "vw";

        ember.style.bottom =
            (5 + Math.random() * 15) + "vh";

        ember.style.animationDuration =
            (3 + Math.random() * 5) + "s";

        ember.style.animationDelay =
            Math.random() * 5 + "s";

        ember.style.fontSize =
            (4 + Math.random() * 7) + "px";

        document.body.appendChild(ember);
    }
}


/* =========================
   ROAD TRIP — SPEED LIGHTS
========================= */

if (mood === "roadtrip") {

    for (let i = 0; i < 18; i++) {

        const light = document.createElement("span");

        light.className = "road-light";

        light.style.top =
            (35 + Math.random() * 50) + "vh";

        light.style.left =
            Math.random() * 100 + "vw";

        light.style.width =
            (25 + Math.random() * 70) + "px";

        light.style.animationDuration =
            (1.5 + Math.random() * 2.5) + "s";

        light.style.animationDelay =
            Math.random() * 4 + "s";

        document.body.appendChild(light);
    }
}

});

