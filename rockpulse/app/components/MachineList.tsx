"use client";
import { CardContext } from "@/contexts/CardContext";
import React, { useContext, useState } from "react";
import MaschineModal from "./MaschineModal";
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
  selectedCard: Card | null;
  onSelect: (card: Card) => void;
};

export default function MaschineList({
  cards,
  selectedCard,
  onSelect,
}: MachineListProps) {
  const [form, setForm] = useState({
    name: "",
    hydraulic: 0,
    engine: 0,
    load: 0,
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
        <div
          className="flex cursor-pointer items-start justify-between gap-2 rounded-xl border border-slate-600 bg-slate-900 p-4 transition hover:border-amber-500 hover:bg-slate-800"
          key={card.id}
          onClick={() => onSelect(card)}
        >
          <div className=" flex flex-col gap-2">
            <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
              {card.name}
            </h3>
            <p className="text-sm font-medium text-slate-400">{card.status}</p>
          </div>

          <div className="flex flex-col gap-[10px]">
            <button
              className=" top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300 hover:bg-amber-500 hover:text-slate-900 transition"
              onClick={(e) => {
                e.stopPropagation();
                setEditingCard(card);
                setForm({
                  name: card.name,
                  hydraulic: card.hydraulic,
                  engine: card.engine,
                  load: card.load,
                });
                setIsModalOpen(true);
              }}
            >
              ✏️
            </button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300 hover:bg-red-500 hover:text-white transition"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(card.id);
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <button
          className="w-full rounded-xl border border-dashed border-slate-600 p-3 text-slate-400 hover:border-amber-500 hover:text-amber-400 transition"
          onClick={() => {
            setEditingCard(null);
            setForm({ name: "", hydraulic: 0, engine: 0, load: 0 });
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
