"use client";

import React, { useState, useEffect } from "react";

type Video = {
  videoName: string;
  videoUrl: string;
};

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/videos").then((response) => {
      response.json().then((data) => {
        setVideos(data.videos);
      });
    });
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <div key={video.videoUrl} className="max-w-[350px]">
          <video src={video.videoUrl} />
        </div>
      ))}
    </div>
  );
};

export default Videos;
