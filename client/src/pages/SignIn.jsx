// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useTheme } from '../hooks/ThemeToggler';

const SignIn = () => {
    const { setTheme, currentTheme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/explore');
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className={`flex h-[100vh] flex-col ${currentTheme.signIn} items-center p-40`}>
            <form onSubmit={handleSubmit} className='grid p-10 shadow-md rounded-md gap-2 col-1 w-[300px]'>
                <div className='mb-3'>
                    <h1 className='font-semibold md:font-bold'>Welcome to <span className='bg-gradient-to-r text-lg from-pink-600 to-pink-900 inline-block text-transparent bg-clip-text'>Tunely</span></h1>
                </div>
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
                <button type="submit" className='bg-blue-400 p-1 hover:bg-violet-900 rounded-md'>Sign In</button>
            </form>
            <p className='mt-2'><Link to={"/signup"} className='text-violet-700'>Sign up</Link> if you don't have any account!</p>
        </div>
    );
};

export default SignIn;
