import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import fs from 'node:fs/promises';
import path from 'path';

export async function DELETE(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    const { imgPath }: { imgPath: string } = await req.json();
    const filePath = path.join(uploadDir, imgPath);

    try {
      await fs.access(filePath);
    } catch (error) {
      return Response.json({ message: 'File not found' }, { status: 404 });
    }

    await fs.unlink(filePath);
  
    return Response.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return Response.json({ message: 'Error deleting file' }, { status: 500 });
  }
}
