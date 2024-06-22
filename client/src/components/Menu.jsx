import React from 'react'
import Playlist from '../components/Playlist';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Menu() {
  return (
      <div className='sticky top-2'>
          <div className='bg-slate-100 p-1 rounded-md m-1'>
              <h1 className='font-semibold flex items-center gap-2 m-2'><HomeRoundedIcon /> Home</h1>
              <label className='font-semibold p-1 flex items-center gap-1 m-2' htmlFor='search'>
                <SearchRoundedIcon />Search
              </label>
          </div>
          <div>
              <Playlist />
          </div>
      </div>
  )
}

export default Menu