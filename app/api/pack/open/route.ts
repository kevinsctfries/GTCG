import { NextResponse } from "next/server";
import { generatePack } from "@/lib/cards/generator";
import { addCardsToCollection } from "@/lib/cards/collection";

export async function POST() {
  const userId = "dev-user"; // replace later with auth

  const pack = generatePack("starter");

  await addCardsToCollection(
    userId,
    pack.map(p => p.card.id),
  );

  return NextResponse.json({
    success: true,
    pack,
  });
}
