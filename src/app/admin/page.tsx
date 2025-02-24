import AdminHomeUi from "@/components/AdminHomeUi";
import React from "react";
import fs from "node:fs/promises";
import MyLazyComponent from "@/components/MyLazyComponent";
import UploadForm from "@/components/UploadForm";
import { Cross } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPage = async () => {
  const files = await fs.readdir("./public/uploads");

  const images = files.map((file) => `/uploads/${file}`);
  return (
    <div>
      <AdminHomeUi />
      <UploadForm />
      <div className="grid grid-cols-4 min-w-5xl min-h-5xl gap-4">
        {images.map((image) => (
          <div key={image} className="relative px-2 h-auto ">
            <Button
              // onClick={() => removeImage(image)} // Remove image when clicked
              className="absolute z-30 right-5 top-5 bg-red-500 text-white p-2 rounded-full"
            >
              <Cross scale={30} />
            </Button>
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
