const express = require("express");
const router = express.Router();
const userStoryController = require("../controllers/userStoryController");

router.get("/", userStoryController.all);

router.get("/create", userStoryController.createGet);
router.post("/create", userStoryController.createPost);

router.get("/update/:id", userStoryController.updateGet);
router.post("/update", userStoryController.updatePost);

router.get("/delete/:id", userStoryController.deleteGet);
router.post("/delete", userStoryController.deletePost);

module.exports = router;