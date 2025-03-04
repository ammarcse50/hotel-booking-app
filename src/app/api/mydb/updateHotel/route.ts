import fs from "node:fs/promises";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import { replacer } from "@/app/utils/replacer";

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const alias = formData.get("alias") as string;
    const unit_id = formData.get("unit_id") as string;
    const parent_id = formData.get("parent_id") as string;
    const language_id_default_choice = formData.get(
      "language_id_default_choice"
    ) as string;
    const time_zone_list_id = formData.get("time_zone_list_id") as string;
    const currency_list_id = formData.get("currency_list_id") as string;
    const details = formData.get("details") as string;
    const address = formData.get("address") as string;
    const is_super_system_company = formData.get(
      "is_super_system_company"
    ) as string;
    const application_domain = formData.get("application_domain") as string;
    const company_website_url = formData.get("company_website_url") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const is_default_portal_selection = formData.get(
      "is_default_portal_selection"
    ) as string;
    const is_email_notification = formData.get(
      "is_email_notification"
    ) as string;
    const is_sms_notification = formData.get("is_sms_notification") as string;
    const file = formData.get("file") as Blob; // Use Blob instead of File
    const company_images = formData.getAll("company_images") as Blob[]; // Use Blob instead of File

    if (
      !name ||
      !alias ||
      !email ||
      !file ||
      !currency_list_id ||
      !time_zone_list_id
    ) {
      return NextResponse.json(
        {
          error:
            "Name, alias, email, file, currency_list_id, and time_zone_list_id are required fields.",
        },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: "img url not valid" }, { status: 400 });
    }

    const dbFileName = await prisma.companies.findFirst({
      where: {
        id: BigInt(id),
      },
      select: {
        company_logo: true,
      },
    });

    if (!dbFileName) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const companyLogoDir = "./public/uploads/company_logo";
    const companyImagesDir = "./public/uploads/company_images";

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "company_logo",
      dbFileName.company_logo
    );
    console.log(dbFileName.company_logo);
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (err) {
      console.log("Previous image not found or could not be deleted:", err);
    }
    const fileName = dbFileName.company_logo;
    await fs.mkdir(companyLogoDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`${companyLogoDir}/${fileName}`, buffer);

    await fs.mkdir(companyImagesDir, { recursive: true });

    const updatedHotel = await prisma.companies.update({
      where: { id: Number(id) },
      data: {
        name,
        alias,
        unit_id: Number(unit_id),
        parent_id: Number(parent_id),
        language_id_default_choice: Number(language_id_default_choice),
        time_zone_list_id: Number(time_zone_list_id),
        currency_list_id: Number(currency_list_id),
        details,
        address,
        is_super_system_company: Number(is_super_system_company),
        application_domain,
        company_website_url,
        phone,
        email,
        is_default_portal_selection: Boolean(is_default_portal_selection),
        is_email_notification: Boolean(is_email_notification),
        is_sms_notification: Boolean(is_sms_notification),
        company_logo: fileName,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
        updated_by: 1,
        is_active: true,
      },
    });

    const serializeedHotel = JSON.stringify(updatedHotel, replacer);
    return NextResponse.json(serializeedHotel, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
