const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    const challenges = [

        {
            emoji: "🌴🍸🌊",
            question: "Guess the place!",
            options: ["Goa", "Kerala", "Andaman and Nicobar Islands"],
            hint: "Famous for beaches and nightlife",
            answer: "Goa"
        },

        {
            emoji: "🏔️❄️🚠",
            question: "Which destination is this?",
            options: ["Manali", "Shimla", "Darjeeling"],
            hint: "Snow + mountains + adventure",
            answer: "Manali"
        },

        {
            emoji: "🏙️🌉✨",
            question: "City of Dreams?",
            options: ["Mumbai", "Delhi", "Bangalore"],
            hint: "Financial capital of India",
            answer: "Mumbai"
        }

    ];

    const currentQ = 1;

    const totalQ = challenges.length;

    const progressPercent =
        (currentQ / totalQ) * 100;

    const random =
        challenges[Math.floor(Math.random() * challenges.length)];

    res.render("challenge/index", {
        challenge: random,
        currentQ,
        totalQ,
        progressPercent
    });

});

module.exports = router;