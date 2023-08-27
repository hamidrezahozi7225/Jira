import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginPage from '@/components/template/loginPage';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/dashboard');
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Login;
