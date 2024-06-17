// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Playlist from '../components/Playlist';


const Home = () => {
    
    return (
        <div>
            <div className='p-4'>
                <h1 className='text-4xl font-bold'>Welcome to Music Platform</h1>
                <Link to="/explore" className='font-semibold ml-2'>Explore Music</Link>
            </div>
            <div className=''>
                <Playlist />
            </div>
        </div>
    );
};

export default Home;
