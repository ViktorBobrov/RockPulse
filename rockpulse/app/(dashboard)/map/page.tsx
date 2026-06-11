"use client";

import MashineMap from "@/app/components/MashineMap";
import { CardContext } from "@/contexts/CardContext";
import { useContext, } from "react";


export default function MapPage() {
    const context = useContext(CardContext)

    return (
         <MashineMap

    machines={context.cards}
    imageUrl="/map-image.jpg"
    selectedId={null}
  />
    )
}