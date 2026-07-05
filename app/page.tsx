"use client";

import { useState } from "react";
import OpenPackModal from "@/components/pack/OpenPackModal";
import Collection from "@/components/collection/Collection";
import styles from "./page.module.scss";

export default function Home() {
  const [open, setOpen] = useState(false);

  const userId = "dev-user";

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>GTCG</h1>

        <button onClick={() => setOpen(true)}>Open Pack</button>
      </div>

      <OpenPackModal open={open} onClose={() => setOpen(false)} />

      <div className={styles.body}>
        <div className={styles.collectionWrapper}>
          <Collection userId={userId} />
        </div>
      </div>
    </div>
  );
}
