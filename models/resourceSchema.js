const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({

    title: {
        type: String,
        required: [true, "Resource title is required"]
    },

    type: {
        type: String,
        enum: ["article", "video", "guide"],
        required: [true, "Resource type is required"]
    },

    contentURL: {
        type: String,
        required: [true, "Resource URL is required"]
    },

    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Uploader is required"]
    },

    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Resource", resourceSchema);
//Resource --> resources
