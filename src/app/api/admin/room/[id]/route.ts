import { deleteRoom, getRoom, setRoom } from '@/app/services/room';
import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from "next/server"
export type Room = {
    id: string;
    name: string;
    capacity: number;
};
export const GET = async (request: NextRequest, params: any) => {
    try {
        const roomId = params.params?.id as string
        const room = await getRoom(roomId);
        if (!room || Object.keys(room).length === 0) {
            return NextResponse.json(
                { message: `Room ${roomId} not found` },
                { status: HttpStatusCode.NotFound });
        }
        return NextResponse.json({ room });
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: HttpStatusCode.BadRequest }
        );
    }
}

export const PUT = async (request: NextRequest, params: any) => {
    try {
        const { name, capacity } = await request.json();
        const roomId = params.params?.id as string

        const thisRoom = await getRoom(roomId)
        if (!thisRoom || Object.keys(thisRoom).length === 0) {
            return NextResponse.json(
                { message: `Room ${roomId} not found` },
                { status: HttpStatusCode.NotFound });
        }

        const room: Room = {
            id: roomId,
            name: name ? name : thisRoom.name,
            capacity: capacity ? parseInt(capacity, 10) : thisRoom.capacity
        };
        await setRoom(room);
        return NextResponse.json({ room });
    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: HttpStatusCode.BadRequest }
        );
    }
}
export const DELETE = (async (request:NextRequest, params:any) => {
    try {
        const roomId =await params.params?.id as string
         console.log('params',params);
        if (!roomId) {
            return NextResponse.json(
                { message: "Missing Room Identifier" }, 
                { status: HttpStatusCode.NotFound }
            );  
        }

        const room = await getRoom(roomId);  
        if (!room || Object.keys(room).length === 0) {  

            return NextResponse.json(
                { message: `Room ${roomId} not found` }, 
                { status: HttpStatusCode.NotFound }
            );  
        }  

        await deleteRoom(roomId);  
        return NextResponse.json(
            { message: `Room ${roomId} has been deleted` },
        );
    } catch (error) {  
        console.error("cannot delete room:", error)
        return NextResponse.json(
            { message: error }, 
            { status: HttpStatusCode.BadRequest }
        );  
    }  
})