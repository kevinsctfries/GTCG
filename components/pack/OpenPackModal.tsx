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

  if (!open) return null;

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
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>Open Pack</h2>

        <button onClick={openPack} disabled={loading}>
          {loading ? "Opening..." : "Open Pack"}
        </button>

        <div className={styles.grid}>
          {pack.map(item => (
            <Card key={item.instanceId} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
