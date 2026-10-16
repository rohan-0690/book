import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// Configure Cloudinary from env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    const allowed = [
      "image/jpeg", "image/jpg", "image/png",
      "image/webp", "image/gif", "image/avif",
    ];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, GIF and AVIF images are supported." },
        { status: 400 }
      );
    }

    // Limit: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File is too large (max 10 MB)." },
        { status: 400 }
      );
    }

    // Convert File → base64 data URI for Cloudinary upload
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary — stored in the "becoming" folder
    const result = await cloudinary.uploader.upload(dataUri, {
      folder:         "becoming",
      resource_type:  "image",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("[cloudinary upload]", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
