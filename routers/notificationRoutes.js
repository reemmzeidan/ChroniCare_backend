const express = require("express");
const {
  createNotification,
  getAllNotifications,
  getNotificationsByRecipient,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const router = express.Router();

// Notification routes
router.post("/", createNotification);
router.get("/", getAllNotifications);
router.get("/recipient/:userId", getNotificationsByRecipient);
router.put("/:notificationId/read", markAsRead);
router.delete("/:notificationId", deleteNotification);

module.exports = router;
