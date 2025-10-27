const ChatRoom = require("../models/chatRoomSchema");
const Patient = require("../models/patientSchema");


exports.createChatRoom = async (req, res) => {
  try {
    const { roomname, members } = req.body;

    // Checking if all members do exist
    for (let memberId of members) {
      const memberExists = await Patient.findById(memberId);
      if (!memberExists) return res.status(404).json({ message: `Patient with ID ${memberId} not found` });
    }

    const chatRoom = await ChatRoom.create({ roomname, members });

    res.status(201).json({ data: chatRoom, message: "Chat room created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getAllChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find().populate("members").sort({ createdAt: -1 });
    res.status(200).json(chatRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getChatRoomById = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.chatRoomId).populate("members");
    if (!chatRoom) return res.status(404).json({ message: "Chat room not found" });

    res.status(200).json(chatRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.chatRoomId);
    if (!chatRoom) return res.status(404).json({ message: "Chat room not found" });

    chatRoom.roomname = req.body.roomname || chatRoom.roomname;

    // Adding members
    if (req.body.addMembers) {
      for (let memberId of req.body.addMembers) {
        if (!chatRoom.members.includes(memberId)) chatRoom.members.push(memberId);
      }
    }

    // Removing members
    if (req.body.removeMembers) {
      chatRoom.members = chatRoom.members.filter(memberId => !req.body.removeMembers.includes(memberId.toString()));
    }

    await chatRoom.save();

    res.status(200).json({ data: chatRoom, message: "Chat room updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deleteChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.chatRoomId);
    if (!chatRoom) return res.status(404).json({ message: "Chat room not found" });

    await chatRoom.deleteOne();
    res.status(200).json({ message: "Chat room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
