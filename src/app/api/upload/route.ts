import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs"; // needs filesystem access

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, GIF and AVIF images are supported." },
        { status: 400 }
      );
    }

    // Limit size: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File is too large (max 10 MB)." }, { status: 400 });
    }

    // Build a safe unique filename
    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Resolve upload dir relative to project root (works in dev & production)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, safeName), buffer);

    // Return the public URL
    return NextResponse.json({ url: `/uploads/${safeName}` });
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
