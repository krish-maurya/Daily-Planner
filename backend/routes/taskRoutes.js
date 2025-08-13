const express = require("express");
const {
  getallTask,
  addTask,
  updateTask,
  deleteTask,
  getTaskByDate,
  updateCompleteState,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getallTask);
router.post("/addtask", addTask);
router.put("/:taskid", updateTask);
router.delete("/:taskid", deleteTask);
router.get("/date/:date", getTaskByDate);
router.put("/complete/:taskid", updateCompleteState);

module.exports = router;
