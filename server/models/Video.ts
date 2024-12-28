import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoName: {
    type: "string",
    required: true,
  },
  videoUrl: {
    type: "string",
    required: true,
  },
});

const Video = mongoose.model("video", videoSchema);

export { Video };
