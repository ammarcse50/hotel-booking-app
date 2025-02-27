"use client";
import { Cross } from "lucide-react";
import React from "react";

const Crossbutton = ({ imgPath }) => {


  const handleDeleteImg = async (imgPath) => {
    console.log("image path", imgPath);
    try {
      const response = await fetch("/api/actions/deleteImg", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imgPath }),
      });

      if (response.ok) {
        console.log("Image deleted successfully");
          
        
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div>
      {" "}
      <button
        onClick={() => handleDeleteImg(imgPath)}
        className="absolute z-30 right-5 top-5 bg-red-500 text-white p-2 rounded-full"
      >
        <Cross scale={30} />
      </button>
    </div>
  );
};

export default Crossbutton;
