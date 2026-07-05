export type CardRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export type Card = {
  id: string;
  name: string;
  category: string;
  rarity: CardRarity;
  description: string;
};

export type PackCard = {
  instanceId: string;
  card: Card;
  quantity?: number;
  isHolo: boolean;
};
