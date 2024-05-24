"use client";
import Cookies from "js-cookie";
//import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function ProtectedPage() {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            router.replace("/login"); // If no token is found, redirect to login page
            return;
        }

        // Validate the token by making an API call
        const validateToken = async () => {
            // try {
            //     const res = await fetch("/api/protected", {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     });

            //     if (!res.ok) throw new Error("Token validation failed");
            // } catch (error) {
            //     console.error(error);
            //     router.replace("/"); // Redirect to login if token validation fails
            // }
            if (token !== "testToken0123456789") {
                console.error("ERROR");
                router.replace("/");
            }
        };

        validateToken();
    }, [router]);

    return <div>Protected Content</div>;
}

export default ProtectedPage;