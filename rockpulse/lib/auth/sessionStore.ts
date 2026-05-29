/**
 * Активные сессии в памяти сервера (пока dev-сервер запущен).
 * sessionId → пользователь
 */
import type { SessionUser } from "@/app/types/auth";
import { randomUUID } from "crypto";

const sessions = new Map<string, SessionUser>();

export function createSession(user: SessionUser): string {
  const sessionId = randomUUID();
  sessions.set(sessionId, user);
  return sessionId;
}

export function getSession(sessionId: string): SessionUser | null {
  return sessions.get(sessionId) ?? null;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}
