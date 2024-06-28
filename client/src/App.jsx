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
import { useTheme } from './hooks/ThemeToggler.jsx';


const App = () => {
    const { track } = useAudioPlayer();
    const {currentTheme, showMenu} = useTheme();
    return (
        <>
            <main className={`${currentTheme.background} grid grid-cols-8`}>
                <div className={` min-h-[100vh] ${showMenu ? "col-span-8" : "hidden sm:grid lg:col-span-2 sm:col-span-3"} p-1 rounded-md m-1 ${currentTheme.menu}`}>
                    <Menu />
                </div>
                <div className={`${track ? "lg:col-span-4" : "lg:col-span-5"} grid content-center ${showMenu ? "hidden" : "col-span-8 sm:col-span-5"} justify-center items-center px-2 lg:p-0 `}>
                    <div className='sticky z-50 top-0'>
                        <Header />
                    </div>
                    <div className='min-h-[100vh]'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/playlists/:id" element={<PlaylistDetail />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </div>
                </div>
                {track &&
                    <div className={`ease-in-out transition ${currentTheme.musicDetails} hidden lg:grid p-4 duration-300 md:col-span-2`}>
                        <MusicDetails />
                    </div>
                }
            </main>
            <Footer />
        </>
    );
};

export default App;
