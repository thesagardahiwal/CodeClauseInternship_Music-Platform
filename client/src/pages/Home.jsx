import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Playlist from '../components/Playlist';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider';
import { fetchAccessToken, getRecommandation } from '../services/api';
import MusicPlayer from '../components/MusicPlayer';
import MusicDetails from '../components/MusicDetails';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Home = () => {
    const {setPlayList, playList, track}  = useAudioPlayer();
    const accessToken = useMemo(() => fetchAccessToken().then((data) => {
        return data;
    }))
    
    useEffect(() => {
        getRecommandation(accessToken, moodParams).then((data) => {
            let i = 0;
            setPlayList(() =>  data.map(el => ({...el, index: i++})));
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
        <div className='flex'>
            <div className='w-1/4 rounded-md m-1'>
                <div className='bg-slate-100 p-1 rounded-md m-1'>
                    <h1 className='font-semibold flex items-center gap-2 m-2'><HomeRoundedIcon/> Home</h1>
                    <div className='font-semibold p-1 flex items-center gap-2 m-2'>
                        <SearchRoundedIcon />
                        <input className='rounded-md p-1' type="text" placeholder='Search' />
                    </div>
                </div>
                <div>
                    <Playlist />
                </div>
            </div>
            <div className='flex-1 overflow-hidden flex flex-wrap'>
                {playList.map((track, i) => (
                    <MusicPlayer track={track} key={i} />
                ))}
            </div>
            {track &&
            <div className='w-full'>
                <MusicDetails />
            </div>
            }
        </div>
    );
};

export default Home;
