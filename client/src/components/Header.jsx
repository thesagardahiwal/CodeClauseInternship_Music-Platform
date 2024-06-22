// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout, getCurrentUser, register } from "../services/auth.js"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, IconButton, Menu, MenuItem, Typography, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { searchTracks } from '../services/api.js';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider.jsx';

const Header = () => {
    const [settings, setSettings] = useState(["Login"]);
    const user = getCurrentUser();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const {setPlayList} = useAudioPlayer()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting === "Login") {
            navigate("/signin");
            return;
        }
        else if (setting === "Sign Up") {
            navigate("/signup");
            return;
        }
    };

    const searchTrack = (e) => {
        e.preventDefault();
        searchTracks(e.target[0].value).then((fetchedTracks) => {
            setPlayList(() => fetchedTracks);
        }).catch((e) => console.log(e));
    }

    useEffect(() => {
        if (user) {
            setSettings(() => ["Profile", "Logout"])
        }
    }, [])
    return (
        <div className='sticky top-0'>
            <header className='p-4 flex bg-slate-100 rounded-e-md items-center h-[70px] justify-between'>
                <div className='text-3xl flex gap-2 font-bold'>
                    <Link onClick={() => navigate(-1)} ><ArrowBackIosNewIcon /></Link>
                    <Link onClick={() => navigate(1)}><ArrowForwardIosIcon /></Link>
                </div>
                <form onSubmit={(e) => searchTrack(e)} className='font-semibold p-1 flex items-center gap-2 m-2'>
                    <input id='search' name='search' className='rounded-md p-1' type="text" placeholder='Search' />
                    <button type='submit'><SearchRoundedIcon /></button>
                </form>
                <nav className='flex mt-2 gap-4 justify-end  items-center font-semibold'>
                    <Link to="/explore"><NotificationsIcon /></Link>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon />
                                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </nav>
            </header>
        </div>
    );
};

export default Header;
