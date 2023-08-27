import UserTodo from '@/models/userTodo';
import { verifyPassword } from '@/utils/helper';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
  const { firstName, lastName, password } = await req.json();

  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ message: 'Please logged IN!' });
  }

  const user = await UserTodo.findOne({ email: session.user.email });

  if (!user) return NextResponse.json({ message: "User doesn't exist!" });

  console.log(password);
  console.log(user.password);

  const verifyPass = await verifyPassword(user.password, password);
  console.log(verifyPass);
  if (!verifyPass)
    return NextResponse.json({ message: "Password doesn't Correct!" });

  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();

  return NextResponse.json({ message: 'update Done!', status: '201' });
}
