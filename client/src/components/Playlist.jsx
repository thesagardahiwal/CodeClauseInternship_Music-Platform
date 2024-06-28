import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useTheme } from '../hooks/ThemeToggler';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

function Playlist({playlist, deleteHandler}) {
    const { setTheme, currentTheme, setShowMenu } = useTheme();
    const navigate = useNavigate();
    return (
        <div className={`${currentTheme.menuPlaylist} p-2 grid rounded-md content-center grid-cols-6`}>
            <h1 onClick={() => {navigate(`/playlists/${playlist._id}`); setShowMenu(() => false)}} className='cursor-pointer col-span-4 text-md:font-bold font-semibold'>
                {playlist.name}
            </h1>
            <p className='col-span-2 pb-1 text-slate-300'>
                {playlist.date}
            </p>
            <span className='col-start-2 text-slate-400 col-span-2'>
                {playlist.tracks.length} Songs
            </span>
            <span onClick={() => deleteHandler(playlist._id)} className='col-start-4 text-red-400 cursor-pointer col-span-2 rounded-lg text-center'>
                <DeleteForeverIcon />
            </span>
            <span>
                <ShareRoundedIcon />
            </span>
        </div>
    )
}

export default Playlist