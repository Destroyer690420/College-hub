import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Demo data — in production, fetched from Supabase by departmentId
const DEPARTMENT_DATA: Record<
    string,
    {
        name: string;
        code: string;
        years: { year: number; semesters: { sem: number; subjectCount: number }[] }[];
    }
> = {
    cse: {
        name: "Computer Science & Engineering",
        code: "CSE",
        years: [
            {
                year: 1,
                semesters: [
                    { sem: 1, subjectCount: 3 },
                    { sem: 2, subjectCount: 3 },
                ],
            },
            {
                year: 2,
                semesters: [
                    { sem: 3, subjectCount: 3 },
                    { sem: 4, subjectCount: 3 },
                ],
            },
            {
                year: 3,
                semesters: [
                    { sem: 5, subjectCount: 3 },
                    { sem: 6, subjectCount: 3 },
                ],
            },
            {
                year: 4,
                semesters: [
                    { sem: 7, subjectCount: 3 },
                    { sem: 8, subjectCount: 2 },
                ],
            },
        ],
    },
    ece: {
        name: "Electronics & Communication",
        code: "ECE",
        years: [
            { year: 1, semesters: [{ sem: 1, subjectCount: 3 }, { sem: 2, subjectCount: 3 }] },
            { year: 2, semesters: [{ sem: 3, subjectCount: 3 }, { sem: 4, subjectCount: 3 }] },
            { year: 3, semesters: [{ sem: 5, subjectCount: 3 }, { sem: 6, subjectCount: 3 }] },
            { year: 4, semesters: [{ sem: 7, subjectCount: 3 }, { sem: 8, subjectCount: 2 }] },
        ],
    },
    me: {
        name: "Mechanical Engineering",
        code: "ME",
        years: [
            { year: 1, semesters: [{ sem: 1, subjectCount: 3 }, { sem: 2, subjectCount: 3 }] },
            { year: 2, semesters: [{ sem: 3, subjectCount: 3 }, { sem: 4, subjectCount: 3 }] },
            { year: 3, semesters: [{ sem: 5, subjectCount: 3 }, { sem: 6, subjectCount: 3 }] },
            { year: 4, semesters: [{ sem: 7, subjectCount: 2 }, { sem: 8, subjectCount: 2 }] },
        ],
    },
    ce: {
        name: "Civil Engineering",
        code: "CE",
        years: [
            { year: 1, semesters: [{ sem: 1, subjectCount: 3 }, { sem: 2, subjectCount: 3 }] },
            { year: 2, semesters: [{ sem: 3, subjectCount: 3 }, { sem: 4, subjectCount: 3 }] },
            { year: 3, semesters: [{ sem: 5, subjectCount: 2 }, { sem: 6, subjectCount: 2 }] },
            { year: 4, semesters: [{ sem: 7, subjectCount: 2 }, { sem: 8, subjectCount: 2 }] },
        ],
    },
    ee: {
        name: "Electrical Engineering",
        code: "EE",
        years: [
            { year: 1, semesters: [{ sem: 1, subjectCount: 3 }, { sem: 2, subjectCount: 3 }] },
            { year: 2, semesters: [{ sem: 3, subjectCount: 3 }, { sem: 4, subjectCount: 3 }] },
            { year: 3, semesters: [{ sem: 5, subjectCount: 3 }, { sem: 6, subjectCount: 3 }] },
            { year: 4, semesters: [{ sem: 7, subjectCount: 2 }, { sem: 8, subjectCount: 2 }] },
        ],
    },
    it: {
        name: "Information Technology",
        code: "IT",
        years: [
            { year: 1, semesters: [{ sem: 1, subjectCount: 3 }, { sem: 2, subjectCount: 3 }] },
            { year: 2, semesters: [{ sem: 3, subjectCount: 3 }, { sem: 4, subjectCount: 3 }] },
            { year: 3, semesters: [{ sem: 5, subjectCount: 3 }, { sem: 6, subjectCount: 3 }] },
            { year: 4, semesters: [{ sem: 7, subjectCount: 3 }, { sem: 8, subjectCount: 2 }] },
        ],
    },
};

const YEAR_COLORS = [
    "from-blue-500 to-indigo-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-purple-500 to-pink-500",
];

const YEAR_LABELS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

interface PageProps {
    params: Promise<{ departmentId: string }>;
}

export default async function DepartmentPage({ params }: PageProps) {
    const { departmentId } = await params;
    const dept = DEPARTMENT_DATA[departmentId];

    if (!dept) {
        return (
            <div className="px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-2xl font-bold mb-2">Department not found</h1>
                <p className="text-muted-foreground mb-4">
                    The department you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link href="/dashboard">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Departments
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link
                        href="/dashboard"
                        className="hover:text-foreground transition-colors"
                    >
                        Departments
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{dept.code}</span>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <Badge
                        variant="secondary"
                        className="rounded-full px-3 py-1 text-xs font-bold mb-3"
                    >
                        {dept.code}
                    </Badge>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                        {dept.name}
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Select a semester to view available subjects and resources
                    </p>
                </div>

                {/* Years */}
                <div className="space-y-8">
                    {dept.years.map((yearData, idx) => (
                        <div key={yearData.year}>
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${YEAR_COLORS[idx]} shadow-md`}
                                >
                                    <span className="text-white font-bold text-sm">
                                        {yearData.year}
                                    </span>
                                </div>
                                <h2 className="text-lg font-semibold">{YEAR_LABELS[idx]}</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {yearData.semesters.map((sem) => (
                                    <Link
                                        key={sem.sem}
                                        href={`/dashboard/${departmentId}/${sem.sem}`}
                                    >
                                        <Card className="group border-border/40 bg-card/60 hover:bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer h-full">
                                            <CardContent className="p-5">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-semibold text-sm">
                                                        Semester {sem.sem}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                        <BookOpen className="h-3.5 w-3.5" />
                                                        <span>{sem.subjectCount} Subjects</span>
                                                    </div>
                                                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
