"use client";

import MashineMap from "@/app/components/MashineMap";
import { CardContext } from "@/contexts/CardContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function MapPage() {
  const context = useContext(CardContext);
  const router = useRouter();
  return context.loadError !== null ? (
    <div>
      <p>{context.loadError}</p>

      <button
        onClick={() => {
          router.back();
        }}
      >
        Назад
      </button>
    </div>
  ) : (
    <MashineMap
      machines={context.cards}
      imageUrl="/map-image.jpg"
      selectedId={context.selectedId}
      setSelectedId={context.setSelectedId}
    />
  );
}
