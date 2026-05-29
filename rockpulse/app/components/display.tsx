"use client";
import { CardContext } from "@/contexts/CardContext";
import { useAuth } from "@/contexts/AuthContext";
import React, { useContext, useState } from "react";
import MaschineList from "./MachineList";
import { statusConfig } from "../types/statusConfig";

export default function Display() {
  const context = useContext(CardContext);
  const { user, isAdmin, logout, isLoading: authLoading } = useAuth();

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const selectedCard = context.cards.find((card) => card.id === selectedCardId);
  const handleDelete = (id: number) => {
    context.setCards((prev) => prev.filter((card) => card.id !== id));

    if (selectedCardId === id) {
      setSelectedCardId(null);
    }
  };

  const title = isAdmin ? "Панель администратора" : "Монитор механика";
  const roleLabel = user?.role === "admin" ? "Администратор" : "Механик";

  return (
    <React.Fragment>
      <div className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl">
            {authLoading ? "монитор механика" : title}
          </h1>
          <div className="flex items-center gap-3">
            {user && !authLoading && (
              <span className="text-sm text-slate-400">
                {user.login} · {roleLabel}
              </span>
            )}
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:border-amber-500 hover:text-amber-400"
            >
              Выйти
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <MaschineList
            cards={context.cards}
            selectedCardId={selectedCardId}
            onSelect={(card) => setSelectedCardId(card.id)}
            onDelete={handleDelete}
            canManage={isAdmin}
          />

          <div>
            {selectedCard != null && (
              <div className="rounded-2xl border border-amber-500 bg-slate-800 p-5 shadow-lg sm:p-6">
                <h3 className="mb-4 text-2xl font-bold text-slate-100">
                  Машина:{selectedCard.name}
                </h3>
                <p className={statusConfig[selectedCard.status].color}>
                  статус: {statusConfig[selectedCard.status].label}
                </p>
                <p className="mb-2 text-sm text-slate-300 sm:text-base">
                  температура двигателя:{selectedCard.engine}{" "}
                </p>
                <p className="mb-2 text-sm text-slate-300 sm:text-base">
                  температура гидр.жидкости:{selectedCard.hydraulic}{" "}
                </p>
                <p className="text-sm text-slate-300 sm:text-base">
                  нагрузка:{selectedCard.load}{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
