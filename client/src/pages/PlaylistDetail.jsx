import React, { useEffect, useState } from 'react'
import { getPlaylist } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../hooks/ThemeToggler';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';

function PlaylistDetail() {
  const { setTheme, currentTheme, setShowMenu } = useTheme();
  const [playlist, setPlayist] = useState([]);
  const { setNewTrack, track, isPlaying } = useAudioPlayer();
  const playlistId = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    getPlaylist(playlistId.id)
    .then((data) => setPlayist(() => data.tracks.map((el) => ({...el}))))
    .catch((e) => {
      console.log("Error to Fetch Playlist Details");
      navigate("/")
    })
  }, [playlistId]);
  return (
    <div className={`${currentTheme.PlaylistDetail} p-4 grid h-[100vh] grid-cols-8 grid-rows-10`}>
      <div className='lg:col-span-3 lg:row-span-4 sm:row-span-4 row-span-3 align-middle col-span-8 grid justify-center md:justify-normal content-center p-4 items-center'>
        {track ?
          <img src={track._id ? track.album.image : playlist[0].album.image} className='rounded-lg sm:h-56 h-40' alt={track?.name} />
          :
          <AlbumRoundedIcon style={{fontSize: "200px"}} />
        }
        <p className='p-2 font-semibold'>
          {track._id? track.name : playlist[0].name}
        </p>
      </div>
      <div className='md:col-span-5 col-span-8'>
          {playlist && playlist.map((track, i) => (
            <div onClick={() => setNewTrack(track)} className={`${currentTheme.PlaylistDetailItem} m-1 rounded-md grid grid-cols-8 cursor-pointer items-center gap-1 content-center p-1`} key={i}>
              <img className='p-1 rounded-md' src={track.album.image} alt={track.name} />
              <p className='col-span-5'>{track.name}</p>
              <PlayCircleIcon/>
            </div>
          ))}
      </div>
    </div>
  )
}

export default PlaylistDetail