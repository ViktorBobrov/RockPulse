import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth/users";
import { createSession } from "@/lib/auth/sessionStore";
import { setSessionCookie } from "@/lib/auth/cookies";

export async function POST(request: Request) {
  const body = (await request.json()) as { login?: string; password?: string };
  const login = body.login?.trim() ?? "";
  const password = body.password ?? "";

  if (!login || !password) {
    return NextResponse.json({ error: "Введите логин и пароль" }, { status: 400 });
  }

  const user = authenticateUser(login, password);
  if (!user) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }

  const sessionId = createSession(user);
  const response = NextResponse.json({ user });
  setSessionCookie(response, sessionId);
  return response;
}
