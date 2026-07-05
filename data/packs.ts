import { CardRarity } from "@/types/card";

export type PackDefinition = {
  id: string;
  name: string;
  size: number;

  // optional future hooks (safe to ignore for now)
  guaranteedMinimum?: CardRarity;
  description?: string;
};

export const packs: PackDefinition[] = [
  {
    id: "starter",
    name: "Starter Pack",
    size: 10,
    description: "Basic entry pack.",
  },
];
