"use client";
import React, { Suspense } from "react";
import Loading from "../dashboard/laoding";
import Link from "next/link";

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <nav>
                <p>Objects Page</p>
                <Link href={`/`}>Home</Link>
            </nav>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
    );
}
