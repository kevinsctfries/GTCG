import { cards } from "@/data/cards";
import { Card, CardRarity } from "@/types/card";

const RARITY_WEIGHTS: Record<CardRarity, number> = {
  Common: 70,
  Uncommon: 20,
  Rare: 8,
  Epic: 1.8,
  Legendary: 0.2,
};

function rollRarity(): CardRarity {
  const entries = Object.entries(RARITY_WEIGHTS) as [CardRarity, number][];

  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);

  let roll = Math.random() * total;

  for (const [rarity, weight] of entries) {
    if (roll < weight) return rarity;
    roll -= weight;
  }

  return "Common";
}

function getRandomCardByRarity(rarity: CardRarity): Card {
  const pool = cards.filter(c => c.rarity === rarity);

  // fallback safety
  const fallbackPool = pool.length ? pool : cards;

  return fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
}

export function generatePack(size = 5): Card[] {
  const pack: Card[] = [];

  for (let i = 0; i < size; i++) {
    const rarity = rollRarity();
    const card = getRandomCardByRarity(rarity);
    pack.push(card);
  }

  return pack;
}
