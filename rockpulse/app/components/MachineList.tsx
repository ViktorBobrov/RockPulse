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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-slate-800 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-bold text-white">
              {editingCard ? "Редактировать машину" : "Добавить машину"}
            </h2>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">название машины</span>
              <input
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                placeholder="Название машины"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">
                {" "}
                температура двигателя
              </span>
              <input
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                type="number"
                value={form.engine}
                onChange={(e) =>
                  setForm({ ...form, engine: Number(e.target.value) })
                }
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400"> нагрузка </span>
              <input
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                type="number"
                value={form.load}
                onChange={(e) =>
                  setForm({ ...form, load: Number(e.target.value) })
                }
              />{" "}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-slate-400">
                {" "}
                уговень гидравлики{" "}
              </span>

              <input
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                type="number"
                value={form.hydraulic}
                onChange={(e) =>
                  setForm({ ...form, hydraulic: Number(e.target.value) })
                }
              />
            </label>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-400"
            >
              Закрыть
            </button>
            <button
              onClick={() => {
                if (editingCard) {
                  // РЕДАКТИРОВАНИЕ
                  setCards((prev) =>
                    prev.map((card) =>
                      card.id === editingCard.id
                        ? {
                            ...card,
                            ...form,
                            name: form.name || card.name,
                          }
                        : card,
                    ),
                  );
                } else {
                  // ДОБАВЛЕНИЕ
                  setCards((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      ...form,
                      name: form.name.trim() || "Без названия",
                      status: "new",
                    },
                  ]);
                }

                setForm({
                  name: "",
                  hydraulic: 0,
                  engine: 0,
                  load: 0,
                });

                setEditingCard(null);
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
