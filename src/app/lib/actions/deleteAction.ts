

import fs from "node:fs/promises";
import path from "path";


export async function deleteFile(fileName: string) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    try {
        const filePath = path.join(uploadDir, fileName);

        await fs.unlink(filePath);
        return { message: "File deleted successfully" };

    } catch (error) {

        console.error("Error deleting file:", error);
        return { message: "Error deleting file" };
    }
}