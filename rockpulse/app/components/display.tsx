"use client";
import { CardContext } from "@/contexts/CardContext";
import React, { useContext, useState } from "react";

/*0) первая страницаа монитора механия,по идее тут мне нужна первая вкладка сразу надо прокинуть роутинг
1) сделать поля "текущая/допустимая гидравлика" и отрисовывать восклицательный знак исходя из этого условия
2) качественная стилизация.
4) добавить кнопку" добавить машину",она будет открывать всплывающее окно с формой заполнения данных о машине. присохранении машины она будет записывать в контекст.
5)кнопка удалить машину. удалять из контекста
6) 
7) исправить название  компонента (непонятно  что внутри)
8) отдельный модуль для css
9) либо таилвинд везде, либо  модули
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
  status: string;
};

export default function Display() {
  const context = useContext(CardContext);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <React.Fragment>
      <h1 className="">{"монитор механика"}</h1>
      <div className="flex pl-[2vh]  gap-[4vh]">
        <div className=" flex flex-col gap-[20px] border  ">
          {context.cards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                setSelectedCard(card);
              }}
            >
              <h3>{card.name}</h3>

              <p>{card.engine}</p>
              <p>{card.hydraulic}</p>
              <p>{card.load}</p>
            </div>
          ))}
        </div>
        <div>
          {selectedCard != null && (
            <div className="rightPlace">{selectedCard.id} </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
