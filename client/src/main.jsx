// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AudioPlayerProvider from './hooks/AudioPlayerProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <AudioPlayerProvider>
            <App />
        </AudioPlayerProvider>
    </Router>
);
