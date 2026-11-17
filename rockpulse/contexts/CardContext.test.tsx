import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { Card } from "../app/types/card";
import { MachineStatus } from "../app/types/status";
import {
  createMachine,
  deleteMachine,
  updateMachine,
} from "../app/serverMock/services/machineService";
import { CardContext, CardContextProvider } from "./CardContext";

jest.mock("../app/serverMock/services/machineService", () => ({
  createMachine: jest.fn(),
  updateMachine: jest.fn(),
  deleteMachine: jest.fn(),
}));

const originalFetch = global.fetch;

const excavator: Card = {
  id: 1,
  name: "Экскаватор",
  engine: 0,
  hydraulic: 0,
  load: 0,
  status: MachineStatus.WORK,
  position: { x: 0, y: 0 },
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  global.fetch = originalFetch;
});

function mockLoadedMachines(cards: Card[]) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => cards,
  } as Response) as typeof fetch;
}

function ErrorProbe() {
  const { loadError } = useContext(CardContext);
  return <p>{loadError}</p>;
}

function AddProbe() {
  const { cards, addCard } = useContext(CardContext);
  const onAdd = () => {
    void addCard(excavator);
  };
  return (
    <div>
      <button onClick={onAdd}>Добавить</button>
      <p>{cards.map((card) => card.name).join(", ")}</p>
    </div>
  );
}

function UpdateProbe() {
  const { cards, updateCard } = useContext(CardContext);
  const onUpdate = () => {
    const current = cards[0];
    if (!current) {
      return;
    }
    void updateCard({ ...current, name: "Бульдозер" });
  };
  return (
    <div>
      <button onClick={onUpdate}>Изменить</button>
      <p>{cards.map((card) => card.name).join(", ")}</p>
    </div>
  );
}

function DeleteProbe() {
  const { cards, deleteCard } = useContext(CardContext);
  const onDelete = () => {
    const current = cards[0];
    if (!current) {
      return;
    }
    void deleteCard(current.id);
  };
  return (
    <div>
      <button onClick={onDelete}>Удалить</button>
      <p>{cards.map((card) => card.name).join(", ")}</p>
    </div>
  );
}

test("показывает ошибку загрузки", () => {
  render(
    <CardContextProvider>
      <ErrorProbe />
    </CardContextProvider>,
  );
  expect(screen.getByText("данные не пришли")).toBeInTheDocument();
});

test("добавляет карточку в список", async () => {
  const user = userEvent.setup();
  render(
    <CardContextProvider>
      <AddProbe />
    </CardContextProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Добавить" }));
  expect(await screen.findByText("Экскаватор")).toBeInTheDocument();
  expect(createMachine).toHaveBeenCalledTimes(1);
  expect(createMachine).toHaveBeenCalledWith(excavator);
});

test("заменяет карточку в списке", async () => {
  mockLoadedMachines([excavator]);
  const user = userEvent.setup();
  render(
    <CardContextProvider>
      <UpdateProbe />
    </CardContextProvider>,
  );
  expect(await screen.findByText("Экскаватор")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Изменить" }));
  expect(await screen.findByText("Бульдозер")).toBeInTheDocument();
  expect(updateMachine).toHaveBeenCalledTimes(1);
  expect(updateMachine).toHaveBeenCalledWith({ ...excavator, name: "Бульдозер" });
});

test("убирает карточку из списка", async () => {
  mockLoadedMachines([excavator]);
  const user = userEvent.setup();
  render(
    <CardContextProvider>
      <DeleteProbe />
    </CardContextProvider>,
  );
  expect(await screen.findByText("Экскаватор")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Удалить" }));
  await waitFor(() => {
    expect(screen.queryByText("Экскаватор")).not.toBeInTheDocument();
  });
  expect(deleteMachine).toHaveBeenCalledTimes(1);
  expect(deleteMachine).toHaveBeenCalledWith(excavator.id);
});
