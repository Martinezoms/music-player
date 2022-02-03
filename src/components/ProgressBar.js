import { useState } from "react";
import { songs } from "../db";

function ProgressBar({ url, audioRef, playing, index, setIndex }) {
  const [durationMin, setDurationMin] = useState("0");
  const [durationSec, setDurationSec] = useState("00");

  const [currentMin, setCurrentMin] = useState("00");
  const [currentSec, setCurrentSec] = useState("0");

  const progress = document.getElementById("progress");

  const updateProgressBar = (e) => {
    if (playing) {
      const { duration, currentTime } = e.target;

      // update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;

      if (audioRef.current.ended) {
        setIndex(index + 1);
        if (index >= songs.length - 1) setIndex(0);
        audioRef.current.autoplay = true;
      }

      // calculating display for duration
      const durationMinutes = Math.floor(duration / 60);
      if (durationMinutes) setDurationMin(durationMinutes);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
      if (durationSeconds) setDurationSec(durationSeconds);

      // calculating display for current
      const currentMinutes = Math.floor(currentTime / 60);
      if (currentMinutes) setCurrentMin(currentMinutes);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
      if (currentSeconds) setCurrentSec(currentSeconds);
    }
  };

  const setProgressBar = (e) => {
    const width = e.target.clientWidth;
    const xClick = e.nativeEvent.offsetX;
    const { duration } = audioRef.current;
    audioRef.current.currentTime = (xClick / width) * duration;
  };

  return (
    <div className=" bg-white h-1 rounded-md cursor-pointer my-10 mx-5 w-11/12 p-0" onClick={setProgressBar}>
      <audio src={url} ref={audioRef} onTimeUpdate={updateProgressBar}></audio>
      <div id="progress" className=" bg-progress rounded-md h-full w-0 transition w duration-100 ease-linear"></div>
      <div className=" flex justify-between relative -top-8">
        <span>
          {currentMin} : {currentSec}
        </span>
        <span>
          {durationMin} : {durationSec}
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
