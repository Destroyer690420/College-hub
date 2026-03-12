"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    NotebookPen,
    ClipboardList,
    FileText,
    FlaskConical,
    Grid3X3,
    List,
    SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceCard } from "@/components/resources/resource-card";
import type { ResourceCategory } from "@/lib/types";

// Demo resources
const DEMO_RESOURCES = {
    notes: [
        {
            id: "n1",
            title: "Complete Unit 1-5 Handwritten Notes",
            description:
                "Comprehensive handwritten notes covering all units with diagrams and examples. Perfect for exam preparation.",
            file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            file_name: "DSA_Complete_Notes.pdf",
            file_size: 4500000,
            file_type: "pdf",
            category: "notes" as ResourceCategory,
            contributor_name: "Rahul Sharma",
            avg_rating: 4.5,
            rating_count: 23,
            download_count: 156,
            created_at: "2025-12-15T10:30:00Z",
        },
        {
            id: "n2",
            title: "Trees & Graphs - Detailed Notes",
            description:
                "In-depth notes on tree data structures, graph traversals, MST algorithms, and shortest path algorithms.",
            file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            file_name: "Trees_Graphs_Notes.pdf",
            file_size: 2800000,
            file_type: "pdf",
            category: "notes" as ResourceCategory,
            contributor_name: "Priya Patel",
            avg_rating: 4.8,
            rating_count: 18,
            download_count: 102,
            created_at: "2025-11-20T14:15:00Z",
        },
        {
            id: "n3",
            title: "Sorting Algorithms Comparison Chart",
            description:
                "Quick reference chart comparing all sorting algorithms with time/space complexity.",
            file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            file_name: "Sorting_Comparison.pdf",
            file_size: 850000,
            file_type: "pdf",
            category: "notes" as ResourceCategory,
            contributor_name: "Amit Kumar",
            avg_rating: 4.2,
            rating_count: 31,
            download_count: 204,
            created_at: "2025-10-05T09:00:00Z",
        },
    ],
    pyqs: [
        {
            id: "p1",
            title: "End Semester Exam 2024 - Solved",
            description:
                "Fully solved end semester examination paper with step-by-step solutions.",
            file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            file_name: "DSA_PYQ_2024_Solved.pdf",
            file_size: 3200000,
            file_type: "pdf",
            category: "pyqs" as ResourceCategory,
            contributor_name: "Sneha Gupta",
            avg_rating: 4.9,
            rating_count: 45,
            download_count: 312,
            created_at: "2025-06-10T16:45:00Z",
        },
        {
            id: "p2",
            title: "Mid Semester Exam 2024 - With Solutions",
            description:
                "Mid-semester paper with detailed solutions. Covers Unit 1-3.",
            file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            file_name: "DSA_MidSem_2024.pdf",
            file_size: 1500000,
            file_type: "pdf",
            category: "pyqs" as ResourceCategory,
            contributor_name: "Vikram Singh",
            avg_rating: 4.3,
            rating_count: 27,
            download_count: 189,
            created_at: "2025-04-20T11:30:00Z",
        },
    ],
    assignments: [
        {
            id: "a1",
            title: "Assignment 1 - Arrays & Linked Lists",
            description:
                "Programming assignment covering array operations and linked list implementations.",
            file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            file_name: "DSA_Assignment1.pdf",
            file_size: 920000,
            file_type: "pdf",
            category: "assignments" as ResourceCategory,
            contributor_name: "Neha Agarwal",
            avg_rating: 4.0,
            rating_count: 12,
            download_count: 67,
            created_at: "2025-09-15T08:00:00Z",
        },
    ],
    lab_manuals: [
        {
            id: "l1",
            title: "Lab Manual - Complete Experiments",
            description:
                "All lab experiments with code, output screenshots, and viva questions.",
            file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            file_name: "DSA_Lab_Manual.pdf",
            file_size: 8500000,
            file_type: "pdf",
            category: "lab_manuals" as ResourceCategory,
            contributor_name: "Arjun Mehta",
            avg_rating: 4.6,
            rating_count: 38,
            download_count: 245,
            created_at: "2025-08-01T12:00:00Z",
        },
    ],
};

// Demo subject names
const SUBJECT_NAMES: Record<string, string> = {
    cs201: "Data Structures & Algorithms",
    cs202: "Discrete Mathematics",
    cs203: "Computer Organization",
    cs301: "Database Management Systems",
    cs302: "Theory of Computation",
    cs303: "Software Engineering",
    cs401: "Operating Systems",
    cs402: "Compiler Design",
    cs403: "Computer Graphics",
    cs501: "Computer Networks",
    cs502: "Artificial Intelligence",
    cs601: "Machine Learning",
    cs701: "Web Development",
    ma101: "Engineering Mathematics I",
    ph101: "Engineering Physics",
    cs101: "Programming in C",
    ma102: "Engineering Mathematics II",
    cs102: "Object Oriented Programming",
    cs103: "Digital Logic Design",
    ec201: "Circuit Theory",
    ec301: "Signals & Systems",
    ec401: "VLSI Design",
    ec501: "Embedded Systems",
};

const CATEGORY_TABS = [
    { value: "notes", label: "Notes", icon: NotebookPen, count: 3 },
    { value: "pyqs", label: "PYQs", icon: ClipboardList, count: 2 },
    { value: "assignments", label: "Assignments", icon: FileText, count: 1 },
    { value: "lab_manuals", label: "Lab Manuals", icon: FlaskConical, count: 1 },
];

interface PageProps {
    params: Promise<{ departmentId: string; semester: string; subjectId: string }>;
}

export default function SubjectPage({ params }: PageProps) {
    const { departmentId, semester, subjectId } = use(params);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const subjectName = SUBJECT_NAMES[subjectId] || "Unknown Subject";

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
                    <Link
                        href="/dashboard"
                        className="hover:text-foreground transition-colors"
                    >
                        Departments
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/dashboard/${departmentId}`}
                        className="hover:text-foreground transition-colors"
                    >
                        {departmentId.toUpperCase()}
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/dashboard/${departmentId}/${semester}`}
                        className="hover:text-foreground transition-colors"
                    >
                        Sem {semester}
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate">
                        {subjectId.toUpperCase()}
                    </span>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                    <div>
                        <Badge
                            variant="secondary"
                            className="rounded-full text-xs font-bold mb-2"
                        >
                            {subjectId.toUpperCase()} • Semester {semester}
                        </Badge>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                            {subjectName}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {departmentId.toUpperCase()} Department • 7 resources available
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center border border-border/50 rounded-xl overflow-hidden">
                            <Button
                                variant={viewMode === "list" ? "secondary" : "ghost"}
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant={viewMode === "grid" ? "secondary" : "ghost"}
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid3X3 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <Tabs defaultValue="notes" className="w-full">
                    <TabsList className="w-full justify-start bg-muted/50 rounded-xl h-auto p-1 flex-wrap gap-1">
                        {CATEGORY_TABS.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="rounded-lg gap-2 text-xs sm:text-sm data-[state=active]:shadow-sm px-3 sm:px-4 py-2"
                            >
                                <tab.icon className="h-3.5 w-3.5" />
                                <span>{tab.label}</span>
                                <Badge
                                    variant="secondary"
                                    className="rounded-full text-[10px] h-5 px-1.5 ml-0.5"
                                >
                                    {tab.count}
                                </Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {Object.entries(DEMO_RESOURCES).map(([category, resources]) => (
                        <TabsContent key={category} value={category} className="mt-6">
                            <div
                                className={
                                    viewMode === "grid"
                                        ? "grid sm:grid-cols-2 gap-4"
                                        : "grid gap-3"
                                }
                            >
                                {resources.map((resource) => (
                                    <ResourceCard key={resource.id} resource={resource} />
                                ))}
                            </div>

                            {resources.length === 0 && (
                                <div className="py-16 text-center">
                                    <FileText className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-muted-foreground">
                                        No resources in this category yet
                                    </p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">
                                        Be the first to upload!
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
