"use client";

import ErrorScreen from "@/app/components/ErrorScreen";
import MashineMap from "@/app/components/MashineMap";
import { CardContext } from "@/contexts/CardContext";
import { useContext } from "react";

export default function MapPage() {
  const context = useContext(CardContext);
  return context.loadError !== null ? (
    <ErrorScreen error={context.loadError} />
  ) : (
    <MashineMap
      machines={context.cards}
      imageUrl="/map-image.jpg"
      selectedId={context.selectedId}
      setSelectedId={context.setSelectedId}
    />
  );
}
