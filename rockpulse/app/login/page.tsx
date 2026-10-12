"use client";
import React, { useContext, useState } from "react";
import loginUser from "@/app/serverMock/services/authService";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const role = loginUser(login, password);
    if (role === null) {
      setError(true);
    } else {
      context.setRole(role);
      localStorage.setItem("role", role);
      router.push("/");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-600 bg-slate-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-100">RockPulse</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500"
          />
          {error && (
            <span className="text-center text-sm text-red-400">Неверный логин или пароль</span>
          )}
          <button
            type="submit"
            className="mt-2 rounded-xl bg-amber-500 py-3 font-semibold text-slate-900 transition hover:bg-amber-400 active:bg-amber-600"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
