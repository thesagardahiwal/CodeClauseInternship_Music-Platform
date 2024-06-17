// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
        <div className='flex justify-center flex-col items-center p-40'>
            <form onSubmit={handleSubmit} className='grid bg-slate-100 p-2 rounded-md gap-2 col-1 w-[200px]'>
            <h1>Sign Up</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-blue-400 rounded-md' type="submit">Sign Up</button>
            </form>
            <p className='mt-2'><Link to={"/signin"} className='text-violet-700'>Sign in</Link> if you have an account.</p>
        </div>
    );
};

export default SignUp;
