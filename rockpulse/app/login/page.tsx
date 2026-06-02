"use client";
import React, { useContext, useState } from "react";
import loginUser from "@/app/serverMock/services/authService";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const context = useContext(AuthContext);
    const router = useRouter();
    const[error, setError] = useState(false);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const role =  loginUser(login, password)
       if(role ===null){
        setError(true);
       }else{
        context.setRole(role);
        localStorage.setItem("role", role);
        router.push("/");
       }
    }
    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error&&<span>ошибка,неверный логин или пароль</span>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

