// src/components/MusicPlayer.jsx
import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider.jsx';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { addTrackToPlaylist, getPlaylist } from "../services/api.js"
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

function TrackAdder({track}) {
    const [playlist, setPlaylist] = useState([]);

    const { setLoad, load } = useAudioPlayer();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleTrack = (playlist) => {
        console.log(playlist)
        const Track = {
            name: track.name,
            album: {
                image: track.album.images[0].url
            },
            preview_url: track.preview_url
        }
        addTrackToPlaylist(Track, playlist._id).then(() => setLoad((prev) => !prev));
    }

    useEffect(() => {
        getPlaylist().then((data) => {
            setPlaylist(() => data.map(el => ({ ...el })))
        })
            .catch((e) => console.log("Error to add Track!", e))
    }, [load])
    return (
        <Stack direction={"row"} spacing={2} className='!p-0 !m-0'>
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className='!p-0 !m-0 !z-0'
                >
                    <AddCircleOutlineOutlinedIcon />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow

                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                        className='!z-50'
                                    >
                                        {playlist && playlist.map((el, i) => (
                                            <MenuItem style={{ zIndex: 10 }} key={`${i}--00`} onClick={(e) => { handleTrack(el); handleClose(e); }}>{el.name}</MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    )
}

export default TrackAdder