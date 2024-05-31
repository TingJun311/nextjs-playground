import { NextRequest, NextResponse } from "next/server";
import RateLimiter from "./lib/class/rateLimiter/rateLimiter";
import { jwtVerify } from "jose";
import { users_by_pk } from "./types";
import { isValidGUID } from "./lib/utils";

const {
    JWT_SECRET_KEY: APP_JWT_SECRET_KEY,
} = process.env;

const rateLimiter = new RateLimiter(60 * 1000, 10); // 1 minute window, max 100 requests

export async function middleware(req: NextRequest) {
    console.log(`${req.method} ${req.url}`);

    const clientId = req.ip || req.headers.get("x-forwarded-for") || "unknown";

    if (req.nextUrl.pathname.startsWith("/api")) {
        // This logic is only applied to /about
        // You could alternatively limit based on user ID or similar

        return rateLimiter.checkRequest(clientId)
            ? headerMiddleware(req)
            : NextResponse.redirect(new URL("/blocked", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/profile")) {
        // This logic is only applied to /profile
        return rateLimiter.checkRequest(clientId)
            ? appMiddleware(req)
            : NextResponse.redirect(new URL("/blocked", req.url));
    }
}

const headerMiddleware = (req: NextRequest) => {
    const token = req.headers.get("authorization");

    if (!token || token !== "Bearer mysecrettoken") {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        });
    }

    const nextRes = NextResponse.next();

    // Add security headers
    nextRes.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
    );
    nextRes.headers.set("X-Content-Type-Options", "nosniff");
    nextRes.headers.set("X-Frame-Options", "DENY");
    nextRes.headers.set("X-XSS-Protection", "1; mode=block");
    nextRes.headers.set("Referrer-Policy", "no-referrer");
    nextRes.headers.set(
        "Strict-Transport-Security",
        "max-age=63072000; includeSubDomains; preload"
    );
    nextRes.headers.set(
        "Permissions-Policy",
        "geolocation=(), microphone=(), camera=()"
    );

    return nextRes;
};

export async function appMiddleware(req: NextRequest) {
    const value  = req.cookies.get("jwt-session")?.value;
    const guid = req.cookies.get("so_userId")?.value;
    const pathName = req.nextUrl.pathname;
    const pathNames = pathName.split('/');

    // Filter out all is non valid Guid, whats left is users Guid.
    const validGUIDs = pathNames.filter(isValidGUID)

    if (!value) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const { payload } = await jwtVerify(
            value!,
            new TextEncoder().encode(process.env.APP_JWT_SECRET_KEY),
            {
                algorithms: ["HS256"],
            }
        );

        if (!payload) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        const getUser = payload.users_by_pk as users_by_pk;
        if (guid !== getUser.guid) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (validGUIDs[0] !== getUser.guid) {
            return NextResponse.redirect(
                new URL("/profile/" + getUser.guid, req.url)
            );
        }
    } catch (err) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next()
}

export const config = {
    api: {
        bodyParser: false, // Disable body parsing for middleware
    },
    middleware: [
        // {
        //     matcher: "/profile/:path*",
        //     handler: appMiddleware,
        // },
        // {
        //     matcher: "/api/:path*",
        //     handler: middleware,
        // },
    ],
};
