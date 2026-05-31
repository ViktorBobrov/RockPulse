export enum UserRole {
  ADMIN = "ADMIN",
  MECHANIC = "MECHANIC",
}
export type User = {
  login: string;
  password: string;
  role: UserRole;
  }