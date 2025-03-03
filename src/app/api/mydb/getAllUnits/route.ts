import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const replacer = (key: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

export async function GET(req: NextRequest) {
  try {
    const units = await prisma.units.findMany();
    const unitsString = JSON.stringify(units, replacer);
    return new Response(unitsString);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
