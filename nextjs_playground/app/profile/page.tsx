"use client";
import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from 'next/navigation';

const ProtectedPage = (Req: NextRequest) => {
    const searchParams = useSearchParams();
    const name = searchParams.get("username");
    const age = searchParams.get("id");
    // useEffect(() => {
    //     const token = Cookies.get("jwt-session");

    //     if (!token) {
    //         router.replace("/login"); // If no token is found, redirect to login page
    //         return;
    //     }

    //     // Validate the token by making an API call
    //     const validateToken = async () => {
    //         try {
    //             const decoded = jwt.verify(token, "q");
    //             if (!decoded) {
    //                 router.replace("/login"); // If no token is found, redirect to login page
    //                 return;
    //             }
    //         } catch (err) {
    //             router.push("/login");
    //         }
    //     };

    //     validateToken();
    // }, [router]);
    console.log("qsqwsqwswqsqs1232 ", name, age)
    

    return <div>Protected Content</div>;
}

export default ProtectedPage;