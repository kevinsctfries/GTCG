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
  const [selectedFoil, setSelectedFoil] = useState("All");

  // enrich DB entries with card metadata
  const enriched = data
    .map(entry => {
      const card = cards.find(c => c.id === entry.cardId);
      return card ? { ...entry, card } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  // apply search / filters
  const filteredCards = useMemo(() => {
    return enriched.filter(item => {
      const matchesSearch = item.card.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRarity =
        selectedRarity === "All" || item.card.rarity === selectedRarity;

      const matchesFoil =
        selectedFoil === "All" ||
        (selectedFoil === "Holo" && item.isHolo) ||
        (selectedFoil === "Normal" && !item.isHolo);

      return matchesSearch && matchesRarity && matchesFoil;
    });
  }, [enriched, searchTerm, selectedRarity, selectedFoil]);

  const sortedCards = useMemo(() => {
    return filteredCards.slice().sort((a, b) => {
      if (a.cardId < b.cardId) return -1;
      if (a.cardId > b.cardId) return 1;

      if (a.isHolo === b.isHolo) return 0;
      return a.isHolo ? 1 : -1;
    });
  }, [filteredCards]);

  if (loading)
    return <div className={styles.loading}>Loading your collection...</div>;

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.binderHeader}>
        <h1>Your Collection</h1>
        <div className={styles.pageInfo}>{sortedCards.length} cards</div>
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

        <select
          value={selectedFoil}
          onChange={e => setSelectedFoil(e.target.value)}
          className={styles.filterSelect}>
          <option value="All">All Cards</option>
          <option value="Normal">Normal</option>
          <option value="Holo">Holo</option>
        </select>
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.grid}>
          {sortedCards.length > 0 ? (
            sortedCards.map(item => (
              <div key={item.id} className={styles.cardSlot}>
                <Card
                  item={{
                    instanceId: item.id,
                    card: item.card,
                    isHolo: item.isHolo,
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
