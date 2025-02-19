import getRedisClient from '@/app/lib/redis'
import { createEvent } from '@/app/services/event'
import { getAvailableRoom } from '@/app/services/room'
import { type NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const capacity = searchParams.get("capacity") || undefined
    const date = searchParams.get("date") || undefined
    const timeFrom = searchParams.get("timeFrom") || undefined
    const timeTo = searchParams.get("timeTo") || undefined
    console.log("capacity", capacity, "date", date, "timeFrom", timeFrom, "timeTo", timeTo);
    const rooms = await getAvailableRoom(date, timeFrom, timeTo, capacity);
    console.log("rooms", rooms);
    return NextResponse.json(
        { rooms },
        { status: 200 }
    )
}

export async function POST(request: NextRequest) {

    const { roomId, title, description, date, timeFrom, timeTo, guests } = await request.json();
    console.log("roomId", roomId, "title", title, "description", description, "date", date, "timeFrom", timeFrom, "timeTo", timeTo, "guests", guests);
    const event = await createEvent(
        roomId,
        title,
        description,
        date,
        timeFrom,
        timeTo,
        guests
    )
    const redisClient = await getRedisClient();

    const redisCreateEvent = await redisClient.hSet("event", event);
    console.log("redisCreateEvent", redisCreateEvent);

    const redisGetEvent = await redisClient.hGetAll("event");
    console.log("redisGetEvent", redisGetEvent);
    console.log(event.message);
    return NextResponse.json(
        { event },
        { status: 200 }
    )
}