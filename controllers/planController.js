const Plan = require("../models/planSchema");
const Patient = require("../models/patientSchema");
const Doctor = require("../models/doctorSchema");


exports.createPlan = async (req, res) => {
  try {
    const { patient, doctor, type, title, description, schedule } = req.body;

    const patientExists = await Patient.findById(patient);
    if (!patientExists) return res.status(404).json({ message: "Patient not found" });

    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) return res.status(404).json({ message: "Doctor not found" });

    const plan = await Plan.create({ patient, doctor, type, title, description, schedule });

    res.status(201).json({ data: plan, message: "Plan created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().populate("patient doctor").sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getPlansByPatient = async (req, res) => {
  try {
    const plans = await Plan.find({ patient: req.params.patientId }).populate("patient doctor").sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    plan.type = req.body.type || plan.type;
    plan.title = req.body.title || plan.title;
    plan.description = req.body.description || plan.description;
    plan.schedule = req.body.schedule || plan.schedule;
    plan.completed = req.body.completed ?? plan.completed;

    await plan.save();

    res.status(200).json({ data: plan, message: "Plan updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    await plan.deleteOne();
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.markPlanCompleted = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    plan.completed = true;
    await plan.save();

    res.status(200).json({ data: plan, message: "Plan marked as completed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
