import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionIdFromRequest, clearSessionCookie } from "@/lib/auth/cookies";
import { deleteSession } from "@/lib/auth/sessionStore";

export async function POST(request: NextRequest) {
  const sessionId = getSessionIdFromRequest(request);

  if (sessionId) {
    deleteSession(sessionId);
  }

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
