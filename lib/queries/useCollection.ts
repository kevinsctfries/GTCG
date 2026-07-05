"use client";

import { useEffect, useState } from "react";

export type CollectionEntry = {
  id: string;
  userId: string;
  cardId: number;
  quantity: number;
  isHolo: boolean;
};

export function useCollection(userId: string) {
  const [data, setData] = useState<CollectionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchCollection() {
      setLoading(true);

      const res = await fetch(`/api/collection?userId=${userId}`);
      const json = await res.json();

      setData(json.collection);
      setLoading(false);
    }

    fetchCollection();
  }, [userId]);

  return { data, loading };
}
