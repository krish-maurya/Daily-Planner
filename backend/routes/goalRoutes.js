const express = require('express');
const {getallGoals,addGoals,updateGoals,deleteGoals,getGoalsByDate,updateProgress} = require('../controllers/goalsController')
const { jwtAuthMiddlware } = require('../middleware/jwtAuthMiddleware');

const router = express.Router();

router.get("/", jwtAuthMiddlware, getallGoals);
router.post("/addgoal", jwtAuthMiddlware, addGoals);
router.put("/:goalId", jwtAuthMiddlware, updateGoals);
router.delete("/:goalId", jwtAuthMiddlware, deleteGoals);
router.get("/date/:date", jwtAuthMiddlware, getGoalsByDate);
router.put("/progress/:goalId", jwtAuthMiddlware, updateProgress);

module.exports = router;