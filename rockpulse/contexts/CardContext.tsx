"use client";
import { Card } from "@/app/types/card";

import { createContext, Dispatch, SetStateAction, useState } from "react";

import { createMachine } from "@/app/serverMock/services/machineService";
import { updateMachine } from "@/app/serverMock/services/machineService";
import { deleteMachine } from "@/app/serverMock/services/machineService";
import { useFetch } from "@/app/hooks/useFetch";
export const CardContext = createContext(
  {} as {
    cards: Card[];
    loading: boolean;
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
  const { data, setData, error, loading } = useFetch<Card[]>("/api/machines");
  const cards = data ?? [];
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addCard = async (maсhine: Card) => {
    await createMachine(maсhine);
    setData((prev) => [...(prev ?? []), maсhine]);
  };
  const updateCard = async (machine: Card) => {
    await updateMachine(machine);
    setData((prev) => (prev ?? []).map((card) => (card.id === machine.id ? machine : card)));
  };
  const deleteCard = async (id: number) => {
    await deleteMachine(id);
    setData((prev) => (prev ?? []).filter((card) => card.id !== id));
  };
  return (
    <CardContext.Provider
      value={{
        cards: cards,
        selectedId: selectedId,
        setSelectedId: setSelectedId,
        addCard: addCard,
        loadError: error,
        updateCard: updateCard,
        deleteCard: deleteCard,
        loading: loading,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
