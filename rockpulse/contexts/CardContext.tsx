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
import { getMachines } from "@/app/serverMock/services/machineService";

export const CardContext = createContext(
  {} as {
    cards: Card[];
    setCards: Dispatch<SetStateAction<Card[]>>;
    selectedId: number | null;
    setSelectedId: Dispatch<SetStateAction<number | null>>;
  },
);

export const CardContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const[selectedId,setSelectedId]=useState<number|null>(null)
  useEffect(() => {
    const loadMachines = async () => {
      const data = await getMachines();

      setCards(data);
    };

    loadMachines();
  }, []);

  return (
    <CardContext.Provider value={{ cards: cards, setCards: setCards,selectedId:selectedId,setSelectedId:setSelectedId}}>
      {children}
    </CardContext.Provider>
  );
};
