import React from 'react';
import fs from 'node:fs/promises';

import prisma from '@/lib/db';
import RoomCard from '@/components/RoomCard';
import HomeCompo from '@/components/HomeCompo';

const Home = async () => {
  const files = await fs.readdir('./public/uploads');
  const images = files.map((file) => `/uploads/${file}`);
  // console.log(images[0].split('/').pop());
  console.log("images", images);
  const rooms = await prisma.room.findMany();


  return (
    <main>
      <div className="text-5xl text-center font-bold  my-10 uppercase flex justify-between">
        Explore Some Rooms
      </div>
      <HomeCompo rooms={rooms} images={images} />

      <div>
      </div>
    </main>
  );
};

export default Home;
