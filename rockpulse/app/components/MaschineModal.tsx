"use client";
import React, { useState } from "react";
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
  const [errors, setErrors] = useState<{
    name?: string;
    engine?: string;
    hydraulic?: string;
    load?: string;
  }>({});
  const handleChange = (field: keyof FormType, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name.trim()) {
      newErrors.name = "Введите название";
    }

    if (form.engine < 0) {
      newErrors.engine = "Не может быть меньше 0";
    }

    if (form.hydraulic < 0) {
      newErrors.hydraulic = "Не может быть меньше 0";
    }

    if (form.load < 0) {
      newErrors.load = "Не может быть меньше 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
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
            className={`w-full rounded-lg border px-3 py-2 text-white bg-slate-900 focus:outline-none ${
              errors.name ? "border-red-500" : "border-slate-600"
            }`}
            placeholder="Название машины"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {errors.name && (
            <span className="text-xs text-red-400">{errors.name}</span>
          )}
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-400">температура двигателя</span>

          <input
            className={`w-full rounded-lg border px-3 py-2 text-white bg-slate-900 focus:outline-none ${
              errors.engine ? "border-red-500" : "border-slate-600"
            }`}
            type="number"
            value={form.engine}
            onChange={(e) => handleChange("engine", Number(e.target.value))}
          />

          {errors.engine && (
            <span className="text-xs text-red-400">{errors.engine}</span>
          )}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-400">нагрузка</span>

          <input
            className={`w-full rounded-lg border px-3 py-2 text-white bg-slate-900 focus:outline-none ${
              errors.load ? "border-red-500" : "border-slate-600"
            }`}
            type="number"
            value={form.load}
            onChange={(e) => handleChange("load", Number(e.target.value))}
          />

          {errors.load && (
            <span className="text-xs text-red-400">{errors.load}</span>
          )}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-400">уровень гидравлики</span>

          <input
            className={`w-full rounded-lg border px-3 py-2 text-white bg-slate-900 focus:outline-none ${
              errors.hydraulic ? "border-red-500" : "border-slate-600"
            }`}
            type="number"
            value={form.hydraulic}
            onChange={(e) => handleChange("hydraulic", Number(e.target.value))}
          />

          {errors.hydraulic && (
            <span className="text-xs text-red-400">{errors.hydraulic}</span>
          )}
        </label>
        <label className="flex flex-col gap-[1px]">
          <span className="text-sm text-slate-400">Статус</span>

          <select
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value as MachineStatus)
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
            if (!validate()) return;
            if (editingCard) {
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
              status: MachineStatus.WORK,
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
