'use client';

import { testPassword, validateEmail } from '@/utils/helper';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const roter = useRouter();

  const signUpHandler = async () => {
    const validEmail = validateEmail(email);
    const validPass = testPassword(password);

    if (!validEmail) {
      toast.error('email Is Not Correct.');
      return;
    }
    if (!validPass.valid) {
      toast.error(validPass.message);
      return;
    }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (res.status == 422) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      roter.push('/login');
    }
  };

  return (
    <div className=' flex flex-wrap justify-center items-center min-h-screen'>
      <div className='bg-blue-700 rounded-lg p-5 w-4/12 align-bottom'>
        <h1 className=' text-center font-bold'>Sign-Up</h1>
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
          Sign-Up
        </button>
        <h4 className='text-center mt-3'>
          Already a member?{' '}
          <Link className='font-bold' href='/login'>
            Log In
          </Link>
        </h4>
      </div>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default SignUpPage;
