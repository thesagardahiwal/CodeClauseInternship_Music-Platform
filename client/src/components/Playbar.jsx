import React from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider';


function Playbar() {
    const {track, isPlaying, play, pause, stop, prevSong, nextSong, currentTime, duration, audioRef} = useAudioPlayer();
    const handlePlayButton = () => {
        if (currentTime == duration) {
            stop();
        }
        isPlaying ? pause() : play();
    }

    document.onkeydown = (e) => {
        if (e.code == "Space") {
            handlePlayButton();
        }
    }

  return (
    <div className='flex justify-center items-center gap-2'>
        <span><ShuffleIcon /></span>
        <span onClick={prevSong}><SkipPreviousIcon /></span>
        <span onClick={handlePlayButton}>{isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}</span>
        <span onClick={nextSong}><SkipNextIcon /></span>
        <span><RepeatIcon /></span>
    </div>
  )
}

export default Playbar