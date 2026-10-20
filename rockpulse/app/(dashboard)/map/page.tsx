"use client";

import ErrorScreen from "@/app/components/ErrorScreen";
import MashineMap from "@/app/components/MashineMap";
import { CardContext } from "@/contexts/CardContext";
import { useContext } from "react";
import Loader from "@/app/components/Loader";

export default function MapPage() {
  const context = useContext(CardContext);
  return context.loading ? (
    <Loader />
  ) : context.loadError !== null ? (
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
