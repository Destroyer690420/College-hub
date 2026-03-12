import Link from "next/link";
import {
    Monitor,
    Cpu,
    Cog,
    Building2,
    Zap,
    Globe,
    ArrowRight,
    BookOpen,
    FileText,
    Users,
} from "lucide-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobalSearch } from "@/components/search/global-search";

const ICON_MAP: Record<string, React.ElementType> = {
    Monitor,
    Cpu,
    Cog,
    Building2,
    Zap,
    Globe,
};

// Demo departments — in production, these come from Supabase
const departments = [
    {
        id: "cse",
        name: "Computer Science & Engineering",
        code: "CSE",
        description: "Department of Computer Science and Engineering",
        icon: "Monitor",
        subjectCount: 12,
        resourceCount: 142,
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-500/10",
    },
    {
        id: "ece",
        name: "Electronics & Communication",
        code: "ECE",
        description: "Department of Electronics and Communication Engineering",
        icon: "Cpu",
        subjectCount: 10,
        resourceCount: 89,
        color: "from-cyan-500 to-blue-600",
        bgColor: "bg-cyan-500/10",
    },
    {
        id: "me",
        name: "Mechanical Engineering",
        code: "ME",
        description: "Department of Mechanical Engineering",
        icon: "Cog",
        subjectCount: 8,
        resourceCount: 64,
        color: "from-orange-500 to-red-600",
        bgColor: "bg-orange-500/10",
    },
    {
        id: "ce",
        name: "Civil Engineering",
        code: "CE",
        description: "Department of Civil Engineering",
        icon: "Building2",
        subjectCount: 7,
        resourceCount: 52,
        color: "from-emerald-500 to-green-600",
        bgColor: "bg-emerald-500/10",
    },
    {
        id: "ee",
        name: "Electrical Engineering",
        code: "EE",
        description: "Department of Electrical Engineering",
        icon: "Zap",
        subjectCount: 9,
        resourceCount: 71,
        color: "from-yellow-500 to-amber-600",
        bgColor: "bg-yellow-500/10",
    },
    {
        id: "it",
        name: "Information Technology",
        code: "IT",
        description: "Department of Information Technology",
        icon: "Globe",
        subjectCount: 11,
        resourceCount: 108,
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-500/10",
    },
];

export default function DashboardPage() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                        Departments
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Select your department to browse resources by semester
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8 max-w-xl">
                    <GlobalSearch variant="compact" />
                </div>

                {/* Department Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments.map((dept) => {
                        const IconComp = ICON_MAP[dept.icon] || BookOpen;
                        return (
                            <Link key={dept.id} href={`/dashboard/${dept.id}`}>
                                <Card className="group h-full border-border/40 bg-card/60 hover:bg-card hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden">
                                    <CardContent className="p-6">
                                        {/* Icon + Code */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div
                                                className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${dept.color} shadow-lg`}
                                            >
                                                <IconComp className="h-6 w-6 text-white" />
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="rounded-full text-xs font-bold"
                                            >
                                                {dept.code}
                                            </Badge>
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                                            {dept.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {dept.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <BookOpen className="h-3.5 w-3.5" />
                                                <span>{dept.subjectCount} Subjects</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <FileText className="h-3.5 w-3.5" />
                                                <span>{dept.resourceCount} Resources</span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex justify-end mt-4">
                                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
