import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    title,
    description,
    meeting_date,
    startTime,
    endTime,
    roomId,
    guests = [],
  } = await request.json();
  console.log(
    "test data from client",
    title,
    description,
    meeting_date,
    startTime,
    endTime,
    roomId,
    guests
  );
  if (
    !title ||
    !meeting_date ||
    !startTime ||
    !endTime ||
    !roomId ||
    !description ||
    !guests
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Create the meeting
      const meeting = await prisma.meetings.create({
        data: {
          title,
          description,
          meeting_date: meeting_date,
          startTime: startTime,
          endTime: endTime,
          roomId,
        },
      });

      console.log("Meeting created:", meeting);

      if (guests.length > 0) {
        const guest_data = guests.map(
          (guest: { email: string; name: string; phone: string }) => ({
            email: guest.email,
            name: guest.name,
            phone: guest.phone,
            meeting_id: meeting.id,
          })
        );
        await Promise.all(guest_data);
        await prisma.guests.createMany({
          data: guest_data,
        });
      }

      return meeting;
    });
    console.log(result);
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to create meeting", error },
      { status: 500 }
    );
  }
}
