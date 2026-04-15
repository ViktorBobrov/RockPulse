"use client";

import React, { useContext } from "react";
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
    </div>
  );
}
