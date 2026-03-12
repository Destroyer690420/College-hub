import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    FileText,
    NotebookPen,
    FlaskConical,
    ClipboardList,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Demo subjects per (dept, semester)
const SUBJECTS_DATA: Record<
    string,
    Record<string, { id: string; name: string; code: string; resourceCount: number }[]>
> = {
    cse: {
        "1": [
            { id: "ma101", name: "Engineering Mathematics I", code: "MA101", resourceCount: 8 },
            { id: "ph101", name: "Engineering Physics", code: "PH101", resourceCount: 6 },
            { id: "cs101", name: "Programming in C", code: "CS101", resourceCount: 12 },
        ],
        "2": [
            { id: "ma102", name: "Engineering Mathematics II", code: "MA102", resourceCount: 7 },
            { id: "cs102", name: "Object Oriented Programming", code: "CS102", resourceCount: 10 },
            { id: "cs103", name: "Digital Logic Design", code: "CS103", resourceCount: 5 },
        ],
        "3": [
            { id: "cs201", name: "Data Structures & Algorithms", code: "CS201", resourceCount: 18 },
            { id: "cs202", name: "Discrete Mathematics", code: "CS202", resourceCount: 9 },
            { id: "cs203", name: "Computer Organization", code: "CS203", resourceCount: 7 },
        ],
        "4": [
            { id: "cs301", name: "Database Management Systems", code: "CS301", resourceCount: 15 },
            { id: "cs302", name: "Theory of Computation", code: "CS302", resourceCount: 8 },
            { id: "cs303", name: "Software Engineering", code: "CS303", resourceCount: 6 },
        ],
        "5": [
            { id: "cs401", name: "Operating Systems", code: "CS401", resourceCount: 14 },
            { id: "cs402", name: "Compiler Design", code: "CS402", resourceCount: 7 },
            { id: "cs403", name: "Computer Graphics", code: "CS403", resourceCount: 5 },
        ],
        "6": [
            { id: "cs501", name: "Computer Networks", code: "CS501", resourceCount: 13 },
            { id: "cs502", name: "Artificial Intelligence", code: "CS502", resourceCount: 11 },
            { id: "cs503", name: "Cryptography", code: "CS503", resourceCount: 4 },
        ],
        "7": [
            { id: "cs601", name: "Machine Learning", code: "CS601", resourceCount: 16 },
            { id: "cs602", name: "Cloud Computing", code: "CS602", resourceCount: 9 },
            { id: "cs603", name: "Information Security", code: "CS603", resourceCount: 6 },
        ],
        "8": [
            { id: "cs701", name: "Web Development", code: "CS701", resourceCount: 12 },
            { id: "cs702", name: "Blockchain Technology", code: "CS702", resourceCount: 5 },
        ],
    },
    ece: {
        "3": [
            { id: "ec201", name: "Circuit Theory", code: "EC201", resourceCount: 10 },
            { id: "ec202", name: "Analog Electronics", code: "EC202", resourceCount: 8 },
            { id: "ec203", name: "Network Analysis", code: "EC203", resourceCount: 6 },
        ],
        "4": [
            { id: "ec301", name: "Signals & Systems", code: "EC301", resourceCount: 12 },
            { id: "ec302", name: "Digital Electronics", code: "EC302", resourceCount: 9 },
            { id: "ec303", name: "Electromagnetic Theory", code: "EC303", resourceCount: 7 },
        ],
        "5": [
            { id: "ec401", name: "VLSI Design", code: "EC401", resourceCount: 11 },
            { id: "ec402", name: "Control Systems", code: "EC402", resourceCount: 8 },
            { id: "ec403", name: "Microprocessors", code: "EC403", resourceCount: 9 },
        ],
        "7": [
            { id: "ec501", name: "Embedded Systems", code: "EC501", resourceCount: 10 },
            { id: "ec502", name: "Wireless Communication", code: "EC502", resourceCount: 7 },
            { id: "ec503", name: "IoT Systems", code: "EC503", resourceCount: 5 },
        ],
    },
};

const DEPARTMENT_NAMES: Record<string, string> = {
    cse: "Computer Science & Engineering",
    ece: "Electronics & Communication",
    me: "Mechanical Engineering",
    ce: "Civil Engineering",
    ee: "Electrical Engineering",
    it: "Information Technology",
};

const CATEGORY_ICONS = [
    { icon: NotebookPen, label: "Notes", color: "text-blue-500" },
    { icon: ClipboardList, label: "PYQs", color: "text-amber-500" },
    { icon: FileText, label: "Assignments", color: "text-emerald-500" },
    { icon: FlaskConical, label: "Lab Manuals", color: "text-purple-500" },
];

interface PageProps {
    params: Promise<{ departmentId: string; semester: string }>;
}

export default async function SemesterPage({ params }: PageProps) {
    const { departmentId, semester } = await params;
    const subjects = SUBJECTS_DATA[departmentId]?.[semester];
    const deptName = DEPARTMENT_NAMES[departmentId] || departmentId.toUpperCase();

    if (!subjects) {
        return (
            <div className="px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h1 className="text-2xl font-bold mb-2">No subjects found</h1>
                <p className="text-muted-foreground mb-4">
                    No subjects are available for this semester yet.
                </p>
                <Link href={`/dashboard/${departmentId}`}>
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to {departmentId.toUpperCase()}
                    </Button>
                </Link>
            </div>
        );
    }

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
                    <span className="text-foreground font-medium">
                        Semester {semester}
                    </span>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                        Semester {semester}
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        {deptName} — {subjects.length} subjects available
                    </p>
                </div>

                {/* Subjects */}
                <div className="grid gap-4">
                    {subjects.map((subject) => (
                        <Link
                            key={subject.id}
                            href={`/dashboard/${departmentId}/${semester}/${subject.id}`}
                        >
                            <Card className="group border-border/40 bg-card/60 hover:bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer">
                                <CardContent className="p-5 sm:p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 min-w-0 mr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-full text-[10px] font-bold shrink-0"
                                                >
                                                    {subject.code}
                                                </Badge>
                                            </div>
                                            <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors">
                                                {subject.name}
                                            </h3>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                                    </div>

                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <FileText className="h-3.5 w-3.5" />
                                            <span>{subject.resourceCount} Resources</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {CATEGORY_ICONS.map((cat) => (
                                                <div
                                                    key={cat.label}
                                                    className="flex items-center gap-1"
                                                    title={cat.label}
                                                >
                                                    <cat.icon className={`h-3 w-3 ${cat.color}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
