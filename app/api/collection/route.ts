import { NextResponse } from "next/server";
import { getUserCollection } from "@/lib/cards/collection";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const collection = await getUserCollection(userId);

  return NextResponse.json({ collection });
}
