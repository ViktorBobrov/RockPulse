"use client";
import { Card } from "@/app/types/card";
import { MachineStatus } from "@/app/types/status";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getMachines } from "@/app/services/machineService";

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
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    const loadMachines = async () => {
      const data = await getMachines();

      setCards(data);
    };

    loadMachines();
  }, []);

  return (
    <CardContext.Provider value={{ cards: cards, setCards: setCards }}>
      {children}
    </CardContext.Provider>
  );
};
