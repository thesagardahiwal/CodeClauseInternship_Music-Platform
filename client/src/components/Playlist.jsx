import React, { useEffect, useState } from 'react'
import { getFreeTracks, getRecommandation, fetchAccessToken } from "../services/api.js"
import MusicPlayer from './MusicPlayer.jsx';
function Playlist() {
    const [playList, setPlayList] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    
    useEffect(() => {
        
        accessToken ?? fetchAccessToken().then((data) => {
            setAccessToken(() => data);
        })
        playList ?? getRecommandation(accessToken, moodParams).then((data) => {
            setPlayList(() => data)
        })
    }, [accessToken, playList]);

    
    
    // Example mood parameters
    const moodParams = {
        genres: ['happy', 'chill'], // You can find the list of available genre seeds in Spotify's documentation
        danceability: 0.8,
        energy: 0.7,
        valence: 0.9 // High valence for positive mood
    };

    
  return (
    <div className='grid p-2 gap-2 h-full'>
        {playList?.map((track, index) => (
            <div key={index}>
                <MusicPlayer track={track}/>
            </div>
        ))}
    </div>
  )
}

export default Playlist