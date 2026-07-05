"use client";

import { PackCard } from "@/lib/cards/generator";
import styles from "@/styles/components/card.module.scss";

type Props = {
  item: PackCard;
};

export default function Card({ item }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.name}>{item.card.name}</div>

      <div className={styles.meta}>
        <span>{item.card.rarity}</span>
        <span>{item.card.category}</span>
      </div>

      <div className={styles.description}>{item.card.description}</div>
    </div>
  );
}
