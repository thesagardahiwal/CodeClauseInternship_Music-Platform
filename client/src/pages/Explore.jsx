// src/pages/Explore.jsx
import React, { useEffect, useState } from 'react';
import { getTracks } from '../services/api';
import MusicPlayer from '../components/MusicPlayer';
import { useTheme } from '../hooks/ThemeToggler';
// import { getCurrentUser } from '../services/auth';

const Explore = () => {
    const [tracks, setTracks] = useState([]);
    const { setTheme, currentTheme } = useTheme();
    useEffect(() => {

    }, []);

    return (
        <div className={`${currentTheme.explore} h-[100vh]`}>
            <h1>Explore Music</h1>
            {/* {tracks.map(track => (
                <MusicPlayer key={track.id} track={track} />
            ))} */}
        </div>
    );
};

export default Explore;
