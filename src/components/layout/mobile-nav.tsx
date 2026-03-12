"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Upload, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Browse", icon: LayoutDashboard },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/profile", label: "Profile", icon: User },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 safe-area-pb">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[64px]",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground active:scale-95"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-10 h-7 rounded-full transition-all duration-300",
                                    isActive && "bg-primary/10"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "h-[18px] w-[18px] transition-all",
                                        isActive && "scale-110"
                                    )}
                                />
                            </div>
                            <span
                                className={cn(
                                    "text-[10px] font-semibold tracking-wide",
                                    isActive && "text-primary"
                                )}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
