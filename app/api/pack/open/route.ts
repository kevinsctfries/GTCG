import { NextResponse } from "next/server";
import { generatePack } from "@/lib/cards/generator";

export async function POST() {
  const pack = generatePack("starter");

  return NextResponse.json({
    success: true,
    pack,
  });
}
