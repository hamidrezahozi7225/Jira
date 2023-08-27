import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import DashboardPage from '@/components/template/dashboardPage';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  return (
    <div>
      <DashboardPage />
    </div>
  );
};

export default Dashboard;
