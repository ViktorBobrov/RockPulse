"use client"

import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";



export default function ProtectedRoute({children,}:{children: React.ReactNode|React.ReactNode[]}) {
 const {role: userRole} = useContext(AuthContext);
const router = useRouter();
useEffect(() => {

   if(userRole === null){
    router.push("/login");

 }; 
}, [userRole]);

if (!userRole) return null;
 return<>{children}</>;
}