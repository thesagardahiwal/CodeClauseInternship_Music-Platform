// src/components/Header.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout, register, getCurrentUser } from "../services/auth.js"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton, Menu, MenuItem, Typography, Tooltip, styled, Switch} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { searchTracks } from '../services/api.js';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider.jsx';
import { useTheme } from '../hooks/ThemeToggler.jsx';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const Header = () => {
    const [settings, setSettings] = useState(["Login"]);
    const { setTheme, currentTheme, theme, showMenu, setShowMenu } = useTheme();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const {setPlayList} = useAudioPlayer();
    const user = useMemo(() => getCurrentUser(), []);

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
        else if (setting === "Logout") {
            logout();
            location.reload();
        }
    };

    useEffect(() => {
      user.then((data) => {
        setSettings(() => [data.username, "Logout"])
      }).catch((e) => {
        setSettings(() => ["Login", "Sign Up"])
      })
    
    }, [user]);
    

    const searchTrack = (e) => {
        e.preventDefault();
        searchTracks(e.target[0].value).then((fetchedTracks) => {
            setPlayList(() => fetchedTracks);
            navigate("/")
        }).catch((e) => console.log(e));
    }

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
          margin: 1,
          padding: 0,
          transform: 'translateX(6px)',
          '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
              )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
          width: 32,
          height: 32,
          '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
              '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
          },
        },
        '& .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
          borderRadius: 20 / 2,
        },
      }));

    return (
        <div className='sticky overflow-hidden top-0'>
            <header className={`p-4 flex ${currentTheme.header} rounded-bl-lg rounded-br-lg items-center h-[70px] justify-between`}>
                <div className='text-3xl sm:flex hidden gap-2 font-bold'>
                    <Link onClick={() => navigate(-1)} ><ArrowBackIosNewIcon /></Link>
                    <Link onClick={() => navigate(1)}><ArrowForwardIosIcon /></Link>
                    {/* <MaterialUISwitch onClick={() => setTheme((prev) => !prev)}/> */}
                </div>
                <div className='sm:hidden cursor-pointer flex' onClick={() => setShowMenu((prev) => !prev)}>
                    <MenuRoundedIcon />
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
                                <AccountCircleIcon style={{color:`${theme ? "black" : "green"}`, height: "30px"}} />
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
