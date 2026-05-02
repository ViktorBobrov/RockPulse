"use client";
import React from "react";
import { Card } from "@/app/types/card";
import { MachineStatus } from "../types/status";
import { statusConfig } from "../types/statusConfig";

type FormType = {
  name: string;
  hydraulic: number;
  engine: number;
  load: number;
  status: MachineStatus;
};

type MachineModalProps = {
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingCard: Card | null;
  setEditingCard: React.Dispatch<React.SetStateAction<Card | null>>;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

export default function MaschineModal({
  form,
  setForm,
  setIsModalOpen,
  editingCard,
  setEditingCard,
  setCards,
}: MachineModalProps) {
  return (
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
          <span className="text-sm text-slate-400"> температура двигателя</span>
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
            onChange={(e) => setForm({ ...form, load: Number(e.target.value) })}
          />{" "}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-400"> уговень гидравлики </span>

          <input
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
            type="number"
            value={form.hydraulic}
            onChange={(e) =>
              setForm({ ...form, hydraulic: Number(e.target.value) })
            }
          />
        </label>
        <label className="flex flex-col gap-[1px]">
          <span className="text-sm text-slate-400">Статус</span>

          <select
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as MachineStatus,
              })
            }
          >
            {Object.values(MachineStatus).map((status) => (
              <option key={status} value={status}>
                {statusConfig[status].label}
              </option>
            ))}
          </select>
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
                  status: MachineStatus.WORK,
                },
              ]);
            }

            setForm({
              name: "",
              hydraulic: 0,
              engine: 0,
              load: 0,
              status: card.status,
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
  );
}
