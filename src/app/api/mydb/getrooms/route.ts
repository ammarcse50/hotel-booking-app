import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const rooms = await prisma.room.findMany(); 

    return Response.json({ status: "success", data: rooms });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "error", message: "Failed to fetch rooms" });
  }
}
