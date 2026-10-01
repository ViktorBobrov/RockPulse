import { mockMachines } from "../machines";
import { Card } from "../../types/card";

/// Эмуляция эндпоинтов сервера для работы с машинами.
let machines: Card[] = [...mockMachines];

export const getMachines = async () => {
  try {
    const response = await fetch("/api/machines");

    if (!response.ok) {
      throw new Error("не удалось загрузить список машин");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("не удалось загрузить список машин");
  }
  
};

//добавляю машину в массив на бекэнде
export const createMachine = async (machine: Card) => {
  try {
    const response = await fetch("/api/machines", {
      method: "POST",
      body: JSON.stringify(machine),
    });

    if (!response.ok) {
      throw new Error("не удалось  создать машину");
    }
    const data = await response.json();
    return data as Card;
  } catch (error) {
    console.error("Error creating machine:", error);
    throw new Error("не удалось  создать машину");

  }
};

export const updateMachine = async (updatedMachine: Card) => {
  try{
const response= await fetch ("/api/machines", {
      method: "PUT",
      body: JSON.stringify(updatedMachine),
    })
    if (!response.ok) {
      throw new Error("не удалось обновить машину");
    }
    const data = await response.json();
return data as Card;
  }catch(error){
    console.error("Error ubdate machine:", error);
    throw new Error("не удалось обновить машину");
  };
};
export const deleteMachine = async (id: number) => {
 try{
  const response = await fetch (`/api/machines`, {
    method:"DELETE",
    body:JSON.stringify({id}),
  });
  if (!response.ok) {
    throw new Error("не удалось удалить машину");
  }
  
}   catch (error) {
  throw new Error("не удалось удалить машину");
}

}