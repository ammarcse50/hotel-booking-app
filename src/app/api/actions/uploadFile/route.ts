import fs from "node:fs/promises";

export async function POST(req: NextRequest) {
  const file = await req.json();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/uploads/${file.name}`, buffer);
}
