'use client';

import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const roter = useRouter();

  const signUpHandler = async () => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    console.log('res', res);
    if (res.error == null) {
      roter.push('/dashboard');
      toast.success('Login Successful');
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className=' flex flex-wrap justify-center items-center min-h-screen'>
      <div className='bg-blue-700 rounded-lg p-5 w-4/12 align-bottom'>
        <h1 className=' text-center font-bold'>Sign-In</h1>
        <div className=' flex-nowrap my-4 '>
          <label htmlFor='userName' className='font-bold'>
            User Name:
          </label>
          <div className='mt-2 '>
            <input
              className='w-11/12 rounded-md bg-black bg-opacity-50 p-2 border-s-4'
              type='text'
              name='userName'
              id='userName'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className=' flex-nowrap my-4'>
          <label htmlFor='password' className='font-bold'>
            Password:
          </label>
          <div className='mt-2'>
            <input
              className='w-11/12 rounded-md bg-black bg-opacity-50 p-2 border-s-4'
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-4'
          onClick={signUpHandler}
        >
          Login
        </button>
        <h4 className='text-center mt-3'>
          create account?{' '}
          <Link className='font-bold' href='/signup'>
            Sign-Up
          </Link>
        </h4>
      </div>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default LoginPage;
