"use client";

import Card from "@/components/cards/Card";
import { cards } from "@/data/cards";
import { useCollection } from "@/lib/queries/useCollection";

type Props = {
  userId: string;
};

export default function Collection({ userId }: Props) {
  const { data, loading } = useCollection(userId);

  const enriched = data
    .map(entry => {
      const card = cards.find(c => c.id === entry.cardId);
      return card ? { ...entry, card } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {enriched.map(item => (
        <div key={item.id}>
          <Card
            item={{
              instanceId: item.id,
              card: item.card,
            }}
          />

          {item.quantity > 1 && <div>{item.quantity}x</div>}
        </div>
      ))}
    </div>
  );
}
