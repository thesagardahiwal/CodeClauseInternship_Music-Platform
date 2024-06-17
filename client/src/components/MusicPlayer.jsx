// src/components/MusicPlayer.jsx
import React, { useState } from 'react';

const MusicPlayer = ({ track }) => {

    const [audio, setAudio] = useState(null);
    const [error, setError] = useState('');
    console.log(track.album.images[0])
    const playTrack = () => {
        if (track && track.preview_url) {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
            const newAudio = new Audio(track.preview_url);
            newAudio.onerror = () => {
                console.error('Failed to play the audio');
                setError('Failed to play the audio. The format might not be supported.');
            };
            newAudio.play().catch(err => {
                console.error('Error playing audio:', err);
                setError('Error playing audio: ' + err.message);
            });
            setAudio(newAudio);
        } else {
            setError('No preview URL available for this track');
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {track ? (
                <div className='bg-slate-300 rounded-md p-2'>
                    <img src={track.album.images[0].url} alt="mp3" style={{height: 230, width: "auto"}} />
                    <h2>{track.name}</h2>
                    <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                    <button className='bg-blue-400 rounded-md p-1' onClick={playTrack}>Play Preview</button>
                </div>
            ) : (
                <p>Loading track info...</p>
            )}
        </div>
    );
};

export default MusicPlayer;
