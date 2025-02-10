"use client";

import { Room } from "../services/room";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator";
import AddRoomForm from "@/components/AddRoomForm";
import { columns } from "@/components/columns";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  // const toast = useToast();
  const { toast } = useToast();
  const handleRoomDeleted = async (roomId: string) => {
    setRooms(rooms?.filter((room) => room.id !== roomId));
    const response = await fetch(`/api/admin/room/${roomId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const newRoom = await response.json();
      setRooms((prevRooms) => [...prevRooms, newRoom.room]);
      toast({
        duration: 2000,
        title: "Room added to the list",
      });
      return newRoom;
    } else {
      toast({
        duration: 2000,
        variant: "destructive",
        title: "Failed to add room",
      });
      return null;
    }
  };
  const fetchRooms = async () => {
    setIsDataLoading(true);
    const response = await fetch("/api/admin/room");
    const data = await response.json();
    setRooms(data.rooms);
    setIsDataLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  console.log("room is here with details", rooms);
  const handleRoomAdded = async (formData: FormData): Promise<Room | null> => {
    setIsAddingRoom(true);
    const roomData = {
      name: formData?.get("name"),
      capacity: formData?.get("capacity"),
    };
    // Make the API call to create a new room
    const response = await fetch("/api/admin/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    });
    setIsAddingRoom(false);
    if (response.ok) {
      const newRoom = await response.json();
      setRooms((prevRooms) => [...prevRooms, newRoom.room]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      return newRoom;
    } else {
      console.error(response);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add room",
        showConfirmButton: false,
        timer: 1500,
      });

      return null;
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={rooms}
        onRoomDeleted={handleRoomDeleted}
        isDataLoading={isDataLoading}
      />
      <Separator className="my-4" />
      <AddRoomForm onRoomAdded={handleRoomAdded} isLoading={isAddingRoom} />
    </>
  );
};

export default AdminPage;
