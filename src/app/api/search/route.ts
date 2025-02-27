import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query || query.trim() === "") {
    return NextResponse.json(
      { message: "Query parameter is required and must not be empty." },
      { status: 400 }
    );
  }

  const parsedQuery = Number(query);
  const isNumericQuery = !isNaN(parsedQuery);

  try {
    const results = await prisma.room.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            img: {
              contains: query,
            },
          },
          ...(isNumericQuery
            ? [
                {
                  capacity: {
                    equals: parsedQuery,
                  },
                },
              ]
            : []),
        ],
      },
      orderBy: {
        name: "asc",
      },
      take: 10,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching suggestions:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
