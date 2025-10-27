const express = require("express");
const {
  createGoal,
  getAllGoals,
  getGoalsByPatient,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const router = express.Router();

// Goal routes
router.post("/", createGoal);
router.get("/", getAllGoals);
router.get("/patient/:patientId", getGoalsByPatient);
router.put("/:goalId", updateGoal);
router.delete("/:goalId", deleteGoal);

module.exports = router;
