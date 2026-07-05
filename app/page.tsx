"use client";

import { useState } from "react";
import OpenPackModal from "@/components/pack/OpenPackModal";
import Collection from "@/components/collection/Collection";

export default function Home() {
  const [open, setOpen] = useState(false);

  const userId = "dev-user";

  return (
    <div>
      <h1>GTCG</h1>

      <button onClick={() => setOpen(true)}>Open Pack</button>

      <OpenPackModal open={open} onClose={() => setOpen(false)} />

      <div>
        <Collection userId={userId} />
      </div>
    </div>
  );
}
