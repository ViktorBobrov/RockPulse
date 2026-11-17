import { render, screen } from "@testing-library/react";
import { CardContext, CardContextProvider } from "./CardContext";
import { useContext } from "react";
import { MachineStatus } from "../app/types/status";
import userEvent from "@testing-library/user-event";
import { createMachine } from "../app/serverMock/services/machineService";

jest.mock("../app/serverMock/services/machineService", () => ({
  createMachine: jest.fn(),
  updateMachine: jest.fn(),
  deleteMachine: jest.fn(),
}));

function ErrorProbe() {
  const { loadError } = useContext(CardContext);
  return <p>{loadError}</p>;
}
test("показывает ошибку загрузки", () => {
  render(
    <CardContextProvider>
      <ErrorProbe />
    </CardContextProvider>,
  );
  expect(screen.getByText("данные не пришли")).toBeInTheDocument();
});
function AddProbe() {
  const { cards, addCard } = useContext(CardContext);
  const onAdd = () => {
    void addCard({
      id: 1,
      name: "Экскаватор",
      engine: 0,
      hydraulic: 0,
      load: 0,
      status: MachineStatus.WORK,
      position: { x: 0, y: 0 },
    });
  };
  return (
    <div>
      <button onClick={onAdd}>Добавить</button>
      <p>{cards.map((card) => card.name).join(", ")}</p>
    </div>
  );
}
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
});
