import React from 'react';
import fs from 'node:fs/promises';
import MyLazyComponent from '@/components/MyLazyComponent';
import { auth } from '../../auth';

const Home = async () => {
  const files = await fs.readdir('./public/uploads');
  const images = files.map((file) => `/uploads/${file}`);
  const user = await auth();
  return (
    <main>
      <div className="text-5xl text-center font-bold  my-10 uppercase">
        Explore Some Rooms
      </div>
      <div className="relative -z-1 grid grid-cols-4 min-w-5xl min-h-5xl gap-4">
        {images.map((image) => (
          <div key={image} className="px-2 h-auto ">
            <MyLazyComponent
              className="z-0"
              src={image}
              alt={image}
              width={400}
              height={400}
              blurDataUrl={`/public/uploads/${image}`}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
