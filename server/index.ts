require("dotenv").config();

import express from "express";
import multer from "multer";
import cors from "cors";
import { cloudinary } from "./utils/cloudinary";
import mongoose from "mongoose";

import { Video } from "./models/Video";

mongoose.connect(process.env.MONGODB_URI!);

const app = express();

app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

app.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find({});

    if (!videos.length) {
      res.sendStatus(500).json({ message: "No videos found" });
      return;
    }

    res.json({ message: "Videos found", videos });
  } catch (error) {
    console.log(error);
  }
});

app.get("/videos/:videoId", async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);

    res.json({ message: "Video found", video });
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload", upload.single("video"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "No file provided" });
    return;
  }

  try {
    // Convert buffer to data URI
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "video",
      folder: "video_uploads",
    });

    const mongooseResult = await Video.create({
      videoName: req.body.videoName,
      videoUrl: result.secure_url,
    });

    res.json({
      message: "Video uploaded",
      video: {
        videoName: req.body.videoName,
        videoUrl: result.secure_url,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.listen(4000, () => {
  console.log("Listening on PORT 4000");
});
