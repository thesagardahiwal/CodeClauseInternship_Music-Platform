import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider.jsx';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { addTrackToPlaylist, getPlaylist } from "../services/api.js"
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useTheme } from '../hooks/ThemeToggler.jsx';
import TrackAdder from './TrackAdder.jsx';

const MusicPlayer = ({ track }) => {
    if (!track.preview_url) return;
    const { setNewTrack } = useAudioPlayer();
    const { setTheme, currentTheme } = useTheme();
    
    return (
        <div className={`flex m-2 ${currentTheme.musicPlayer} items-center justify-center rounded-md p-2`}>
            <div className='h-fit flex flex-col justify-end items-center w-[100px] '>
                <img src={track?.album?.images[0]?.url} alt="mp3" style={{ height: 50, width: "auto" }} />
                <h2 className='text-[10px] ellipsissm'>{track.name}</h2>
                <p className='ellipsissm text-[7px]'>{track?.artists?.map(artist => artist.name).join(', ')}</p>
                <div className='flex items-center justify-between'>
                    <button className='px-2 h-10' onClick={() => setNewTrack(() => track)}>
                        <PlayCircleIcon />
                    </button>
                    <TrackAdder track={track}/>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
