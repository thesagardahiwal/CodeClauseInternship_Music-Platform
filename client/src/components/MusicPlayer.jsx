// src/components/MusicPlayer.jsx
import React from 'react';
import {useAudioPlayer} from '../hooks/AudioPlayerProvider.jsx';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const MusicPlayer = ({ track }) => {
    const {setNewTrack} = useAudioPlayer();
    
    return (
        <div className='flex m-2 bg-slate-300 items-center justify-center rounded-md p-5'>
            <div className='h-[100px] flex flex-col justify-end items-center w-[100px] '>
                <img src={track?.album?.images[0]?.url} alt="mp3" style={{height: 50, width: "auto"}} />
                <h2 className='text-[10px] ellipsissm'>{track.name}</h2>
                <p className='ellipsissm text-[7px]'>{track?.artists?.map(artist => artist.name).join(', ')}</p>
                <button onClick={() => setNewTrack(() => track)}>
                    <PlayCircleIcon />
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;
