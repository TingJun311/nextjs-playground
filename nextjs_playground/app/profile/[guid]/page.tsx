"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";


const Page = () => {
    const searchParams = useSearchParams()
    const pathName = usePathname();
    const [guid, setGuid] = useState<string | string[] | undefined>("");

    useEffect(() => {
        setGuid("");
    }, [pathName, searchParams]);

    return (
        <div>
            {guid}
            {pathName}
            {searchParams}
        </div>
    );
};

export default Page;
