import { isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const adminStatus = await isAdmin();
    return NextResponse.json({ isAdmin: adminStatus });
  } catch {
    return NextResponse.json({ isAdmin: false }, { status: 200 });
  }
}
