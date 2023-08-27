'use client';

import Link from 'next/link';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { VscListSelection } from 'react-icons/vsc';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import { BsFillArrowThroughHeartFill } from 'react-icons/bs';
import { signOut, useSession } from 'next-auth/react';

const Layout = ({ children }) => {
  const { data } = useSession();

  const logHandler = () => {
    signOut();
  };
  return (
    <div>
      <header className='bg-blue-500 flex flex-wrap justify-between px-4 pt-4 pb-10 '>
        <h1>Todo List</h1>
        {data?.user && <h1>{data.user.email}</h1>}
        <div className='flex items-center cursor-pointer'>
          <FiLogOut />
          <button onClick={logHandler} className='px-1'>
            Log out
          </button>
        </div>
      </header>
      <div className='flex flex-wrap'>
        <div className='w-2/12 bg-gray-700 -mt-8 pt-20 px-8 rounded-2xl rounded-l-none min-h-screen  text-black font-bold'>
          <h1 className='font-extrabold text-3xl -mt-6 pb-4 flex flex-wrap items-center'>
            WellCome <BsFillArrowThroughHeartFill />
          </h1>
          <ul className='text-white py-4'>
            <li className='py-2'>
              <Link href='/dashboard' className='flex flex-wrap items-center'>
                <VscListSelection /> Task
              </Link>
            </li>
            <li className='py-2 '>
              <Link href='/add-task' className='flex flex-wrap items-center'>
                <BiMessageSquareAdd /> Add-Task
              </Link>
            </li>
            <li className='py-2'>
              <Link href='/profile' className='flex flex-wrap items-center'>
                <RxDashboard /> Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className='w-8/12'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
