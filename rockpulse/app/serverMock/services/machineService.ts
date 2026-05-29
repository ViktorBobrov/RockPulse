import { mockMachines } from "../machines";
import { Card } from "../../types/card";

/// Эмуляция эндпоинтов сервера для работы с машинами.
let machines: Card[] = [...mockMachines];

export const getMachines = async () => {
  return machines;
};

//добавляю машину в массив на бекэнде
export const createMachine = async (machine: Card) => {
  machines.push(machine);

  return machine;
};

export const updateMachine = async (updatedMachine: Card) => {
  machines = machines.map((machine) =>
    machine.id === updatedMachine.id ? updatedMachine : machine,
  );

  return updatedMachine;
};
export const deleteMachine = async (id: number) => {
  machines = machines.filter((machine) => machine.id !== id);
};