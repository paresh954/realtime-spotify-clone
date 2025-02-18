import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audiRef = useRef<HTMLAudioElement | null>(null);
  const prevSongRef = useRef<string | null>(null);

  const { isPlaying, currentSong, playNext } = usePlayerStore();

  useEffect(() => {
    if (isPlaying) audiRef.current?.play();
    else audiRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audiRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  useEffect(() => {
    if (!audiRef.current || !currentSong) return;

    const audio = audiRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  

  return <audio ref={audiRef} />;
};

export default AudioPlayer;
