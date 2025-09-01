const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({

    roomname: {
        type: String,
        required: true
    },

    members: [{
        type: Schema.Types.ObjectId,
        ref: "Patient"
    }],

},
{timestamps: true}
);

module.exports = mongoose.model("ChatRoom",chatRoomSchema)