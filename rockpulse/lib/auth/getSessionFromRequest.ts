import type { NextRequest } from "next/server";
import type { SessionUser } from "@/app/types/auth";
import { getSessionIdFromRequest } from "./cookies";
import { getSession } from "./sessionStore";

export function getSessionUserFromRequest(
  request: NextRequest,
): SessionUser | null {
  const sessionId = getSessionIdFromRequest(request);
  if (!sessionId) return null;
  return getSession(sessionId);
}
