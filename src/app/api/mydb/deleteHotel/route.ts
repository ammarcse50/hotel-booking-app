import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import prisma from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    const { imgUrl, companyId } = await request.json();

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

    const allImagesHotel = await prisma.web_gallery_photos.findMany({
      where: {
        company_id: Number(companyId),
      },
      select: {
        image: true,
      },
    });

    for (const image of allImagesHotel) {
      const filePathImages = path.join(
        process.cwd(),
        "public",
        "uploads",
        "company_images",
        image.image
      );

      try {
        await fs.access(filePathImages);
        await fs.unlink(filePathImages);
      } catch (err) {
        console.log(`Error deleting image ${image.image}:`, err);
      }
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
      await fs.unlink(filePath);
    } catch (err) {
      return NextResponse.json(
        { error: "Logo image file not found" },
        { status: 404 }
      );
    }

    await prisma.companies.delete({
      where: {
        id: Number(companyId),
      },
    });
    await prisma.web_galleries.deleteMany({
      where: {
        id: Number(companyId),
      },
    });
    await prisma.web_gallery_photos.deleteMany({
      where: {
        company_id: Number(companyId),
      },
    });

    return NextResponse.json(
      { message: "Images and company data deleted successfully" },
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
