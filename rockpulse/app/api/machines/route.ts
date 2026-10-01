import { NextResponse } from "next/server";
import { mockMachines } from "@/app/serverMock/machines";
import { Card } from "@/app/types/card";

const machines: Card[] = [...mockMachines];

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
      console.log("machines.push(newMachine)");
      return NextResponse.json(newMachine, { status: 201 });
    } catch (error) {
      console.error("POST /api/machines:", error);
      return NextResponse.json(
        { error: "Неверные данные" },
        { status: 400 }
      );
    }
  }
  
  export async function PUT(request: Request) {
    try {
      const updatedMachine: Card = await request.json();
      const index = machines.findIndex((machine) => machine.id === updatedMachine.id);
      if (index === -1) {
        return NextResponse.json({ error: "Machine not found" }, { status: 404 });
      }
      machines[index] = updatedMachine;
      return NextResponse.json(updatedMachine);
    } catch (error) {
      console.error("PUT /api/machines:", error);
      return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
    }
  }
  export async function DELETE(request: Request) {
    try {
      const body = await request.json();
      const index = machines.findIndex((machine) => machine.id === body.id);
  
      if (index === -1) {
        return NextResponse.json({ error: "Machine not found" }, { status: 404 });
      }
  
      machines.splice(index, 1);
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("DELETE /api/machines:", error);
      return NextResponse.json({ error: "Неверные данные" }, { status: 400 });
    }
  }