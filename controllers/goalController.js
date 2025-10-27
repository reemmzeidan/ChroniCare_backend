const Goal = require("../models/goalSchema");
const Patient = require("../models/patientSchema");


exports.createGoal = async (req, res) => {
  try {
    const { patient, title, description } = req.body;

    const patientExists = await Patient.findById(patient);
    if (!patientExists) return res.status(404).json({ message: "Patient not found" });

    const goal = await Goal.create({ patient, title, description });

    res.status(201).json({ data: goal, message: "Goal created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find().populate("patient");
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getGoalsByPatient = async (req, res) => {
  try {
    const goals = await Goal.find({ patient: req.params.patientId }).populate("patient");
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.progress = req.body.progress !== undefined ? req.body.progress : goal.progress;
    goal.status = req.body.status || goal.status;
    goal.title = req.body.title || goal.title;
    goal.description = req.body.description || goal.description;

    await goal.save();

    res.status(200).json({ data: goal, message: "Goal updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    await goal.deleteOne();
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
