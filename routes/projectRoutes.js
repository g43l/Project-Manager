const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");


router.get("/", projectController.all);

router.get("/create", projectController.createGet);
router.post("/create", projectController.createPost);

router.get("/update/:id", projectController.updateGet);
router.post("/update", projectController.updatePost);

router.get("/delete/:id", projectController.deleteGet);
router.post("/delete", projectController.deletePost);

module.exports = router;