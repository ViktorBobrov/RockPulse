import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

const originalFetch = global.fetch;
afterEach(() => {
  global.fetch = originalFetch;
});

test("если сервер не ответил, показывает ошибку", () => {
  const { result } = renderHook(() => useFetch<string>("/api/machines"));
  expect(result.current.loading).toBe(false);
  expect(result.current.data).toBeNull();
  expect(result.current.error).toBe("данные не пришли");
});
test("кладёт ответ сервера в data", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => "готово",
  } as Response) as typeof fetch;

  const { result } = renderHook(() => useFetch<string>("/api/machines"));

  await waitFor(() => {
    expect(result.current.data).toBe("готово");
  });
  expect(result.current.error).toBeNull();
  expect(result.current.loading).toBe(false);
});
