import { nanoid } from 'nanoid';
import { createCalendar } from "@/app/services/calendar";
import { NextRequest, NextResponse } from "next/server"
import { Room } from "./[id]/route";
import { getAllRooms, setRoom } from "@/app/services/room";
import { nan } from 'zod';

export const POST = async (request) => {
    const { name, capacity } = await request.json();
    if (!name || !capacity) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const calendarId = await nanoid();
     console.log("claendar id is here", calendarId);
    if (!calendarId) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const room: Room = {
      id: calendarId,
      name,
      capacity: parseInt(capacity, 10),
    };

    await setRoom(room);
    return NextResponse.json(
        { room },
        { status: 201 }
    );

}

export const GET = async (request) => {
    const rooms = await getAllRooms();
    return NextResponse.json(
        { rooms },
        { status: 200 }
    )
}