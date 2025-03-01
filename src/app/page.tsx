import React from 'react';
import fs from 'node:fs/promises';

import prisma from '@/lib/db';
import HomeCompo from '@/components/HomeCompo';
import PaginationBar from '@/components/PaginationBar';
interface HomeProps {
  searchParams: { page?: string | number};
}
const Home = async ({
  searchParams: { page = "1" },
}: HomeProps) => {
  const files = await fs.readdir('./public/uploads');
  const images = files.map((file) => `/uploads/${file}`);
  // console.log(images[0].split('/').pop());
  // const page = 1;
  const currrentPage = parseInt(page);
  const itemsPerPage = 5;

  const heroItemCount = 0; //  for feature room we hold an array number of room
  //  step 1: get the total number of room
  const totalItemCount = await prisma.room?.count();
  //  step2: number of item per page
  const totalPages = Math.ceil(totalItemCount / itemsPerPage);
  // page count: totalItems / itemPerPage
  const rooms = await prisma.room.findMany({
    orderBy: { id: "desc" },
    skip:
      (currrentPage - 1) * itemsPerPage +
      (currrentPage === 1 ? 0 : heroItemCount),
    take: itemsPerPage + (currrentPage === 1 ? heroItemCount : 0),
  });

  return (
    <main>

      <HomeCompo rooms={rooms} images={images} />
      <div className='flex justify-center'>

        {totalPages > 1 && (
          <PaginationBar currrentPage={currrentPage}  totalPages={totalPages} />
        )}
      </div>
    </main>
  );
};

export default Home;
