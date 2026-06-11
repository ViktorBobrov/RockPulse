"use client";

import { UserRole } from "@/app/types/userRole";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export const AuthContext = createContext({} as {
  role: UserRole | null;
  setRole: Dispatch<SetStateAction<UserRole | null>>;
  isLoading: boolean;
});

export const AuthContextProvider =({children,}:{children: React.ReactNode|React.ReactNode[]}) => {
    const [role, setRole] = useState<UserRole | null>(null);
    const[isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const role = localStorage.getItem("role");
        setRole(role as UserRole);
        setIsLoading(false);
    }, []);
    return (
        <AuthContext.Provider value={{ role,setRole,isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};