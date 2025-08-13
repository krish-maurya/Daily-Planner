const express = require('express');
const {getallGoals,addGoals,updateGoals,deleteGoals,getGoalsByDate,updateProgress} = require('../controllers/goalsController')

const router = express.Router();

router.get("/", getallGoals);
router.post("/addgoal", addGoals);
router.put("/:goalId", updateGoals);
router.delete("/:goalId", deleteGoals);
router.get("/date/:date", getGoalsByDate);
router.put("/progress/:goalId",updateProgress);

module.exports = router;