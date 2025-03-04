import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { replacer } from "@/app/utils/replacer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

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

    const file = formData.get("file") as File;
    const company_images = formData.getAll("company_images") as File[];

      console.log("file:", file);
    console.log("company_images:", company_images);

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

    const companyLogoDir = "./public/uploads/company_logo";
    const companyImagesDir = "./public/uploads/company_images";

    await fs.mkdir(companyLogoDir, { recursive: true });
    await fs.mkdir(companyImagesDir, { recursive: true });

    const uniqueFileName = `${uuidv4()}-${(file as any).name}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`${companyLogoDir}/${uniqueFileName}`, buffer);

    const imageUrls: string[] = [];
    for (const image of company_images) {
      const uniqueImageName = `${uuidv4()}-${(image as any).name}`;
      const imageArrayBuffer = await image.arrayBuffer();
      const imageBuffer = new Uint8Array(imageArrayBuffer);
      await fs.writeFile(`${companyImagesDir}/${uniqueImageName}`, imageBuffer);
      imageUrls.push(uniqueImageName);
    }

    console.log(imageUrls);

    const newCompany = await prisma.$transaction(async (prisma) => {
      const company = await prisma.companies.create({
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
          company_logo: uniqueFileName,
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
          is_active: true,
        },
      });

      for (const imageUrl of imageUrls) {
        await prisma.company_images.create({
          data: {
            company_id: company.id,
            image_url: imageUrl,
            created_at: new Date(),
          },
        });
      }

      return company;
    });

    const companySerialize = JSON.stringify(newCompany, replacer);

    return NextResponse.json(companySerialize, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
