const express = require("express");
const {
  getAllTasks,
  getThatTask,
  postTask,
  deleteThatTask,
  patchThatTask,
} = require("../controllers/controllers.js");
const router = express.Router();

router.get("/get", getAllTasks);

router.get("/get/:id", getThatTask);

router.post("/create", postTask);

router.delete("/delete/:id", deleteThatTask);

router.patch("/patch/:id", patchThatTask);

module.exports = router;
