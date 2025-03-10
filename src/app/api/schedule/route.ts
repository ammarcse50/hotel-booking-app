import { createEvent } from "@/app/services/event";
import { getAvailableRoom } from "@/app/services/room";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const capacity = searchParams.get("capacity") || undefined;
  const date = searchParams.get("date") || undefined;
  const timeFrom = searchParams.get("timeFrom") || undefined;
  const timeTo = searchParams.get("timeTo") || undefined;

  const rooms = await getAvailableRoom(date, timeFrom, timeTo, capacity);

  return NextResponse.json({ rooms }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { roomId, title, description, date, timeFrom, timeTo, guests } =
      await request.json();
    const event = await createEvent(
      roomId,
      title,
      description,
      date,
      timeFrom,
      timeTo,
      guests
    );

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "error", error });
  }
}
