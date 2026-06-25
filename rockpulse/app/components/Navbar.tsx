
import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav  className="flex gap-6 bg-slate-800 border-b border-slate-700 px-6 py-4">
        <Link href="/"  className="text-slate-300 font-semibold hover:text-amber-500 transition">
            <h3>Cards</h3>
        </Link>
        <Link href="/map" className="text-slate-300 font-semibold hover:text-amber-500 transition"><h3>Map</h3></Link>

        </nav>
        
    )
}