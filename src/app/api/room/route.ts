import { getAvailableRoom } from '@/app/services/room'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const capacity = searchParams.get("capacity") || undefined
    const date = searchParams.get("date") || undefined
    const timeFrom = searchParams.get("timeFrom") || undefined
    const timeTo = searchParams.get("timeTo") || undefined
    
    console.log("all parameters of avaiable room", capacity, date, timeFrom, timeTo);
    const rooms = await getAvailableRoom(date, timeFrom, timeTo, capacity);
  
    return NextResponse.json(
        { rooms },
        { status: 200 }
    )
}