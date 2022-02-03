import { useState, useRef } from "react";
import ProgressBar from "./components/ProgressBar";
import Controls from "./components/Controls";
import { songs } from "./db";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBackward, faPlay, faPause, faForward } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

library.add(faBackward, faPlay, faPause, faForward);

function App() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const { image, displayName, artist, url } = songs[index];

  return (
    <div className="rounded-xl shadow-2xl shadow-black/50 bg-lgreyish player-container">
      <div className="relative -top-14 left-14 h-72 w-72 img-container">
        <img src={image} alt="" className=" h-full w-full object-cover rounded-xl shadow-xl shadow-black/80" />
      </div>
      <h2>{displayName}</h2>
      <h3>{artist}</h3>
      <ProgressBar
        audioRef={audioRef}
        url={url}
        playing={playing}
        setPlaying={setPlaying}
        index={index}
        setIndex={setIndex}
      />
      <Controls
        index={index}
        setIndex={setIndex}
        songs={songs}
        audioRef={audioRef}
        playing={playing}
        setPlaying={setPlaying}
      />
    </div>
  );
}

export default App;
