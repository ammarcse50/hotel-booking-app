import bcrypt from 'bcrypt';
import prisma from '@/lib/db';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password, username } = await req.json();

  const existingUser = await prisma.users.findFirst({
    where: { username },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: 'Username already exists' }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const res = await prisma.users.create({
    data: {
      email: email || null,
      password: hashedPassword,
      username,
      username_secondary: null,
      company_id: 1,
      phone: null,
      role_id: 1,
      language_id_default_choice: 0 || null,
      is_lock: false,
      is_default_user: false,
      created_at: new Date(),
      created_by: Date.now(),
      updated_at: null,
      updated_by: null,
      is_active: true,
      is_approved: false,
      is_temporary_password: false,
    },
  });

  return Response.json(JSON.stringify(res), { status: 201 });
}
