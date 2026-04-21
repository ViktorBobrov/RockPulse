"use client";
import React from "react";
import { Card } from "../types/card";
type MachineCardProps = {
  card: Card;
  onSelect: (card: Card) => void;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
};
export default function MachineCard({
  card,
  onSelect,
  onEdit,
  onDelete,
}: MachineCardProps) {
  return (
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
            onEdit(card);
          }}
        >
          ✏️
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300 hover:bg-red-500 hover:text-white transition"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
