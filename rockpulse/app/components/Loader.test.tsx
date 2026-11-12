import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

test("тест проверяющий лоадер", () => {
  render(<Loader />);
  expect(screen.getByRole("status")).toBeInTheDocument();
});
