import React from 'react'
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const VideoFrame= styled.video`
 max-height: '720px';
 width: 100%;
 object-fit: cover;
`

export default function VideoPlayer({videoURL, thumbnail}) {
   const videoRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false); // a boolean for storing state of the play
   
   const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
  }
  }

  const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
  const [currentTimeSec, setCurrentTimeSec] = useState(); //current time of the video in seconds
  const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.
  const [durationSec, setDurationSec] = useState(); // // current duration of the video in seconds
  
  const sec2Min = (sec) => {
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    return {
      min: min,
      sec: secRemain,
    };
  };

  useEffect(() => {
    const { min, sec } = sec2Min(videoRef.current.duration);
    setDurationSec(videoRef.current.duration);
    setDuration([min, sec]);

    console.log(videoRef.current.duration);
    let interval;

    if (isPlaying){
        interval = setInterval(() => {
            const { min, sec } = sec2Min(videoRef.current.currentTime);
            setCurrentTimeSec(videoRef.current.currentTime);
            setCurrentTime([min, sec]);
          }, 1000);
    }
    else{
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <VideoFrame id='video' src= {videoURL} poster={thumbnail} ref={videoRef} controls >
    </VideoFrame>
  )
}
