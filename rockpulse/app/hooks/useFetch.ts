import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("ошибка ответа сервера");
        }
        const result = (await response.json()) as T;
        if (!ignore) {
          setData(result);
        }
      } catch {
        if (!ignore) {
          setError("данные не пришли");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, setData, error, loading };
}
