import prisma from "@/lib/db";
import { NextResponse } from "next/server";
const replacer = (key: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    console.log("id", id);
    const hotel = await prisma.companies.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!hotel) {
      return NextResponse.json(
        { status: "error", message: "Hotel not found" },
        { status: 404 }
      );
    }
    const serializedResults = JSON.stringify(hotel, replacer);
    console.log("serializedResults", serializedResults);
    return new NextResponse(serializedResults, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch room" },
      { status: 500 }
    );
  }
}
