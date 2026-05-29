"use client";
import React from "react";
import { Card } from "../types/card";
import { statusConfig } from "../types/statusConfig";
type MachineCardProps = {
  card: Card;
  onSelect: (card: Card) => void;
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
  isSelected: boolean;
  canManage: boolean;
};
export default function MachineCard({
  card,
  onSelect,
  onEdit,
  onDelete,
  isSelected,
  canManage,
}: MachineCardProps) {
  return (
    <div
      className={`flex cursor-pointer items-start justify-between gap-2 rounded-xl border bg-slate-900 p-4 transition hover:bg-slate-800 ${
        isSelected ? "border-amber-500" : "border-slate-600"
      }`}
      onClick={() => onSelect(card)}
    >
      <div className=" flex flex-col gap-2">
        <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
          {card.name}
        </h3>
        <p className={statusConfig[card.status].color}>
          {statusConfig[card.status].label}
        </p>
      </div>

      {canManage && (
        <div className="flex flex-col gap-[10px]">
          <button
            type="button"
            className="top-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300 transition hover:bg-amber-500 hover:text-slate-900"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(card);
            }}
          >
            ✏️
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700 text-slate-300 transition hover:bg-red-500 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
