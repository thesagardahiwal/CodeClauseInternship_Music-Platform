// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const SignIn = () => {
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
        <div className='flex justify-center flex-col items-center p-40'>
            <form onSubmit={handleSubmit} className='grid bg-slate-100 p-2 rounded-md gap-2 col-1 w-[200px]'>
                <h1 className='mb-3'>Sign In</h1>
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
                <button type="submit" className='bg-blue-400 rounded-md'>Sign In</button>
            </form>
            <p className='mt-2'><Link to={"/signup"} className='text-violet-700'>Sign up</Link> if you don't have any account!</p>
        </div>
    );
};

export default SignIn;
