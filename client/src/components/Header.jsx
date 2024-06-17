// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {login, logout, getCurrentUser, register} from "../services/auth.js"
const Header = () => {
    const user = getCurrentUser();
    const url = !user ? "/signin" : "/profile"
    return (
        <header className='p-4 flex bg-[#f0f0f0] items-end h-[70px] justify-between'>
            <h1 className='text-3xl font-bold'>Music Platform</h1>
            <nav className='flex mt-2 gap-4 justify-end font-semibold'>
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/playlists">Playlists</Link>
                <Link to={url}>{!user? "Sign Up/In" : "Profile"}</Link>
            </nav>
        </header>
    );
};

export default Header;
