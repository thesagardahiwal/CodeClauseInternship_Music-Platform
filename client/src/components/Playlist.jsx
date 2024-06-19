import React, { useEffect, useMemo, useState } from 'react'
import { getFreeTracks, getRecommandation, fetchAccessToken } from "../services/api.js"
import MusicPlayer from './MusicPlayer.jsx';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider.jsx';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
function Playlist() {
    
    return (
        <div className='p-2'>
            <h1 className='text-lg font-bold'>Your Library</h1>
            <ul>
                <li className='list'>Liked Music</li>
                <li className='list'>Old Music</li>
                <li className='list'>Romantic Music</li>
                <li className='list'>HipHop Music</li>
            </ul>
        </div>
    )
}

export default Playlist