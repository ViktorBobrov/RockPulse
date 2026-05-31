import { User, UserRole } from "../types/userRole";

export const mockUsers: User[] = [
  {
    login: "admin",
    password: "admin",
    role: UserRole.ADMIN,
  },
  {
    login: "mechanic",
    password: "mechanic",
    role: UserRole.MECHANIC,
  },
];