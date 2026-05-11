import { Card } from "../types/card";
import { MachineStatus } from "../types/status";
export const mockMachines: Card[] = [
 
 {
		name: "SBH-250 №4",
		id: 1,
		engine: 160,
		hydraulic: 120,
		load: 16,
		status: MachineStatus.WORK,
	 },
	 {
		name: "SBH-250  №7",
		id: 2,
		engine: 160,
		hydraulic: 120,
		load: 44,
		status: MachineStatus.WORK,
	 },
	 {
		name: "PV-125  №14",
		id: 3,
		engine: 160,
		hydraulic: 120,
		load: 700,
		status: MachineStatus.STOPPED,
	 },]