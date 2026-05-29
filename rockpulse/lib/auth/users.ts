/**
 * Проверка логина/пароля из .env.local.
 * Только сервер — React здесь не используется.
 */
import type { SessionUser, UserRole } from "@/app/types/auth";

type EnvUser = {
  id: string;
  login: string;
  password: string;
  role: UserRole;
};

function getEnvUsers(): EnvUser[] {
  const users: EnvUser[] = [];

  if (process.env.ADMIN_LOGIN && process.env.ADMIN_PASSWORD) {
    users.push({
      id: "admin",
      login: process.env.ADMIN_LOGIN,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
  }

  if (process.env.MECHANIC_LOGIN && process.env.MECHANIC_PASSWORD) {
    users.push({
      id: "mechanic",
      login: process.env.MECHANIC_LOGIN,
      password: process.env.MECHANIC_PASSWORD,
      role: "mechanic",
    });
  }

  return users;
}

export function authenticateUser(
  login: string,
  password: string,
): SessionUser | null {
  const user = getEnvUsers().find(
    (u) => u.login === login && u.password === password,
  );
  if (!user) return null;

  return { id: user.id, login: user.login, role: user.role };
}

export function getUserById(id: string): SessionUser | null {
  const user = getEnvUsers().find((u) => u.id === id);
  if (!user) return null;
  return { id: user.id, login: user.login, role: user.role };
}
