"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, FileText, BookOpen, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";
import Link from "next/link";

// Demo data for search — in production, this comes from Supabase
const DEMO_SUBJECTS = [
    {
        type: "subject" as const,
        id: "1",
        title: "Data Structures & Algorithms",
        subtitle: "CSE • Semester 3",
        href: "/dashboard/cse/3",
        department: "CSE",
    },
    {
        type: "subject" as const,
        id: "2",
        title: "Database Management Systems",
        subtitle: "CSE • Semester 4",
        href: "/dashboard/cse/4",
        department: "CSE",
    },
    {
        type: "subject" as const,
        id: "3",
        title: "Operating Systems",
        subtitle: "CSE • Semester 5",
        href: "/dashboard/cse/5",
        department: "CSE",
    },
    {
        type: "subject" as const,
        id: "4",
        title: "Computer Networks",
        subtitle: "CSE • Semester 6",
        href: "/dashboard/cse/6",
        department: "CSE",
    },
    {
        type: "subject" as const,
        id: "5",
        title: "Machine Learning",
        subtitle: "CSE • Semester 7",
        href: "/dashboard/cse/7",
        department: "CSE",
    },
    {
        type: "subject" as const,
        id: "6",
        title: "Circuit Theory",
        subtitle: "ECE • Semester 3",
        href: "/dashboard/ece/3",
        department: "ECE",
    },
    {
        type: "subject" as const,
        id: "7",
        title: "Signals & Systems",
        subtitle: "ECE • Semester 4",
        href: "/dashboard/ece/4",
        department: "ECE",
    },
    {
        type: "subject" as const,
        id: "8",
        title: "Engineering Mathematics I",
        subtitle: "CSE • Semester 1",
        href: "/dashboard/cse/1",
        department: "CSE",
    },
    {
        type: "resource" as const,
        id: "r1",
        title: "DSA Complete Notes - Unit 1 to 5",
        subtitle: "Notes • Data Structures & Algorithms",
        href: "/dashboard/cse/3",
        department: "CSE",
    },
    {
        type: "resource" as const,
        id: "r2",
        title: "DBMS PYQ 2024 Solved",
        subtitle: "PYQs • Database Management Systems",
        href: "/dashboard/cse/4",
        department: "CSE",
    },
    {
        type: "resource" as const,
        id: "r3",
        title: "OS Lab Manual - Process Scheduling",
        subtitle: "Lab Manual • Operating Systems",
        href: "/dashboard/cse/5",
        department: "CSE",
    },
];

const fuse = new Fuse(DEMO_SUBJECTS, {
    keys: ["title", "subtitle", "department"],
    threshold: 0.4,
    includeScore: true,
});

interface GlobalSearchProps {
    variant?: "hero" | "compact";
    className?: string;
}

export function GlobalSearch({
    variant = "compact",
    className,
}: GlobalSearchProps) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const results = query.length > 0 ? fuse.search(query).slice(0, 8) : [];

    // Keyboard shortcut: Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === "Escape") {
                setIsOpen(false);
                inputRef.current?.blur();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            }
        },
        [results.length]
    );

    const isHero = variant === "hero";

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            <div
                className={cn(
                    "relative flex items-center rounded-2xl border bg-card/80 backdrop-blur-sm transition-all duration-300",
                    isHero
                        ? "h-14 sm:h-16 shadow-xl shadow-primary/5 border-border/50"
                        : "h-10 border-border/30",
                    isOpen && "ring-2 ring-primary/20 border-primary/30"
                )}
            >
                <Search
                    className={cn(
                        "absolute text-muted-foreground",
                        isHero
                            ? "left-5 h-5 w-5 sm:h-6 sm:w-6"
                            : "left-3 h-4 w-4"
                    )}
                />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search subjects, notes, papers..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setSelectedIndex(0);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "w-full bg-transparent outline-none placeholder:text-muted-foreground/60",
                        isHero
                            ? "pl-13 sm:pl-14 pr-24 text-base sm:text-lg"
                            : "pl-9 pr-16 text-sm"
                    )}
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                        }}
                        className={cn(
                            "absolute text-muted-foreground hover:text-foreground transition-colors",
                            isHero ? "right-20" : "right-14"
                        )}
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
                <kbd
                    className={cn(
                        "absolute hidden sm:flex items-center gap-0.5 rounded-lg border bg-muted/50 text-muted-foreground font-mono",
                        isHero
                            ? "right-4 px-2.5 py-1.5 text-xs"
                            : "right-2 px-2 py-1 text-[10px]"
                    )}
                >
                    <span className="text-[10px]">⌘</span>K
                </kbd>
            </div>

            {/* Results dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/30 z-50 overflow-hidden">
                    <div className="p-2">
                        <div className="px-3 py-1.5">
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                                Results
                            </span>
                        </div>
                        {results.map((result, index) => (
                            <Link
                                key={result.item.id}
                                href={result.item.href}
                                onClick={() => {
                                    setIsOpen(false);
                                    setQuery("");
                                }}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150",
                                    index === selectedIndex
                                        ? "bg-primary/10 text-foreground"
                                        : "hover:bg-accent text-foreground"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-9 h-9 rounded-xl shrink-0",
                                        result.item.type === "subject"
                                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    )}
                                >
                                    {result.item.type === "subject" ? (
                                        <BookOpen className="h-4 w-4" />
                                    ) : (
                                        <FileText className="h-4 w-4" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {result.item.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {result.item.subtitle}
                                    </p>
                                </div>
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* No results */}
            {isOpen && query.length > 0 && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl z-50 p-8 text-center">
                    <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm font-medium text-muted-foreground">
                        No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                        Try searching for a subject, topic, or file name
                    </p>
                </div>
            )}
        </div>
    );
}
