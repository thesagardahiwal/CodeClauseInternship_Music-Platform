// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PlaylistDetail from './pages/PlaylistDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Menu from './components/Menu.jsx';
import { useAudioPlayer } from './hooks/AudioPlayerProvider.jsx';
import MusicDetails from './components/MusicDetails.jsx';


const App = () => {
    const { track } = useAudioPlayer();
    return (
        <>
            <main className='grid grid-cols-8'>
                <div className='col-span-2 h-[100vh] rounded-md m-1'>
                    <Menu />
                </div>
                <div className={`${track ? "col-span-4" : "col-span-6"}`}>
                    <div className='sticky top-0'>
                        <Header />
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/playlists/:id" element={<PlaylistDetail />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </div>
                {track &&
                    <div className='ease-in-out duration-300 col-span-2'>
                        <MusicDetails />
                    </div>
                }
            </main>
            <Footer />
        </>
    );
};

export default App;
