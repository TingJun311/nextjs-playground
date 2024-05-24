import React, { Suspense } from "react";
import Loading from "../dashboard/laoding";


export default function ProfileLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <nav>
                <p>Profile Layout</p>
            </nav>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
    );
}
