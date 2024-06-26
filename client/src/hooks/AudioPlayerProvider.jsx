import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { getPlaylist } from '../services/api';

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => {
    return useContext(AudioPlayerContext);
};

const AudioPlayerProvider = ({ children }) => {
    const [playList, setPlayList] = useState([]);
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [previousTracks, setPreviousTracks] = useState([]);
    const [load, setLoad] = useState(false);

    const play = () => {
        const audio = audioRef.current;
        audio.play().then(() => {
            setIsPlaying(true);
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
    };

    const pause = () => {
        const audio = audioRef.current;
        audio.pause();
        setIsPlaying(false);
    };
    const stop = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(() => false);
    };
    const changeVolume = (newVolume) => {
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };
    const setNewTrack = (newTrack) => {
        if (isPlaying) {
            stop();
        }
        setTrack(newTrack);
    };

    const nextSong = () => {
        let idx = track.index || 0;
        setPreviousTracks((tracks) => [...tracks, track]);
        let nextSong = playList.find((el) => el.index == idx+1);
        setNewTrack(() => nextSong);
    }
    const prevSong = () => {
        setNewTrack(() => previousTracks.pop());
        setPreviousTracks(() => previousTracks);
    }

    useEffect(() => {
        const audio = audioRef.current;
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleDurationChange = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleDurationChange);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleDurationChange);
        };
    }, []);

    useEffect(() => {
        if (track && track.preview_url) {
            audioRef.current.src = track.preview_url;
        }
    }, [track]);

    useEffect(() => {
        if (!track) return;
        if (currentTime == duration) {
            nextSong()
        }
    }, [currentTime]);


    useEffect(() => {

    }, [load]);



    return (
        <AudioPlayerContext.Provider value={{ setLoad, load, setIsPlaying, track, isPlaying, play, pause,setPlayList, playList, stop, setNewTrack, volume, audioRef, currentTime, duration, changeVolume, prevSong, nextSong }}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export default AudioPlayerProvider;
