import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {

  const cookieStore =await cookies();
  console.log("cookieStore",cookieStore);
  (await cookieStore).delete('authjs.session-token');

  return NextResponse.json({ message: 'Logged out successfully' });
}