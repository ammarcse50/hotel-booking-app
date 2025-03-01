import prisma from "@/lib/db";

export async function PUT(req: Request) {
  const { id, content } = await req.json();
  console.log("id", id, content);
//   const convertTOHtml = textToHtml(content);
  try {
    const result = await prisma.zodit.update({
      where: {
        id: Number(id),
      },
      data: {
        html: content,
      },
    });
    return Response.json({ status: "success", result });
  } catch (error) {
    console.log(error);
  }
}
export async function POST(req: Request) {
  const { content } = await req.json();

  try {
    const result = await prisma.zodit.create({
      data: {
        html: content,
      },
    });
    return Response.json({ status: "success", result });
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(req: Request) {
  const { id } = await req.json();
  console.log("id from delete", id);
  try {
    const result = await prisma.zodit.delete({
      where: {
        id: Number(id),
      },
    });
    return Response.json({ status: "success", result });
  } catch (error) {
    console.log(error);
  }
}
