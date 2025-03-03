import { NextResponse } from "next/server";
import { Room } from "./[id]/route";
import { getAllRooms, setRoom } from "@/app/services/room";
import { createCalendar } from "@/app/services/calendar";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
  const formData = await req.formData();

  // console.log("iam from backend", formData);

  const name = formData.get("name");
  const capacity = formData.get("capacity");
  const file = formData.get("file") as File;

  const uniqueFileName = `${uuidv4()}-${file.name}`;
  console.log("name", name, "capacity", capacity, "file", file);

  // const calendarId = await createCalendar(name);
  // console.log("claendar id is here", calendarId);
  // if (!calendarId) {
  //   return NextResponse.json(
  //     { error: "Missing required fields" },
  //     { status: 400 }
  //   );
  // }

  const room: Room = {
    id: String(Math.ceil(Math.random() * 300)),
    name,
    capacity: parseInt(capacity, 10),
    file: uniqueFileName,
  };
  await setRoom(room);
  return NextResponse.json({ room }, { status: 201 });
};
export const GET = async () => {
  const rooms = await getAllRooms();
  return NextResponse.json({ rooms }, { status: 200 });
};
