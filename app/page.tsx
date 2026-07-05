"use client";

import { useState } from "react";
import { PackCard } from "@/lib/cards/generator";
import Card from "@/components/cards/Card";
import styles from "./page.module.scss";
import cardStyles from "@/styles/components/card.module.scss";

export default function PacksPage() {
  const [pack, setPack] = useState<PackCard[]>([]);
  const [loading, setLoading] = useState(false);

  async function openPack() {
    setLoading(true);

    const res = await fetch("/api/pack/open", {
      method: "POST",
    });

    const data = await res.json();

    setPack(data.pack);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Open Pack</h1>

      <button className={styles.button} onClick={openPack} disabled={loading}>
        {loading ? "Opening..." : "Open Pack"}
      </button>

      <div className={styles.grid}>
        {pack.map(item => (
          <Card key={item.instanceId} item={item} />
        ))}
      </div>
    </div>
  );
}
