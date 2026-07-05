"use client";

import { useState } from "react";
import { PackCard } from "@/lib/cards/generator";
import styles from "@/styles/components/card.module.scss";

type Props = {
  item: PackCard;
};

export default function Card({ item }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ""}`}
      onClick={() => setFlipped(prev => !prev)}>
      {/* face down */}
      <div className={styles.face + " " + styles.back}>
        <span>GTCG</span>
      </div>

      {/* face up */}
      <div className={styles.face + " " + styles.front}>
        <div className={styles.name}>{item.card.name}</div>

        <div className={styles.meta}>
          <span>{item.card.rarity}</span>
          <span>{item.card.category}</span>
        </div>

        <div className={styles.description}>{item.card.description}</div>
      </div>
    </div>
  );
}
