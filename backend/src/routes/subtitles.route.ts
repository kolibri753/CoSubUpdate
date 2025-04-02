import express from "express";
import {
  getAllSubtitleDocs,
  createSubtitleDoc,
  deleteSubtitleDoc,
  updateSubtitleBlock,
  deleteSubtitleBlock,
  addSubtitleViewer,
  addSubtitleEditor,
} from "../controllers/subtitles.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/uploadSubtitle.js";

const router = express.Router();

router.get("/", protectRoute, getAllSubtitleDocs);
router.post("/upload", protectRoute, upload.single("file"), createSubtitleDoc);
router.delete("/:id", protectRoute, deleteSubtitleDoc);
router.post("/:id/view", protectRoute, addSubtitleViewer);
router.post("/:id/edit", protectRoute, addSubtitleEditor);
router.put("/block/:id", protectRoute, updateSubtitleBlock);
router.delete("/block/:id", protectRoute, deleteSubtitleBlock);

export default router;
