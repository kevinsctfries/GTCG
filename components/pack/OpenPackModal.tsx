"use client";

import { useState } from "react";
import { PackCard } from "@/lib/cards/generator";
import Card from "@/components/cards/Card";
import styles from "./OpenPackModal.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OpenPackModal({ open, onClose }: Props) {
  const [pack, setPack] = useState<PackCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [collected, setCollected] = useState<PackCard[]>([]);

  if (!open) return null;

  async function openPack() {
    setLoading(true);

    const res = await fetch("/api/pack/open", {
      method: "POST",
    });

    const data = await res.json();

    setPack(data.pack);
    setRevealed(0);
    setCollected([]);
    setLoading(false);
  }

  function handleReveal() {
    const current = pack[revealed];
    if (!current) return;

    setCollected(prev => [...prev, current]);
    setRevealed(prev => prev + 1);
  }

  const remainingCards = pack.slice(revealed);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>Open Pack</h2>

        <button onClick={openPack} disabled={loading}>
          {loading ? "Opening..." : "Open Pack"}
        </button>

        <div className={styles.stackArea}>
          {remainingCards.length > 0 && (
            <div className={styles.packInfo}>
              {remainingCards.length} card
              {remainingCards.length !== 1 ? "s" : ""} left
            </div>
          )}

          <div className={styles.cardStackContainer}>
            {remainingCards.map((item, index) => {
              const isTop = index === 0;

              return (
                <div
                  key={item.instanceId}
                  className={`${styles.cardStack} ${isTop ? styles.top : styles.behind}`}
                  style={{ "--offset": index } as React.CSSProperties}
                  onClick={() => {
                    if (isTop) handleReveal();
                  }}>
                  <Card item={item} />
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.grid}>
          {collected.map(item => (
            <Card key={item.instanceId} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
