import { cards } from "@/data/cards";
import { Card, CardRarity } from "@/types/card";

export type PackCard = {
  instanceId: string;
  card: Card;
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

export function generatePack(size = 5): PackCard[] {
  const pack: PackCard[] = [];

  for (let i = 0; i < size; i++) {
    const rarity = rollRarity();
    const card = getRandomCardByRarity(rarity);

    pack.push({
      instanceId: crypto.randomUUID(),
      card,
    });
  }

  return pack;
}
