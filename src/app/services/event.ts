import { formatISO, parse, add } from "date-fns";
import { initGoogleCalendar } from "../lib/google";

export const listEvent = async (
  roomId: string,
  startDate?: string,
  duration = 7
) => {
  try {
    const googleClient = await initGoogleCalendar();
    const timeMin = startDate
      ? parse(startDate, "yyyy-MM-dd", new Date()).toISOString()
      : formatISO(new Date());

    const response = await googleClient?.events.list({
      calendarId: roomId,
      timeMin,
      timeMax: add(new Date(timeMin), { days: duration }).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return response?.data?.items || [];
  } catch (error) {
    console.error("Error listing events:", error);
    return [];
  }
};

export const createEvent = async (
  roomId: string,
  title: string,
  description: string,
  date: string,
  timeFrom: string,
  timeTo: string,
  guests: string[] = []
) => {
  try {
    const googleClient = await initGoogleCalendar();
    const startTime = parse(
      `${date} ${timeFrom}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    const endTime = parse(`${date} ${timeTo}`, "yyyy-MM-dd HH:mm", new Date());

    const event = {
      summary: title,
      description,
      start: {
        dateTime: formatISO(startTime),
        timeZone: "UTC",
      },
      end: {
        dateTime: formatISO(endTime),
        timeZone: "UTC",
      },
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: "email", minutes: 30 }],
      },
    };

    const meeting = await googleClient?.events.insert({
      calendarId: roomId,
      requestBody: event,
    });


    return meeting?.status === 200
      ? { message: "Meeting has been added to the calendar" }
      : { message: "Failed to insert event" };
  } catch (error) {
    console.error("Error creating event:", error);
    return { message: "Failed to insert event: Calendar not initialized" };
  }
};

export const deleteEvent = async (roomId: string, eventId: string) => {
  try {
    const googleClient = await initGoogleCalendar();
    await googleClient?.events.delete({
      calendarId: roomId,
      eventId,
    });

    return { message: "Event deleted successfully" };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { message: "Failed to delete event" };
  }
};
