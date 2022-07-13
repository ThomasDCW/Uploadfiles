/* eslint-disable */
const express = require("express");
const multer = require("multer");
const { uploadAndRename } = require("./services/upload");

const { ItemController, SongController } = require("./controllers");
const upload = multer({ dest: "tmp/" });
const router = express.Router();

router.get("/songs", SongController.browse);
router.post(
  "/songs",
  upload.single("label"),
  uploadAndRename,
  SongController.add
);
router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

module.exports = router;
