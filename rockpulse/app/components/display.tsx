"use client";
import { CardContext } from "@/contexts/CardContext";
import React, { useContext, useState } from "react";
import MaschineList from "./MachineList";
import { statusConfig } from "../types/statusConfig";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ErrorScreen from "./ErrorScreen";
import ErrorBanner from "./ErrorBanner";

export default function Display() {
  const context = useContext(CardContext);
  const router = useRouter();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { role } = useContext(AuthContext);
  const selectedCard = context.cards.find((card) => card.id === context.selectedId);
  const handleDelete = async (id: number) => {
    try {
      setDeleteError(null);
      await context.deleteCard(id);
      if (context.selectedId === id) {
        context.setSelectedId(null);
      }
    } catch {
      setDeleteError("Не удалось удалить машину");
    }
  };

  return (
    <React.Fragment>
      {context.loadError !== null ? (
        <ErrorScreen error={context.loadError} />
      ) : (
        <div className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl">
            монитор механика
          </h1>
          {deleteError !== null && (
            <div className="mb-6">
              <ErrorBanner message={deleteError} />
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] ">
            <MaschineList
              role={role}
              cards={context.cards}
              selectedCardId={context.selectedId}
              onSelect={(card) => context.setSelectedId(card.id)}
              onDelete={handleDelete}
            />

            <div>
              {selectedCard != null && (
                <div className="rounded-2xl border border-amber-500 bg-slate-800 p-5 shadow-lg sm:p-6">
                  <h3 className="mb-4 text-2xl font-bold text-slate-100">
                    Машина: {selectedCard.name}
                  </h3>
                  <p
                    className={`mb-2 text-sm sm:text-base ${statusConfig[selectedCard.status].color}`}
                  >
                    статус: {statusConfig[selectedCard.status].label}
                  </p>
                  <p className="mb-2 text-sm text-slate-300 sm:text-base">
                    температура двигателя: {selectedCard.engine}
                  </p>
                  <p className="mb-2 text-sm text-slate-300 sm:text-base">
                    температура гидр.жидкости: {selectedCard.hydraulic}
                  </p>
                  <p className="text-sm text-slate-300 sm:text-base">
                    нагрузка: {selectedCard.load}
                  </p>
                  <button
                    className="rounded-lg bg-amber-500 px-4 py-2 text-slate-900 hover:bg-amber-400 mt-4"
                    onClick={() => {
                      router.push("/map");
                    }}
                  >
                    Перейти на карту
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
