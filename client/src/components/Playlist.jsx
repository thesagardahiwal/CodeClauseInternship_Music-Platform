import React, { useEffect, useMemo, useState } from 'react'
import { getFreeTracks, getRecommandation, fetchAccessToken, createPlaylist } from "../services/api.js"
import MusicPlayer from './MusicPlayer.jsx';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider.jsx';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

function Playlist() {
    const list = [];
    const [isCreating, setIsCreating] = useState(false);
    const handleCreatePlaylist = (e) => {
        e.preventDefault()
        createPlaylist(e.target[0].value);
    }
    return (
        <div className='p-2'>
            <div className='text-lg flex justify-between p-1 font-bold'>
                <p>Your Library</p>
                <button onClick={() => setIsCreating((prev) => !prev)}>
                    {isCreating ?
                        <AddCircleOutlineOutlinedIcon />
                        :
                        <RemoveCircleOutlineRoundedIcon />
                    }
                </button>
            </div>
            <form onSubmit={(e) => handleCreatePlaylist(e)} className={`grid grid-cols-1 font-medium gap-1 p-1 ${isCreating ? "hidden" : ""}`}>
                <input type="text" className='p-1' placeholder='Playlist name' />
                <button type='submit'><CreateNewFolderRoundedIcon /></button>
            </form>
            {list && list.map((el, i) => (
                <div key={i} className='p-2 m-2 flex justify-between bg-slate-200 font-semibold rounded-md'>
                    <h1>{el}</h1>
                    <p className='text-sm text-slate-400'>Date</p>
                </div>
            ))}
        </div>
    )
}

export default Playlist