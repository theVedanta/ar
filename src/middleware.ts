import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/login(.*)",
    "/signup(.*)",
    "/api/webhooks(.*)",
]);

const isAuthRoute = createRouteMatcher(["/login(.*)", "/signup(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const currentPath = req.nextUrl.pathname;

    // If user is not authenticated and trying to access protected route
    if (!userId && !isPublicRoute(req)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is authenticated and on auth pages, redirect to choose-role
    if (userId && isAuthRoute(req)) {
        return NextResponse.redirect(new URL("/choose-role", req.url));
    }

    // If user is authenticated and on home page, redirect to choose-role
    if (userId && currentPath === "/") {
        return NextResponse.redirect(new URL("/choose-role", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
