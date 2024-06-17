// src/pages/Explore.jsx
import React, { useEffect, useState } from 'react';
import { getTracks } from '../services/api';
import MusicPlayer from '../components/MusicPlayer';
import { getCurrentUser } from '../services/auth';

const Explore = () => {
    const [tracks, setTracks] = useState([]);
    const user = getCurrentUser();

    useEffect(() => {
        const fetchTracks = async () => {
            if (user) {
                const data = await getTracks(user.token);
                setTracks(data);
            }
        };

        fetchTracks();
    }, [user]);

    return (
        <div>
            <h1>Explore Music</h1>
            {/* {tracks.map(track => (
                <MusicPlayer key={track.id} track={track} />
            ))} */}
        </div>
    );
};

export default Explore;
