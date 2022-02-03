import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Controls({ songs, index, setIndex, audioRef, playing, setPlaying }) {
  const playPauseMusic = () => {
    if (playing) {
      setPlaying(false);
      audioRef.current.pause();
    } else {
      setPlaying(true);
      audioRef.current.play();
    }
  };

  const nextSong = () => {
    setIndex(index + 1);
    if (index >= songs.length - 1) {
      setIndex(0);
    }
    audioRef.current.autoplay = true;
    setPlaying(true);
  };

  const prevSong = () => {
    setIndex(index - 1);
    if (index <= 0) {
      setIndex(songs.length - 1);
    }
    audioRef.current.autoplay = true;
    setPlaying(true);
  };

  return (
    <div className="text-3xl flex text-buttonColor space-x-8 justify-center">
      <FontAwesomeIcon
        icon="backward"
        title="Previous"
        className="cursor-pointer select-none hover:text-black/80"
        onClick={prevSong}
      />
      <FontAwesomeIcon
        icon={playing ? "pause" : "play"}
        title="Play"
        className="text-4xl cursor-pointer select-none hover:text-black/80"
        onClick={playPauseMusic}
      />
      <FontAwesomeIcon
        icon="forward"
        title="Next"
        className="cursor-pointer select-none hover:text-black/80"
        onClick={nextSong}
      />
    </div>
  );
}

export default Controls;
