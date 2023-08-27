'use client';

import React, { useState } from 'react';
import RadioButton from '../module/RadioButton';
import { BsAlignStart } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { MdDoneAll } from 'react-icons/md';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddTaskPage = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('todo');
  const router = useRouter();

  const taskHandler = async () => {
    const res = await fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify({ name, status }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (res.status == 201) {
      toast.success(data.message);
      router.refresh();
    }
  };
  return (
    <div className='p-20'>
      <div className='flex-nowrap'>
        <label htmlFor='name'>Name:</label>
        <div className='pt-2 '>
          <input
            className='p-1 rounded-sm text-black'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className='mt-8'>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value='todo'
          title='Todo'
        >
          <BsAlignStart />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value='inProgress'
          title='In Progress'
        >
          <FiSettings />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value='review'
          title='Review'
        >
          <AiOutlineFileSearch />
        </RadioButton>
        <RadioButton
          status={status}
          setStatus={setStatus}
          value='done'
          title='Done'
        >
          <MdDoneAll />
        </RadioButton>
      </div>
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-4'
          onClick={taskHandler}
        >
          Add Task
        </button>
      </div>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default AddTaskPage;
