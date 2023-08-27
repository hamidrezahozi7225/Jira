import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserTodo from '@/models/userTodo';
import ConnectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import React from 'react';
import Todo from '../module/Todo';

const DashboardPage = async () => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const user = await UserTodo.findOne({ email: session?.user.email });

  let task = {
    todo: [],
    inProgress: [],
    review: [],
    done: [],
  };
  user?.task.map((item) => task[item.status].push(item));

  return (
    <div className='flex flex-wrap m-10 '>
      <div className='w-3/12'>
        <Todo
          classname='todo'
          steps='todo'
          next='inProgress'
          data={task.todo}
          allData={user?.task}
        />
      </div>
      <div className='w-3/12 '>
        <Todo
          classname='inProgress'
          steps='inProgress'
          next='review'
          Previous='todo'
          previ
          data={task.inProgress}
          allData={user?.task}
        />
      </div>
      <div className='w-3/12 '>
        <Todo
          classname='review'
          next='done'
          steps='review'
          Previous='inProgress'
          data={task.review}
          allData={user?.task}
        />
      </div>
      <div className='w-3/12 '>
        <Todo
          classname='done'
          Previous='review'
          steps='done'
          data={task.done}
          allData={user?.task}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
