'use client';

import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, serPassword] = useState('');

  const saveHandler = async () => {
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify({ firstName, lastName, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('data', data);
    data.status == 201
      ? toast.success(data.message)
      : toast.error(data.message);
  };
  return (
    <div className='m-10'>
      <h1 className='text-6xl font-extrabold text-cyan-500'>profile</h1>
      <div className='mt-6 mb-2 flex-nowrap items-center '>
        <label className='flex flex-wrap mb-1'>First-Name:</label>
        <input
          type='text'
          name='firstName'
          className='px-2 py-1 rounded-sm text-black mb-2'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className='my-2 flex-nowrap items-center'>
        <label className='flex flex-wrap mb-1'>Last-Name:</label>
        <input
          type='text'
          value={lastName}
          className='px-2 py-1 rounded-sm text-black mb-2'
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className='my-2 flex-nowrap items-center'>
        <label className='flex flex-wrap mb-1'>Password:</label>
        <input
          type='password'
          value={password}
          className='px-2 py-1 rounded-sm text-black mb-2'
          onChange={(e) => serPassword(e.target.value)}
        />
      </div>
      <button
        onClick={saveHandler}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-4'
      >
        Save
      </button>
      <Toaster position='top-rigth' reverseOrder={false} />
    </div>
  );
};

export default ProfilePage;
