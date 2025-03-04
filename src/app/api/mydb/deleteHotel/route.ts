
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import prisma from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    const { imgUrl, companyId } = await request.json();
    console.log(imgUrl, companyId);
    if (!imgUrl || !companyId) {
      return NextResponse.json(
        { error: "these fields are required" },
        { status: 400 }
      );
    }

    const fileName = imgUrl.split("/").pop();

    if (!fileName) {
      return NextResponse.json({ error: "img url not valid" }, { status: 400 });
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "company_logo",
      fileName
    );

    try {
      await fs.access(filePath);
    } catch (err) {
      return NextResponse.json(
        { error: "Image file not found" },
        { status: 404 }
      );
    }

    await fs.unlink(filePath);

    await prisma.companies.delete({
      where: {
        id: Number(companyId), // Convert string back to BigInt
      },
    });

    return NextResponse.json(
      { message: "Image and company data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting image or company data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
