"use client";

import { useState, useMemo } from "react";
import Card from "@/components/cards/Card";
import { cards } from "@/data/cards";
import { useCollection } from "@/lib/queries/useCollection";
import styles from "@/styles/components/collection.module.scss";

type Props = {
  userId: string;
};

export default function Collection({ userId }: Props) {
  const { data, loading } = useCollection(userId);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState<string>("All");

  const enriched = data
    .map(entry => {
      const card = cards.find(c => c.id === entry.cardId);
      return card ? { ...entry, card } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const filteredCards = useMemo(() => {
    return enriched.filter(item => {
      const matchesSearch = item.card.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRarity =
        selectedRarity === "All" || item.card.rarity === selectedRarity;

      return matchesSearch && matchesRarity;
    });
  }, [enriched, searchTerm, selectedRarity]);

  if (loading)
    return <div className={styles.loading}>Loading your collection...</div>;

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.binderHeader}>
        <h1>Your Collection</h1>
        <div className={styles.pageInfo}>{filteredCards.length} cards</div>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={selectedRarity}
          onChange={e => setSelectedRarity(e.target.value)}
          className={styles.filterSelect}>
          <option value="All">All Rarities</option>
          <option value="Common">Common</option>
          <option value="Rare">Rare</option>
          <option value="Epic">Epic</option>
          <option value="Legendary">Legendary</option>
        </select>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.grid}>
          {filteredCards.length > 0 ? (
            filteredCards.map(item => (
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
            <div className={styles.empty}>
              {searchTerm || selectedRarity !== "All"
                ? "No cards match your filters."
                : "No cards in collection yet."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
