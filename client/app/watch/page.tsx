"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../_components/navbar";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { Video } from "../_components/videos";

const Watch = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    if (!videoId) {
      redirect("/");
    }

    const getVideo = async () => {
      const response = await fetch(`http://localhost:4000/videos/${videoId}`);
      const data = await response.json();

      setVideo(data.video);
      console.log(data.video);
    };

    getVideo();
  }, [videoId]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="max-w-[1000px] mt-20">
          <video src={video?.videoUrl} controls autoPlay />
          <div>{video?.videoName}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Watch;
