import { render, screen } from "@testing-library/react";
import ErrorScreen from "./ErrorScreen";
import userEvent from "@testing-library/user-event";
const mockBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}));
test("тест сбой сети", async () => {
  render(<ErrorScreen error="Сбой сети" />);
  expect(screen.getByText("Сбой сети")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Назад" })).toBeInTheDocument();
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Назад" }));
  expect(mockBack).toHaveBeenCalledTimes(1);
});
