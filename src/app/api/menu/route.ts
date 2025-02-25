import prisma from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const menus = await prisma.menus.findMany();

  return Response.json({ menus }, { status: 200 });
}
