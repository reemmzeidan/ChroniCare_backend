const express = require("express");
const {
  createChatRoom,
  getAllChatRooms,
  getChatRoomById,
  updateChatRoom,
  deleteChatRoom,
} = require("../controllers/chatRoomController");

const router = express.Router();

// Chat Room routes
router.post("/", createChatRoom);
router.get("/", getAllChatRooms);
router.get("/:chatRoomId", getChatRoomById);
router.put("/:chatRoomId", updateChatRoom);
router.delete("/:chatRoomId", deleteChatRoom);

module.exports = router;
