'use client'

import Link from "next/link";
import React from 'react'

const ToDashBoard = () => {
    return (
            <Link
                //className={`link ${pathname === "/dashboard" ? "active" : ""}`}
                href="/dashboard"
            >
                Dashboard
            </Link>
    );
}

export default ToDashBoard
