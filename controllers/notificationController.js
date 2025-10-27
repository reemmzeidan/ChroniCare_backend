const Notification = require("../models/notificationSchema");
const User = require("../models/userSchema");


exports.createNotification = async (req, res) => {
  try {
    const { recipient, type, message } = req.body;

    const userExists = await User.findById(recipient);
    if (!userExists) return res.status(404).json({ message: "Recipient not found" });

    const notification = await Notification.create({ recipient, type, message });

    res.status(201).json({ data: notification, message: "Notification created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("recipient").sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getNotificationsByRecipient = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ data: notification, message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    await notification.deleteOne();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
