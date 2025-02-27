import prisma from "@/lib/db";
import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // console.log("iam from backend", formData);

    const name = formData.get("name");
    const capacity = formData.get("capacity");
    const file = formData.get("file") as File;

    const uniqueFileName = `${uuidv4()}-${file.name}`;
    console.log("name", name, "capacity", capacity, "file", file);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

     await fs.writeFile(`./public/uploads/${uniqueFileName}`, buffer);
 
    try {
      const data = await prisma.room.create({
        data: {
          name: name as string,
          capacity: Number(capacity),
          img: uniqueFileName,
        },
      });
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }

    return Response.json({ status: "success" });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "error" });
  }
}
