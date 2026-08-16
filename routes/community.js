const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });

const communityController = require("../controllers/community");

// Authentication middleware
const {
    
    isLoggedIn,
    isCommunityAuthor,
    isCommunityAuthorOrAdmin
} = require("../middleware.js");



// COMMUNITY HOME


router.get(
    "/",
    communityController.index
);


// CREATE POST


router.get(
    "/new",
    isLoggedIn,
    communityController.renderNewForm
);

router.post(
    "/",
    isLoggedIn,
    upload.single("image"),
    communityController.createPost
);



// EDIT POST


router.get(
    "/:id/edit",
     isLoggedIn,
    isCommunityAuthor,
    communityController.renderEditForm
);

router.put(
    "/:id",
    isLoggedIn,
    isCommunityAuthor,
    upload.single("image"),
    communityController.updatePost
);



// DELETE POST


router.delete(
    "/:id",
    isLoggedIn,
    isCommunityAuthorOrAdmin,
    communityController.deletePost
);



// LIKE / UNLIKE
router.post("/:id/like", 
    isLoggedIn, 
    communityController.toggleLike
);

// ADD COMMENT
router.post("/:id/comments",
     isLoggedIn, 
     communityController.addComment
    );

// DELETE COMMENT
router.delete(
    "/:id/comments/:commentId",
    isLoggedIn,
    communityController.deleteComment
);

// SHOW SINGLE POST


router.get(
    "/:id",
    communityController.showPost
);


module.exports = router;