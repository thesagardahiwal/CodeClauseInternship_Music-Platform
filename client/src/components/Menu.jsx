import Reac,{ useEffect, useMemo, useState } from 'react'
import Playlist from '../components/Playlist';
import { useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { getFreeTracks, getRecommandation, fetchAccessToken, createPlaylist, getPlaylist, deletePlaylist } from "../services/api.js"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useTheme } from '../hooks/ThemeToggler.jsx';
import { useAudioPlayer } from '../hooks/AudioPlayerProvider.jsx';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';

function Menu() {
  const {setLoad, load} = useAudioPlayer();
  const [Playlists, setPlaylists] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const {currentTheme, setTheme, theme, showMenu, setShowMenu} = useTheme()
  const navigate = useNavigate()
  const handleCreatePlaylist = (e) => {
      e.preventDefault()
      createPlaylist(e.target[0].value);
      e.target[0].value = ""
      setIsCreating(() => false);
      setLoad((prev) => !prev);

  }

  const deleteHandler = (id) => {
    deletePlaylist(id)
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.log(e));
    setLoad((prev) => !prev);
  }

  useEffect(() => {
    getPlaylist()
    .then((data) => {
      setPlaylists(() => data.map((el) => ({...el})))
    })
    .catch((e) => console.log("Error to get!", e))
  }, [isCreating, load])
  return (
      <div className='sticky top-2'>
          <div className={`${currentTheme.menuItems} p-1 sticky top-2 rounded-md m-1'`}>
              <h1 onClick={() => navigate("/")} className='font-semibold cursor-pointer justify-between flex items-center gap-2 m-2'>
                <div><HomeRoundedIcon /> Home</div>
                <div className={`${showMenu ? "block" : "hidden"}`} onClick={() => setShowMenu((prev) => false)}><MenuOpenRoundedIcon /></div>
              </h1>
              <label className='font-semibold p-1 flex items-center gap-1 m-2' htmlFor='search'>
                <SearchRoundedIcon />Search
              </label>
          </div>
          <div className={`${currentTheme.menuItems} text-lg rounded-md my-2 flex justify-between p-1 font-bold`}>
                <p className='px-2'>Your Library</p>
                <button onClick={() => setIsCreating((prev) => !prev)}>
                    {isCreating ?
                        <AddCircleOutlineOutlinedIcon />
                        :
                        <RemoveCircleOutlineRoundedIcon />
                    }
                </button>
            </div>
            <form onSubmit={(e) => handleCreatePlaylist(e)} className={`grid ${currentTheme.menuItems} rounded-md grid-cols-6 my-2 font-medium gap-1 p-2 ${ !isCreating ? "hidden" : ""}`}>
                <input type="text" className='p-1 rounded-md col-span-5 text-slate-100 bg-violet-500' placeholder='Playlist name' />
                <button type='submit'><CreateNewFolderRoundedIcon /></button>
            </form>
          <div className={`overflow-auto grid gap-1`}>
              { Playlists && Playlists.map((el, i) => (
                <Playlist playlist={el} deleteHandler={deleteHandler} key={i} />
              ))}
          </div>
      </div>
  )
}

export default Menu