import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { z } from 'zod';
import prisma from '@/app/lib/prisma';
import Credentials from 'next-auth/providers/credentials';

type CustomUser = {
  id: string;
  email: string | null;
  username: string;
  username_secondary: string | null;
  company_id: number | string;
  phone: string | null;
  is_active: boolean;
  is_approved: boolean;
  is_lock: boolean | null;
  is_default_user: boolean;
  is_temporary_password: boolean;
  created_at: Date;
  updated_at: Date | null;
  password: string;
};

async function getUser(email: string): Promise<CustomUser | null> {
  try {
    const user = await prisma.users.findFirst({
      where: { email },
    });
    if (user) {
      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        username_secondary: user.username_secondary,
        company_id: user.company_id.toString(),
        phone: user.phone,
        is_active: user.is_active,
        is_approved: user.is_approved,
        is_lock: user.is_lock,
        is_default_user: user.is_default_user,
        is_temporary_password: user.is_temporary_password,
        created_at: user.created_at,
        updated_at: user.updated_at,
        password: user.password,
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
