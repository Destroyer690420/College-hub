"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    LayoutDashboard,
    Upload,
    User,
    GraduationCap,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Departments", icon: LayoutDashboard },
    { href: "/upload", label: "Upload", icon: Upload },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300 ease-in-out h-screen sticky top-0",
                collapsed ? "w-[72px]" : "w-[260px]"
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-border/50">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <GraduationCap className="h-5 w-5 text-white" />
                </div>
                {!collapsed && (
                    <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-tight">CollegeHub</span>
                        <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                            Resource Hub
                        </span>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
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
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                                    !isActive && "group-hover:scale-110"
                                )}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <Separator className="opacity-50" />

            {/* Footer */}
            <div className="px-3 py-3 space-y-1">
                <div
                    className={cn(
                        "flex items-center",
                        collapsed ? "justify-center" : "justify-between px-1"
                    )}
                >
                    {!collapsed && (
                        <span className="text-xs text-muted-foreground font-medium">
                            Preferences
                        </span>
                    )}
                    <ThemeToggle />
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full justify-center rounded-xl h-9"
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <>
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            <span className="text-xs">Collapse</span>
                        </>
                    )}
                </Button>
            </div>
        </aside>
    );
}
