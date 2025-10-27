const express = require("express");
const {
  createMessage,
  deleteMessage,
  getMessage,
  likeMessage,
} = require("../controllers/messageController");

const router = express.Router();

// Message routes
router.post("/", createMessage);
router.delete("/:messageID", deleteMessage);
router.get("/:chatRoomId", getMessage);
router.put("/:messageID/like", likeMessage);

module.exports = router;
