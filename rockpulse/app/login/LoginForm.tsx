"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setUserInfo(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = (await res.json()) as {
        user?: { login: string; role: string };
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Ошибка входа");
        return;
      }

      setUserInfo(`Вошли как ${data.user?.login} (${data.user?.role})`);
      router.push("/");
    } catch {
      setError("Сервер недоступен");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function checkMe() {
    setError(null);
    setUserInfo(null);
    const res = await fetch("/api/auth/me", { credentials: "include" });
    const data = (await res.json()) as {
      user?: { login: string; role: string };
      error?: string;
    };
    if (!res.ok) {
      setError(data.error ?? "Не авторизован");
      return;
    }
    setUserInfo(`/me: ${data.user?.login} (${data.user?.role})`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-6">
        <h1 className="mb-6 text-2xl font-bold text-slate-100">Вход</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-400">Логин</span>
            <input
              className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-slate-400">Пароль</span>
            <input
              type="password"
              className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="text-sm text-red-400">{error}</p>}
          {userInfo && <p className="text-sm text-green-400">{userInfo}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-amber-500 py-2 font-medium text-slate-900 disabled:opacity-50"
          >
            {isSubmitting ? "Вход..." : "Войти"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => void checkMe()}
          className="mt-4 w-full rounded-lg border border-slate-600 py-2 text-sm text-slate-300 hover:border-amber-500"
        >
          Проверить GET /api/auth/me
        </button>

        <p className="mt-4 text-xs text-slate-500">
          Учётки из .env.local. Без входа главная недоступна (middleware).
        </p>
      </div>
    </div>
  );
}
