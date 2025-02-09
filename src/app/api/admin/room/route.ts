import { NextRequest, NextResponse } from "next/server";

import { nanoid } from "nanoid";
import { getAllRooms, setRoom } from "@/app/services/room";

export type Room = {
    id: string;
    name: string;
    capacity: number;
};

export const POST = async (request: NextRequest) => {
    const { name, capacity } = await request.json();
    if (!name || !capacity) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const calendarId = nanoid(); // just use a way to get a random Id for now
    if (!calendarId) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const room: Room = {
        id: calendarId,
        name,
        capacity: parseInt(capacity, 10),
    };

    await setRoom(room);
    return NextResponse.json({ room }, { status: 201 });
};

export const GET = async () => {
    const rooms = await getAllRooms();
    return NextResponse.json({ rooms }, { status: 200 });
};
