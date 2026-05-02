"use client";
import { CardContext } from "@/contexts/CardContext";
import React, { useContext, useState } from "react";
import MaschineList from "./MachineList";
import { statusConfig } from "../types/statusConfig";
import { MachineStatus } from "../types/status";

/*0) первая страницаа монитора механия,по идее тут мне нужна первая вкладка сразу надо прокинуть роутинг
1) сделать поля "текущая/допустимая гидравлика" и отрисовывать восклицательный знак исходя из этого условия
2) качественная стилизация.
4) добавить кнопку" добавить машину",она будет открывать всплывающее окно с формой заполнения данных о машине. присохранении машины она будет записывать в контекст.
5)кнопка удалить машину. удалять из контекста
6) 
7) исправить название  компонента (непонятно  что внутри)* исправил название*
8) отдельный модуль для css
9) либо таилвинд везде, либо  модули* везде таилвинд, отдан  ГПт*
10)прочитать что такое  FSD 
11)передавать по айди карточку,вместо setSelectedCard
12)c 37 строки менять на отдельный компонент
13) внести в карточку кнопку для онклика(чтобы валидно работало все)
*/

export type Card = {
  name: string;
  id: number;
  engine: number;
  hydraulic: number;
  load: number;
  status: MachineStatus;
};

export default function Display() {
  const context = useContext(CardContext);

  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const selectedCard = context.cards.find((card) => card.id === selectedCardId);

  return (
    <React.Fragment>
      <div className="w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-100 sm:text-3xl lg:text-4xl">
          {"монитор механика"}
        </h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] ">
          <MaschineList
            cards={context.cards}
            selectedCardId={selectedCardId}
            onSelect={(card) => setSelectedCardId(card.id)}
          />

          <div>
            {selectedCard != null && (
              <div className="rounded-2xl border border-amber-500 bg-slate-800 p-5 shadow-lg sm:p-6">
                <h3 className="mb-4 text-2xl font-bold text-slate-100">
                  {" "}
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
                {}{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
