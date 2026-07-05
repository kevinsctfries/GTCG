import { NextResponse } from "next/server";
import { generatePack } from "@/lib/cards/generator";

export async function POST() {
  const pack = generatePack(5);

  return NextResponse.json({
    success: true,
    pack,
  });
}
