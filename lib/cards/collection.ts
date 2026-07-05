import { cards } from "@/data/cards";
import { prisma } from "@/lib/prisma";
import type { Card } from "@/types/card";

export type UserCardEntry = {
  id: string;
  userId: string;
  cardId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function addCardsToCollection(
  userId: string,
  cards: { cardId: number; isHolo: boolean }[],
) {
  const operations = cards.map(({ cardId, isHolo }) =>
    prisma.userCard.upsert({
      where: {
        userId_cardId_isHolo: {
          userId,
          cardId,
          isHolo,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        userId,
        cardId,
        isHolo,
        quantity: 1,
      },
    }),
  );

  return Promise.all(operations);
}

export async function getUserCollection(
  userId: string,
): Promise<UserCardEntry[]> {
  return prisma.userCard.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export type CollectionCardItem = UserCardEntry & {
  card: Card;
};

export async function getUserCollectionWithCards(
  userId: string,
): Promise<CollectionCardItem[]> {
  const owned = await getUserCollection(userId);

  return owned.flatMap(entry => {
    const card = cards.find(candidate => candidate.id === entry.cardId);

    return card ? [{ ...entry, card }] : [];
  });
}
