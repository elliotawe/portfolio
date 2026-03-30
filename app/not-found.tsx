"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-6 text-center">
            <h1 className="text-9xl font-bold tracking-tighter text-accent italic">404</h1>
            <h2 className="text-3xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground text-lg max-w-md">
                The logic path you're requesting doesn't exist in this model yet.
                Let's get you back to safety.
            </p>
            <Link href="/">
                <button className="h-12 px-8 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}
