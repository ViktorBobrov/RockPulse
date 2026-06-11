"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <><nav>
        <Link href="/">
            <h3>Cards</h3>
        </Link>
        <Link href="/map"><h3>Map</h3></Link>

        </nav>
        </>
    )
}