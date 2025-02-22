"use client";

import { uploadFile } from "@/app/lib/uploadAction";


export default function UploadForm() {
  return (
    <form action={uploadFile} className="flex flex-col gap-4 my-10">
      <label>
        <span>Upload a Image</span>
        <input type="file" name="file" className="px-2" />
      </label>
      <button type="submit" className="py-2 px-4 max-w-1/4 bg-teal-500 rounded">Submit</button>
    </form>
  );
}
