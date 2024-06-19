import React from 'react'
import { useAudioPlayer } from '../hooks/AudioPlayerProvider'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function MusicDetails() {
    const {track} = useAudioPlayer();
    console.log(track)
  return (
    <div className='sticky top-12'>
        <div className='grid grid-cols-6 gap-4 mt-3'>
            <div className='col-start-2 col-span-4'>
                <img src={track?.album?.images[0].url} alt="" srcset="" style={{width: "100%", borderRadius: 10}} />
            </div>
            <h1 className='col-start-1 ellipsis col-end-5 text-lg font-semibold'>{track?.name}</h1>
            <div class="col-end-7 col-span-2"><AddCircleOutlineOutlinedIcon /></div>
            <p className='ellipsis col-start-1 col-end-7'>{track?.artists?.map(artist => artist.name).join(', ')}</p>
        </div>
    </div>
  )
}

export default MusicDetails