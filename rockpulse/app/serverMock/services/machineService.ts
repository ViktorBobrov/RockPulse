import { Card } from "../../types/card";
export const getMachines = async () => {
  try {
    const response = await fetch("/api/machines");

    if (!response.ok) {
      throw new Error("не удалось загрузить список машин");
    }
    const data = await response.json();
    return data;
  } catch {
    throw new Error("не удалось загрузить список машин");
  }
};
//добавляю машину в массив на бекэнде
export const createMachine = async (machine: Card) => {
  try {
    const response = await fetch("/api/machines", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(machine),
    });

    if (!response.ok) {
      throw new Error("не удалось создать машину");
    }
    const data = await response.json();
    return data as Card;
  } catch (error) {
    console.error("Error creating machine:", error);
    throw new Error("не удалось  создать машину");
  }
};
export const updateMachine = async (updatedMachine: Card) => {
  try {
    const response = await fetch("/api/machines", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(updatedMachine),
    });
    if (!response.ok) {
      throw new Error("не удалось обновить машину");
    }
    const data = await response.json();
    return data as Card;
  } catch (error) {
    console.error("Error update machine:", error);
    throw new Error("не удалось обновить машину");
  }
};
export const deleteMachine = async (id: number) => {
  try {
    const response = await fetch("/api/machines", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("не удалось удалить машину");
    }
  } catch {
    throw new Error("не удалось удалить машину");
  }
};
