import React, { useEffect, useState } from 'react';
import {useAudioPlayer} from '../hooks/AudioPlayerProvider.jsx';
import Playbar from './Playbar.jsx';
import { Slider } from '@mui/material';
import VolumeMuteOutlinedIcon from '@mui/icons-material/VolumeMuteOutlined';
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import { useTheme } from '../hooks/ThemeToggler.jsx';
import { addTrackToPlaylist } from '../services/api.js';
import TrackAdder from './TrackAdder.jsx';

const Footer = () => {
    const {track, isPlaying, volume, changeVolume, play, pause, currentTime, duration, audioRef} = useAudioPlayer();
    const [isMute, setIsMute] = useState(false);
    const { setTheme, currentTheme } = useTheme();
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleChange = (e) => {
        // audioRef.current.currentTime = e.target.value
        audioRef.current.currentTime =  (e.target.value * duration) / 100;
    }

    const handleVolume = (e) => {
        changeVolume(e.target.value/100);
    }

    const handleMute = () => {
        setIsMute(!isMute);
        isMute ? audioRef.current.volume = 0 : audioRef.current.volume = volume;
    }
    

    useEffect (() => {
        if (track && track.preview_url) {
            document.title = track.name;
        }
    }, [track])
    return (
        <footer className={`h-[100px] ${currentTheme.footer} sticky bottom-0 flex items-center`}>
            <div className='w-1/3 md:flex hidden items-center justify-between p-2 m-1 gap-2'>
                <div className='flex items-center gap-2'>
                    {track ? 
                    <img src={track._id? track.album.image : track.album?.images[0].url} alt="album" style={{ borderRadius: 10, height: "50px" }} />
                    :
                    <AlbumRoundedIcon style={{fontSize: "50px"}} />
                    }
                <div>
                    <p className='font-semibold'>{track ? track.name : "Play Song"}</p>
                    <p className='ellipsis text-[10px]'>{ track ? track._id ? track.artist : track.artists?.map(artist => artist.name).join(', ') : "Unknown"}</p>
                </div>
                </div>
                <span>
                    <TrackAdder track={track}/>
                </span>
            </div>

            <div className='md:w-1/3 w-full p-4 md:p-1'>
                <Playbar />
                <div className='flex gap-2 justify-center items-center'>
                <p className='text-md'>
                        {formatTime(currentTime)}
                    </p>
                    <Slider
                        size="small"
                        value={Math.floor((audioRef.current.currentTime / duration) * 100) || 0}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        onChange={(e) => handleChange(e)}
                    />
                    <p className='text-sm'>
                        {formatTime(duration)}
                    </p>
                </div>
            </div>
            <div className='md:flex flex-1 gap-2 hidden justify-center align-middle items-center p-2'>
                <span onClick={handleMute}>
                    {isMute ? <VolumeMuteOutlinedIcon /> : <VolumeMuteRoundedIcon />}
                </span>
                <Slider
                    style={{width: "150px"}}
                    aria-label="default"
                    valueLabelDisplay="auto"
                    value={volume * 100}
                    onChange={(e) => handleVolume(e)}
                />
            </div>
        </footer>
    );
};

export default Footer;
