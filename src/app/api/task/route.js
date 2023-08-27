import { getServerSession } from 'next-auth';
import UserTodo from '@/models/userTodo';
import { NextResponse } from 'next/server';
import ConnectDB from '@/utils/connectDB';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    await ConnectDB();
    const { name, status } = await req.json();
    const session = await getServerSession({ req });

    const user = await UserTodo.findOne({ email: session?.user.email });

    if (!user) {
      return NextResponse.json({ message: "user dosen't exist" });
    }
    user.task.push({ name, status });
    await user.save();
    return NextResponse.json({ message: 'Task Created!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server Done!' });
  }
}
export async function GET(req) {
  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);
    const user = await UserTodo.findOne({ email: session?.user.email });

    let task = {
      todo: [],
      inProgress: [],
      review: [],
      done: [],
    };
    user.task.map((item) => task[item.status].push(item));

    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server Done!' });
  }
}

export async function PATCH(req) {
  try {
    await ConnectDB();
    const { task } = await req.json();
    const session = await getServerSession(authOptions);
    const user = await UserTodo.findOne({ email: session?.user.email });
    user.task = task;
    await user.save();
    return NextResponse.json({ message: 'successFul!' });
  } catch (error) {
    return NextResponse.json({ message: 'Server Done!' });
  }
}
