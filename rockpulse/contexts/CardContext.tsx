"use client";
import { Card } from "@/app/types/card";

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMachines } from "@/app/serverMock/services/machineService";
import { createMachine } from "@/app/serverMock/services/machineService";
import { updateMachine } from "@/app/serverMock/services/machineService";
import { deleteMachine } from "@/app/serverMock/services/machineService";
export const CardContext = createContext(
  {} as {
    cards: Card[];
    setCards: Dispatch<SetStateAction<Card[]>>;
    selectedId: number | null;
    setSelectedId: Dispatch<SetStateAction<number | null>>;
    addCard: (maсhine: Card) => Promise<void>;
    loadError: string | null;
    updateCard: (maсhine: Card) => Promise<void>;
    deleteCard: (id: number) => Promise<void>;
  },
);

export const CardContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  useEffect(() => {
    const loadMachines = async () => {
      try {
        const data = await getMachines();
        setCards(data);
      } catch (error) {
        setLoadError("не удалось загрузить список машин");
      }
    };

    loadMachines();
  }, []);
  const addCard = async (maсhine: Card) => {
    await createMachine(maсhine);
    setCards((prev) => [...prev, maсhine]);
  };
  const updateCard = async (machine: Card) => {
    await updateMachine(machine);
    setCards((prev) => prev.map((card) => (card.id === machine.id ? machine : card)));
  };
  const deleteCard = async (id: number) => {
    await deleteMachine(id);
    setCards((prev) => prev.filter((card) => card.id !== id));
  };
  return (
    <CardContext.Provider
      value={{
        cards: cards,
        setCards: setCards,
        selectedId: selectedId,
        setSelectedId: setSelectedId,
        addCard: addCard,
        loadError: loadError,
        updateCard: updateCard,
        deleteCard: deleteCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
