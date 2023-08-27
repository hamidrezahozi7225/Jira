'use client';
import React, { useState } from 'react';
import styles from './Todo.module.css';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Todo = ({ data, next, Previous, classname, allData, steps }) => {
  const router = useRouter();
  const pnHandler = async (next, prev, datas, step) => {
    let task = allData;

    if (step == 'next') {
      datas.status = next;
    } else {
      datas.status = prev;
    }

    task.map((item) => {
      if (item.name === datas.name) {
        item.name = datas.name;
        item.status = datas.status;
      }
      return item;
    });

    const res = await fetch('/api/task', {
      method: 'PATCH',
      body: JSON.stringify({ task }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.message == 'successFul!') {
      toast.success('success');
      router.refresh();
    }
  };
  return (
    <div className={styles[classname]}>
      <header>{classname}</header>
      <div>
        {data.map((item) => (
          <div className='bg-white text-black font-bold m-2 rounded-md '>
            <h1 className='p-4'>{item.name}</h1>
            <div className='flex flex-wrap justify-between mt-3 p-2'>
              {Previous && (
                <button
                  onClick={() => pnHandler(next, Previous, item, 'prev', steps)}
                >
                  Previous
                </button>
              )}
              {next && (
                <button
                  onClick={() => pnHandler(next, Previous, item, 'next', steps)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default Todo;
