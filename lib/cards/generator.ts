import { cards } from "@/data/cards";
import { packs } from "@/data/packs";
import { Card, CardRarity } from "@/types/card";

export type PackCard = {
  instanceId: string;
  card: Card;
  quantity?: number;
};

const RARITY_WEIGHTS: Record<CardRarity, number> = {
  Common: 70,
  Uncommon: 20,
  Rare: 8,
  Epic: 1.8,
  Legendary: 0.2,
};

function rollRarity(): CardRarity {
  const entries = Object.entries(RARITY_WEIGHTS) as [CardRarity, number][];

  const total = entries.reduce((sum, [, w]) => sum + w, 0);

  let roll = Math.random() * total;

  for (const [rarity, weight] of entries) {
    if (roll < weight) return rarity;
    roll -= weight;
  }

  return "Common";
}

function getRandomCardByRarity(rarity: CardRarity): Card {
  const pool = cards.filter(c => c.rarity === rarity);
  const fallback = pool.length ? pool : cards;

  return fallback[Math.floor(Math.random() * fallback.length)];
}

export function generatePack(packId: string): PackCard[] {
  const packDef = packs.find(p => p.id === packId);

  if (!packDef) {
    throw new Error(`Pack not found: ${packId}`);
  }

  const pack: PackCard[] = [];

  for (let i = 0; i < packDef.size; i++) {
    const rarity = rollRarity();
    const card = getRandomCardByRarity(rarity);

    pack.push({
      instanceId: crypto.randomUUID(),
      card,
    });
  }

  return pack;
}
