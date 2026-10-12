"use client";

import { UserRole } from "@/app/types/userRole";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export const AuthContext = createContext(
  {} as {
    role: UserRole | null;
    setRole: Dispatch<SetStateAction<UserRole | null>>;
    isLoading: boolean;
  },
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const role = localStorage.getItem("role");
    // TODO: вернуться и убрать eslint-disable. Правило react-hooks/set-state-in-effect
    // справедливо: setState в эффекте даёт лишний рендер. Здесь он вынужденный, потому что
    // localStorage недоступен на сервере, а чтение в useState сломает SSR и гидратацию.
    // Правильное решение: useSyncExternalStore с отдельным значением для сервера
    // или хранение роли в cookie.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRole(role as UserRole);
    setIsLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={{ role, setRole, isLoading }}>{children}</AuthContext.Provider>
  );
};
