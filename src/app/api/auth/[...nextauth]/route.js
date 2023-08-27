import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserTodo from '@/models/userTodo';
import ConnectDB from '@/utils/connectDB';
import { verifyPassword } from '@/utils/helper';

export const authOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await ConnectDB();
        } catch (error) {
          throw new Error('Error in connecting to DB!');
        }

        if (!email || !password) throw new Error('Invalid Data!');

        const existUser = await UserTodo.findOne({ email });

        console.log('exist', existUser);

        if (!existUser) throw new Error("User doesn't exist!");

        const verifyPass = await verifyPassword(existUser.password, password);

        if (!verifyPass) throw new Error('Username or password is incorrect!');

        return { email };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
