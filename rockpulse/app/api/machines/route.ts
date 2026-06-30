import { NextResponse } from "next/server";
import { mockMachines } from "@/app/serverMock/machines";
import { Card } from "@/app/types/card";

let machines: Card[] = [...mockMachines];

export async function GET() {
  try {
    return NextResponse.json(machines);
  } catch (error) {
    console.error("Error fetching machines:", error);
    return NextResponse.json({ error: "Failed to fetch machines" }, { status: 500 });
  }
}
  export async function POST(request: Request) {
    try {
      const newMachine: Card = await request.json(); // может упасть!
      machines.push(newMachine);
      return NextResponse.json(newMachine, { status: 201 });
    } catch (error) {
      console.error("POST /api/machines:", error);
      return NextResponse.json(
        { error: "Неверные данные" },
        { status: 400 }
      );
    }
  }