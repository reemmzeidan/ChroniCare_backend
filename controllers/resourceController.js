const Resource = require("../models/resourceSchema");
const User = require("../models/userSchema");

// ✅ Create a new resource
exports.createResource = async (req, res) => {
  try {
    const { title, type, contentURL, uploadedBy, approvedBy } = req.body;

    const userExists = await User.findById(uploadedBy);
    if (!userExists) return res.status(404).json({ message: "Uploader not found" });

    const resource = await Resource.create({ title, type, contentURL, uploadedBy, approvedBy });

    res.status(201).json({ data: resource, message: "Resource created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate("uploadedBy approvedBy")
      .sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get resources by uploader
exports.getResourcesByUploader = async (req, res) => {
  try {
    const resources = await Resource.find({ uploadedBy: req.params.userId })
      .populate("uploadedBy approvedBy")
      .sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a resource
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.resourceId);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    resource.title = req.body.title || resource.title;
    resource.type = req.body.type || resource.type;
    resource.contentURL = req.body.contentURL || resource.contentURL;
    resource.approvedBy = req.body.approvedBy || resource.approvedBy;

    await resource.save();

    res.status(200).json({ data: resource, message: "Resource updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete a resource
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.resourceId);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    await resource.deleteOne();
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
