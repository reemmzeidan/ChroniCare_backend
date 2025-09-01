const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

   chatRoom: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
    required: true
   },
   
   patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true
   },



   image: {
    type: String,
    default: "",
   },

   video: {
    type: String,
    default: "",
   },

   content: {
    type: String,
    required: true
   },

   likes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
   }],



},
{timestamps: true}
);

module.exports = mongoose.model("Message",messageSchema) 