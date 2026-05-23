const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });
const communityController = require("../controllers/community");

// middleware (if you use auth)
const { isLoggedIn } = require("../middleware.js");

// routes
router.get("/", communityController.index);

router.get("/new", isLoggedIn, communityController.renderNewForm);

router.post("/", isLoggedIn, upload.single("image"), communityController.createPost);
router.get("/:id", communityController.showPost);

module.exports = router;