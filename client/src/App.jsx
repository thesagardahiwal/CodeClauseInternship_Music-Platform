// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PlaylistDetail from './pages/PlaylistDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AudioPlayerProvider from './hooks/AudioPlayerProvider.jsx';

const App = () => {
    return (
        <Router>
            <Header />
            <AudioPlayerProvider>
                <main className='h-[100vh]'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/playlists/:id" element={<PlaylistDetail />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </main>
                <Footer />
            </AudioPlayerProvider>
        </Router>
    );
};

export default App;
