"use client"
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { isValidGUID } from "@/lib/utils";


const Page = () => {
    const searchParams = useSearchParams()
    const pathName = usePathname();
    const [guid, setGuid] = useState<string>("");

    useEffect(() => {

        const pathNames = pathName.split("/");

        // Filter out all is non valid Guid, whats left is users Guid.
        const validGUIDs = pathNames.filter(isValidGUID);
        
        setGuid(validGUIDs[0]);

        
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
