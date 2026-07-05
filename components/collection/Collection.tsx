"use client";

import Card from "@/components/cards/Card";
import { cards } from "@/data/cards";
import { useCollection } from "@/lib/queries/useCollection";
import styles from "@/styles/components/collection.module.scss";

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

  if (loading)
    return <div className={styles.loading}>Loading your collection...</div>;

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.binderHeader}>
        <h1>Your Collection</h1>
        <div className={styles.pageInfo}>{enriched.length} cards total</div>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.grid}>
          {enriched.length > 0 ? (
            enriched.map(item => (
              <div key={item.id} className={styles.cardSlot}>
                <Card
                  item={{
                    instanceId: item.id,
                    card: item.card,
                  }}
                />
                {item.quantity > 1 && (
                  <div className={styles.quantity}>x{item.quantity}</div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.empty}>No cards in collection yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
