import SignUpPage from '@/components/template/signUpPage';
import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const SignUp = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');
  return (
    <div>
      <SignUpPage />
    </div>
  );
};

export default SignUp;
