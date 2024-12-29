"use client";

import React, { useState, useEffect } from "react";

export type Video = {
  _id: string;
  videoName: string;
  videoUrl: string;
};

import { redirect } from "next/navigation";

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
    <div className="container m-auto mt-10 flex">
      {videos.map((video) => (
        <div
          key={video._id}
          className="max-w-[250px] rounded overflow-hidden hover:overflow-visible cursor-pointer"
          onClick={() => {
            redirect(`/watch?v=${video._id}`);
          }}
        >
          <video src={video.videoUrl} />
          <div className="text-muted-foreground">{video.videoName}</div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
