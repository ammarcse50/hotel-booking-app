"use server";
import fs from "node:fs/promises";
import path from "path";

export async function readFile() {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    try {

        const files = await fs.readdir(uploadDir);

        return { files }

    } catch (error) {
        console.error("Error reading files:", error);
        return [];

    }



}