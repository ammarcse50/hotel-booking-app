import AdminHomeUi from '@/components/AdminHomeUi';
import React from 'react';
import fs from 'node:fs/promises';

import RoomCard from '@/components/RoomCard';
import prisma from '@/lib/db';

const AdminPage = async () => {
  const files = await fs.readdir('./public/uploads');
  const images = files.map((file) => `/uploads/${file}`);
  // console.log(images[0].split('/').pop());
  console.log("images",images);
  const rooms = await prisma.room.findMany();

  return (
    <div>
      <AdminHomeUi />
      {/* <UploadForm /> */}

              <h2 className='text-center mt-20 font-bold text-3xl text-teal-500'>All Rooms </h2>
      <div className="grid grid-cols-4 min-w-5xl min-h-5xl gap-4 mt-10">
        {rooms.map((room) => {
                const imgPath = images.find((image) => image.split('/').pop() === room.img);
          return (
            <div key={room.id} className="relative px-2 h-auto">
              <RoomCard name={room.name} capacity={room.capacity} img={imgPath} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
