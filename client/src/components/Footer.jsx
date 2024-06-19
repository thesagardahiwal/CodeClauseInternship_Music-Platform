import React, { useEffect, useState } from 'react';
import {useAudioPlayer} from '../hooks/AudioPlayerProvider.jsx';
import Playbar from './Playbar.jsx';
import { Slider } from '@mui/material';
import VolumeMuteOutlinedIcon from '@mui/icons-material/VolumeMuteOutlined';
import VolumeMuteRoundedIcon from '@mui/icons-material/VolumeMuteRounded';
import { album } from '../assets/index.js';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const Footer = () => {
    const {track, isPlaying, volume, changeVolume, play, pause, currentTime, duration, audioRef} = useAudioPlayer();
    const [isMute, setIsMute] = useState(false);
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
    }, [track])
    return (
        <footer className='h-[100px] bg-[#f0f0f0] sticky bottom-0 flex items-center'>
            <div className='w-1/3 flex items-center p-2 gap-2'>
                <img src={track?.album?.images[2].url || album} alt="album" style={{height: 50}} />
                <div>
                    <p className='font-semibold'>{track?.name}</p>
                    <p className='ellipsis text-[10px]'>{track?.artists?.map(artist => artist.name).join(', ')}</p>
                </div>
                <span><AddCircleOutlineOutlinedIcon /></span>
            </div>

            <div className='w-1/3'>
                <Playbar />
                <div className='flex gap-2 justify-center items-center'>
                <p className='text-sm'>
                        {formatTime(currentTime)}
                    </p>
                    <Slider
                        size="small"
                        value={Math.floor((audioRef.current.currentTime / duration) * 100)}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        onChange={(e) => handleChange(e)}
                    />
                    <p className='text-sm'>
                        {formatTime(duration)}
                    </p>
                </div>
            </div>
            <div className='flex flex-1 gap-2 justify-center align-middle items-center p-2'>
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
