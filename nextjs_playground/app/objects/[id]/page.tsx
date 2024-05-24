import { notFound } from "next/navigation";
import React from "react";

interface Objects {
    id: string;
    name: string;
    data: Data | null;
}

interface Data {
    color: string;
    capacity: string;
}

async function getData(id: string) {
    const res = await fetch("https://api.restful-api.dev/objects/" + id);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (res.status === 404) {
        return notFound();
    }

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
    const data: Objects = await getData(params.id);

    return (
        <main>
            <div key={data.id}>
                <h1>{data.name}</h1>
                <p>
                    {data.data?.color} {data.data?.capacity}
                </p>
            </div>
        </main>
    );
}
