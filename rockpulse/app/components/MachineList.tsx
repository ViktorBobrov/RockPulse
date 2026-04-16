"use client";
import { CardContext } from "@/contexts/CardContext";
import React, { useContext, useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCards } = useContext(CardContext);
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-lg">
      {cards.map((card) => (
        <div
          className="flex cursor-pointer flex-col gap-2 rounded-xl border border-slate-600 bg-slate-900 p-4 transition hover:border-amber-500 hover:bg-slate-800"
          key={card.id}
          onClick={() => onSelect(card)}
        >
          <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
            {card.name}
          </h3>

          <p className="text-sm font-medium text-slate-400">{card.status}</p>
        </div>
      ))}
      <div className="mt-4">
        <button
          className="w-full rounded-xl border border-dashed border-slate-600 p-3 text-slate-400 hover:border-amber-500 hover:text-amber-400 transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Добавить машину
        </button>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-slate-800 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-bold text-white">
              Добавить машину
            </h2>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-400"
            >
              Закрыть
            </button>
            <button
              onClick={() => {
                setCards((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    name: "Новая машина",
                    engine: 0,
                    hydraulic: 0,
                    load: 0,
                    status: "new",
                  },
                ]);

                setIsModalOpen(false);
              }}
              className="mt-2 w-full rounded-lg bg-amber-500 px-4 py-2 text-slate-900 hover:bg-amber-400"
            >
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
