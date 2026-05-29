/** Роли в системе */
export type UserRole = "admin" | "mechanic";

/** Пользователь в сессии (без пароля) */
export type SessionUser = {
  id: string;
  login: string;
  role: UserRole;
};
