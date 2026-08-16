const express = require("express");
const router = express.Router();


// ==========================================
// WANDERLOFT INFORMATION PAGES
// ==========================================

const pages = {

    about: "About Wanderloft",

    privacy: "Privacy Policy",

    terms: "Terms of Use",

    cookies: "Cookie Policy",

    "community-guidelines": "Community Guidelines",

    "content-policy": "Content Policy",

    contact: "Contact Us",

    help: "Help Center"
};


router.get("/:page", (req, res) => {

    const page = req.params.page;

    // Check whether requested page exists
    if (!pages[page]) {
        return res.redirect("/home");
    }

    res.render("pages/info", {
        page,
        title: pages[page]
    });

});


module.exports = router;