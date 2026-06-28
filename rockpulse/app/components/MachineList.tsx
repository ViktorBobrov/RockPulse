"use client";
import { CardContext } from "@/contexts/CardContext";
import React, { useContext, useState } from "react";
import MaschineModal from "./MaschineModal";
import MachineCard from "./MachineCard";
import { MachineStatus } from "../types/status";
import { Card } from "../types/card";
import { UserRole } from "../types/userRole";

type MachineListProps = {
  cards: Card[];
  selectedCardId: number | null;
  onSelect: (card: Card) => void;
  onDelete: (id: number) => void;
  role: UserRole | null;
};
export default function MaschineList({
  cards,
  selectedCardId,
  onSelect,
  onDelete,
  role,
}: MachineListProps) {
  const [form, setForm] = useState({
    name: "",
    hydraulic: 0,
    engine: 0,
    load: 0,
    status: MachineStatus.WORK,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const { setCards } = useContext(CardContext);
  const onAddMashineClick:React.MouseEventHandler<HTMLButtonElement> =()=>{
      setEditingCard(null);
    setForm({
      name: "",
      hydraulic: 0,
      engine: 0,
      load: 0,
      status: MachineStatus.WORK,
    });
    setIsModalOpen(true);

  }
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-lg">
      {cards.map((card) => (
        <MachineCard
          role={role}
          key={card.id}
          card={card}
          isSelected={selectedCardId === card.id}
          onSelect={onSelect}
          onEdit={(card) => {
            setEditingCard(card);

            setForm({
              name: card.name,
              hydraulic: card.hydraulic,
              engine: card.engine,
              load: card.load,
              status: card.status,
            });

            setIsModalOpen(true);
          }}
          onDelete={onDelete}
        />
      ))}
      {role === UserRole.ADMIN&&(
      <div className="mt-4">
        <button
          className="w-full rounded-xl border border-dashed border-slate-600 p-3 text-slate-400 hover:border-amber-500 hover:text-amber-400 transition"
          onClick={onAddMashineClick
            
          }
        >
          + Добавить машину
        </button>
      </div>)}
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
