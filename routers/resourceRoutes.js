// routes/resourceRoutes.js
const express = require("express");
const {
  createResource,
  getAllResources,
  getResourcesByUploader,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");

const router = express.Router();

router.post("/", createResource);
router.get("/", getAllResources);
router.get("/uploader/:userId", getResourcesByUploader);
router.put("/:resourceId", updateResource);
router.delete("/:resourceId", deleteResource);

module.exports = router;
