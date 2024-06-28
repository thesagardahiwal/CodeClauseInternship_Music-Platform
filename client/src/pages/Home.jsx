import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Playlist from '../components/Playlist';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider';
import { fetchAccessToken, getRecommandation } from '../services/api';
import MusicPlayer from '../components/MusicPlayer';
import MusicDetails from '../components/MusicDetails';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Header from '../components/Header';
import { useTheme } from '../hooks/ThemeToggler';

const Home = () => {
    const { setTheme, currentTheme } = useTheme();
    const { setPlayList, playList, track } = useAudioPlayer();
    const accessToken = useMemo(() => fetchAccessToken().then((data) => {
        return data;
    }))

    useEffect(() => {
        getRecommandation(accessToken, moodParams).then((data) => {
            let i = 0;
            setPlayList(() => data.map(el => ({ ...el, index: i++ })));
        }).catch(() => {
            console.log("Error to fetch");
        })
    }, []);

    const moodParams = {
        genres: ['happy', 'chill'],
        danceability: 0.8,
        energy: 0.7,
        valence: 0.9
    };


    return (
        <div className=''>
            <div className='flex flex-wrap'>
                {playList.map((track, i) => (
                    <MusicPlayer track={track} key={i} />
                ))}
            </div>
        </div>
    );
};

export default Home;
