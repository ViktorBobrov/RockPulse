import { MachineStatus } from "./status";

export const statusConfig: Record<
  MachineStatus,
  {
    label: string;
    color: string;
  }
> = {
  [MachineStatus.WORK]: {
    label: "В работе",
    color: "text-green-400",
  },
  [MachineStatus.STOPPED]: {
    label: "Остановлена",
    color: "text-gray-400",
  },
  [MachineStatus.ERROR]: {
    label: "Ошибка",
    color: "text-red-400",
  },
};