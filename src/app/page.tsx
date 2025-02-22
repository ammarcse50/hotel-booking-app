import React from "react";
import fs from "node:fs/promises";
import UploadForm from "../components/UploadForm";
import dynamic from "next/dynamic";
import MyLazyComponent from "@/components/MyLazyComponent";

const Home = async () => {
  const files = await fs.readdir("./public/uploads");

  const images = files
    .filter((file) => file.endsWith(".jpg"))
    .map((file) => `/uploads/${file}`);

  // const LazyComponentWithoutSSR = dynamic(
  //   () => import("../components/MyLazyComponent"),
  //   {
  //     ssr: false, // Disables server-side rendering for this component
  //     loading: () => <div>Loading...</div>,
  //   }
  // );

  return (
    <main>
      <UploadForm />
      <div className="grid grid-cols-4 min-w-5xl min-h-5xl gap-4">
        {images.map((image) => (
          <div key={image} className="px-2 h-auto ">
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
    </main>
  );
};

export default Home;
