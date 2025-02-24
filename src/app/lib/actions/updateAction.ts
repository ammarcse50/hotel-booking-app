"use server";
import fs from "node:fs/promises";
import path from "path";



export async function upldateFile(oldFileName: string, newFileName: string) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");


    try {
        const oldFilePath = path.join(uploadDir, oldFileName);

        const newFilePath = path.join(uploadDir, newFileName);

        await fs.rename(oldFilePath, newFilePath);
        return { message: "File renamed successfully", newFileName };

    } catch (error) {

        console.error("Error renaming file:", error);
        return { message: "Error renaming file" };
    }



}
