const express = require("express");

const router = express.Router();

const storyController = require("../controllers/story");

router.get("/", storyController.index);

router.get("/new", storyController.newForm);

router.post("/", storyController.create);

router.get("/:id/edit", storyController.editForm);

router.put("/:id", storyController.update);

router.delete("/:id", storyController.delete);

router.get("/:id", storyController.show);

module.exports = router;