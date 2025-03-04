import { replacer } from "@/app/utils/replacer";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query || query.trim() === "") {
    return NextResponse.json(
      { message: "Query parameter is required and must not be empty." },
      { status: 400 }
    );
  }
  console.log("query", query);
  try {
    const results = await prisma.companies.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            alias: {
              contains: query,
            },
          },

          {
            address: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
      take: 10,
    });

    const serializedResults = JSON.stringify(results, replacer);
    console.log("serializedResults", serializedResults);
    return new NextResponse(serializedResults, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
