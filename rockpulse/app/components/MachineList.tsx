"use client";
import { CardContext } from "@/contexts/CardContext";
import React, { useContext, useState } from "react";
import MaschineModal from "./MaschineModal";
import MachineCard from "./MachineCard";
import { MachineStatus } from "../types/status";

export type Card = {
  name: string;
  id: number;
  engine: number;
  hydraulic: number;
  load: number;
  status: string;
};
type MachineListProps = {
  cards: Card[];
  selectedCardId: number | null;
  onSelect: (card: Card) => void;
};

export default function MaschineList({
  cards,
  selectedCardId,
  onSelect,
}: MachineListProps) {
  const [form, setForm] = useState({
    name: "",
    hydraulic: 0,
    engine: 0,
    load: 0,
    status: MachineStatus.WORK,
  });
  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const { setCards } = useContext(CardContext);
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-lg">
      {cards.map((card) => (
        <MachineCard
          key={card.id}
          card={card}
          onSelect={onSelect}
          onEdit={(card) => {
            setEditingCard(card);
            setForm({
              name: card.name,
              hydraulic: card.hydraulic,
              engine: card.engine,
              load: card.load,
              status: MachineStatus.WORK,
            });
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      ))}
      <div className="mt-4">
        <button
          className="w-full rounded-xl border border-dashed border-slate-600 p-3 text-slate-400 hover:border-amber-500 hover:text-amber-400 transition"
          onClick={() => {
            setEditingCard(null);
            setForm({
              name: "",
              hydraulic: 0,
              engine: 0,
              load: 0,
              status: MachineStatus.WORK,
            });
            setIsModalOpen(true);
          }}
        >
          + Добавить машину
        </button>
      </div>
      {isModalOpen && (
        <MaschineModal
          form={form}
          setForm={setForm}
          setIsModalOpen={setIsModalOpen}
          editingCard={editingCard}
          setEditingCard={setEditingCard}
          setCards={setCards}
        />
      )}
    </div>
  );
}
