// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import { useTheme } from '../hooks/ThemeToggler';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setTheme, currentTheme } = useTheme();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ username, email, password });
            navigate('/signin');
        } catch (error) {
            console.error('Error signing up', error);
        }
    };

    return (
        <div className={`${currentTheme.signIn} h-[100vh] flex flex-col items-center p-40`}>
            <form onSubmit={handleSubmit} className='grid p-10 shadow-md rounded-md gap-2 col-1 w-[300px]'>
                <div className='mb-3'>
                    <h1 className='font-semibold md:font-bold'>Welcome to <span className='bg-gradient-to-r text-lg from-pink-600 to-pink-900 inline-block text-transparent bg-clip-text'>Tunely</span></h1>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    className='p-1 bg-blue-900 rounded-md'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className='p-1 bg-blue-900 rounded-md'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className='p-1 bg-blue-900 rounded-md'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-blue-400 p-1 hover:bg-violet-900 rounded-md' type="submit">Sign Up</button>
            </form>
            <p className='mt-2'><Link to={"/signin"} className='text-violet-700'>Sign in</Link> if you have an account.</p>
        </div>
    );
};

export default SignUp;
