"use client"

import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";



export default function ProtectedRoute({children,}:{children: React.ReactNode|React.ReactNode[]}) {
 const {role: userRole,isLoading} = useContext(AuthContext);

const router = useRouter();
useEffect(() => {
   if (isLoading) return;                        // ещё грузится — стоп
   if (userRole === null) router.push("/login");
}, [userRole,isLoading]);

if (isLoading) return null;      
if (!userRole) return null;      
return <>{children}</>;         
}