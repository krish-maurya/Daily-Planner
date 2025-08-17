const express = require("express");
const {
  getallTask,
  addTask,
  updateTask,
  deleteTask,
  getTaskByMonth,
  updateCompleteState,
} = require("../controllers/taskController");
const { jwtAuthMiddlware } = require("../middleware/jwtAuthMiddleware");

const router = express.Router();

router.get("/", jwtAuthMiddlware, getallTask);
router.post("/addtask", jwtAuthMiddlware, addTask);
router.put("/:taskid", jwtAuthMiddlware, updateTask);
router.delete("/:taskid", jwtAuthMiddlware, deleteTask);
router.get("/month/:month", jwtAuthMiddlware, getTaskByMonth);
router.put("/complete/:taskid", jwtAuthMiddlware, updateCompleteState);

module.exports = router;
