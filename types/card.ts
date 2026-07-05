export type CardCategory =
  | "Language"
  | "Framework"
  | "Tool"
  | "Database"
  | "Cloud"
  | "Operating System";

export type CardRarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  rarity: CardRarity;
  description: string;
  //   artwork: string;
}
