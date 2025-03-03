import AdminHomeUi from '@/components/AdminHomeUi';
import React from 'react';
import fs from 'node:fs/promises';
import prisma from '@/lib/db';
import { exo2 } from '@/components/Font_exo2';
import RoomCard from '@/components/RoomCard';

const AdminPage = async () => {
  const files = await fs.readdir('./public/uploads/company_logo');
  const images = files.map((file) => `/uploads/company_logo/${file}`);
  const hotels = await prisma.companies.findMany();

  return (
    <div>
      <AdminHomeUi />
      <h2 className={`text-center mt-20 font-bold text-3xl text-teal-500 ${exo2.className}`}>
        All Hotels
      </h2>
      <div className="grid grid-cols-4 min-w-5xl min-h-5xl gap-4 mt-10">
        {hotels.map((hotel) => {
          const imgPath = images.find((image) => image.split('/').pop() === hotel.company_logo) || null;
          return (
            <div key={hotel.id} className="relative px-2 h-auto">
              <RoomCard
                id={hotel.id}
                name={hotel.name}
                address={hotel.address}
                img={imgPath}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;