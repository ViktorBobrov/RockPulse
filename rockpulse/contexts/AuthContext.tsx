"use client";

import { UserRole } from "@/app/types/userRole";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export const AuthContext = createContext({} as {
  role: UserRole | null;
  setRole: Dispatch<SetStateAction<UserRole | null>>;
});

export const AuthContextProvider =({children,}:{children: React.ReactNode|React.ReactNode[]}) => {
    const [role, setRole] = useState<UserRole | null>(null);
    useEffect(() => {
        const role = localStorage.getItem("role");
        setRole(role as UserRole);

    }, []);
    return (
        <AuthContext.Provider value={{ role,setRole}}>
            {children}
        </AuthContext.Provider>
    );
};