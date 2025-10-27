const express = require("express");
const {
  createPlan,
  getAllPlans,
  getPlansByPatient,
  updatePlan,
  deletePlan,
  markPlanCompleted,
} = require("../controllers/planController");

const router = express.Router();

router.post("/", createPlan);
router.get("/", getAllPlans);
router.get("/patient/:patientId", getPlansByPatient);
router.put("/:planId", updatePlan);
router.delete("/:planId", deletePlan);
router.patch("/:planId/complete", markPlanCompleted);

module.exports = router;
