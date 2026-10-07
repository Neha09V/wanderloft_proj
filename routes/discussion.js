const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const discussionController = require("../controllers/discussionController");

router.get("/", discussionController.index);

router.get("/new", discussionController.renderNewForm);

router.post("/", isLoggedIn, discussionController.createDiscussion);


router.post("/:id/answers", isLoggedIn, discussionController.createAnswer);

router.post(
    "/:id/vote",
    isLoggedIn,
    discussionController.voteDiscussion
);

router.post(
    "/:id/answers/:answerId/vote",
    isLoggedIn,
    discussionController.voteAnswer
);
router.get("/:id", discussionController.showDiscussion);

module.exports = router;

// EDIT QUESTION
router.get(
    "/:id/edit",
    isLoggedIn,
    discussionController.renderEditForm
);

// UPDATE QUESTION
router.put(
    "/:id",
    isLoggedIn,
    discussionController.updateDiscussion
);

// DELETE QUESTION
router.delete(
    "/:id",
    isLoggedIn,
    discussionController.deleteDiscussion
);