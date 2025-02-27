'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";

const AdminHomeUi = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const capacity = form.capacity.value;
    if (!name || !capacity || !file) {
      console.log('All fields are required.');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('capacity', capacity);
    formData.append('file', file);


    console.log("Formdata", formData);

    try {
      const response = await fetch('/api/mydb/addroom', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Success:', data);

      if (response.ok) {
        form.reset();
        setFile(null);
      }
      if (!response.ok) {
        throw new Error('Failed to upload data');
      }


    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className=''>
        <Input type="text" name="name" placeholder="Room Name" className='m-3' />
        <Input type="number" name="capacity" placeholder="Capacity" className='m-3' />

        <label>
          <span>Upload an Image</span>
          <input type="file" name="file" onChange={handleFileChange} className="px-2" />
        </label>

        <button type="submit" className="px-4 py-2 bg-teal-500 rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default AdminHomeUi;
