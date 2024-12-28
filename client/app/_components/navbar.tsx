"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import YoutubeIcon from "@/public/youtube-logo-icon.svg";

import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [videoName, setVideoName] = useState("");
  const [videoFile, setVideoFile] = useState<File | string>("");

  const uploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (videoFile === "") return;

      const formData = new FormData();

      formData.append("video", videoFile);
      formData.append("videoName", videoName);

      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
    } catch (error) {
      console.log("uploadVideo error", error);
    }
  };

  return (
    <nav className="flex justify-between mx-5 my-2">
      <Image src={YoutubeIcon} width={100} alt="Youtube Icon" />
      <Input
        type="text"
        className="max-w-[500px] rounded-full"
        placeholder="Search"
      />
      <SignedIn>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <form onSubmit={uploadVideo}>
                <DialogHeader>
                  <DialogTitle className="mb-2">Upload a video</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <Input
                    type="text"
                    placeholder="Name"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                  />
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files![0])}
                  />
                </div>
                <DialogFooter className="sm:justify-start">
                  <div className="mt-2 flex gap-2">
                    <Button type="submit">Upload</Button>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <Button asChild>
          <SignUpButton />
        </Button>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
