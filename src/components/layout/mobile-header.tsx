"use client";

import { GraduationCap, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, Upload, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Departments", icon: LayoutDashboard },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/profile", label: "Profile", icon: User },
];

export function MobileHeader() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between h-14 px-4 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight">CollegeHub</span>
            </div>
            <div className="flex items-center gap-1">
                <ThemeToggle />
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72 p-0">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border/50">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                                <GraduationCap className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-sm">CollegeHub</span>
                        </div>
                        <nav className="p-3 space-y-1">
                            {navItems.map((item) => {
                                const isActive =
                                    item.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                        )}
                                    >
                                        <item.icon className="h-[18px] w-[18px]" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
