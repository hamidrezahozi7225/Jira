import UserTodo from '@/models/userTodo';
import ConnectDB from '@/utils/connectDB';
import { hashPass } from '@/utils/helper';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await ConnectDB();
    const { email, password } = await req.json();

    if (!(email || password)) {
      return NextResponse.json(
        { error: 'Ypur Data Is Not Correct' },
        { status: 422 }
      );
    }

    const userExist = await UserTodo.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: 'This account exists' },
        { status: 422 }
      );
    }

    const hashPassword = await hashPass(password);
    UserTodo.create({ email, password: hashPassword });

    return NextResponse.json({ message: 'User Created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server Done!' });
  }
}
