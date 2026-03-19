"use client";
import { Card } from "@/app/components/display";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const CardContext = createContext(
  {} as {
    cards: Card[];
    setCards: Dispatch<SetStateAction<Card[]>>;
  },
);

export const CardContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [cards, setCards] = useState<Card[]>([
    {
      name: "SBH-250",
      id: 1,
      engine: 160,
      hydraulic: 120,
      load: 16,
      status: "inWork",
    },
    {
      name: "SBH-250",
      id: 2,
      engine: 160,
      hydraulic: 120,
      load: 44,
      status: "inWork",
    },
    {
      name: "SBH-250",
      id: 3,
      engine: 160,
      hydraulic: 120,
      load: 700,
      status: "inWork",
    },
  ]);

  return (
    <CardContext.Provider value={{ cards: cards, setCards: setCards }}>
      {children}
    </CardContext.Provider>
  );
};
