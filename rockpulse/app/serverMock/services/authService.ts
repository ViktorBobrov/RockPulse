import { UserRole } from "@/app/types/userRole";
import { mockUsers } from "../users";



export default function  login(login: string, password: string): UserRole |null {
    const user = mockUsers.find((user) => user.login=== login && user.password===password);
    if (!user) {
        return null;
    }
    return user.role;
}