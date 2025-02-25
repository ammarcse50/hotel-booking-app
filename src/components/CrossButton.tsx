import { deleteFile } from '@/app/lib/actions/deleteAction';
import { Cross } from 'lucide-react';
import React from 'react';

const Crossbutton = ({ imgPath }) => {
  // const removeImage = async (imgPath) => {
  //   // const fileName = img.split('/').pop();
  //   // console.log('img name', fileName);
  //   await deleteFile(imgPath);
  // };

  return (
    <div>
      {' '}
      <button
        // onClick={() => removeImage(imgPath)}
        className="absolute z-30 right-5 top-5 bg-red-500 text-white p-2 rounded-full"
      >
        <Cross scale={30} />
      </button>
    </div>
  );
};

export default Crossbutton;
