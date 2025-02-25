import AdminHomeUi from '@/components/AdminHomeUi';
import React from 'react';
import fs from 'node:fs/promises';
import MyLazyComponent from '@/components/MyLazyComponent';
import UploadForm from '@/components/UploadForm';
import Crossbutton from '@/components/CrossButton';

const AdminPage = async () => {
  const files = await fs.readdir('./public/uploads');
  const images = files.map((file) => `/uploads/${file}`);
  // console.log(images[0].split('/').pop());
  return (
    <div>
      <AdminHomeUi />
      <UploadForm />
      <div className="grid grid-cols-4 min-w-5xl min-h-5xl gap-4">
        {images.map((image) => (
          <div key={image} className="relative px-2 h-auto ">
            <Crossbutton imgPath={image.split('/').pop()} />
            <MyLazyComponent
              src={image}
              alt={image}
              width={400}
              height={400}
              blurDataUrl={`/public/uploads/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
