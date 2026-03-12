import {
    User,
    Mail,
    Building2,
    Calendar,
    FileText,
    Star,
    Upload,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Demo profile
const profile = {
    name: "Student User",
    email: "student@college.edu",
    department: "Computer Science & Engineering",
    joinedDate: "Sep 2025",
    uploads: 5,
    totalRatings: 42,
    avgRating: 4.3,
};

const recentUploads = [
    {
        id: "1",
        title: "DSA Complete Notes - Unit 1 to 5",
        category: "Notes",
        date: "Dec 15, 2025",
        downloads: 156,
    },
    {
        id: "2",
        title: "DBMS PYQ 2024 Solved",
        category: "PYQs",
        date: "Jun 10, 2025",
        downloads: 312,
    },
    {
        id: "3",
        title: "OS Lab Manual - Complete",
        category: "Lab Manual",
        date: "Aug 01, 2025",
        downloads: 245,
    },
];

export default function ProfilePage() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                        Profile
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Manage your account and view your contributions
                    </p>
                </div>

                {/* Profile card */}
                <Card className="border-border/40 bg-card/60 mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-lg">
                                {profile.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold">{profile.name}</h2>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                                    <Mail className="h-3.5 w-3.5" />
                                    <span>{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                                    <Building2 className="h-3.5 w-3.5" />
                                    <span>{profile.department}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>Joined {profile.joinedDate}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <Card className="border-border/40 bg-card/60">
                        <CardContent className="p-4 text-center">
                            <Upload className="h-5 w-5 text-primary mx-auto mb-1.5" />
                            <p className="text-2xl font-bold">{profile.uploads}</p>
                            <p className="text-xs text-muted-foreground">Uploads</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/60">
                        <CardContent className="p-4 text-center">
                            <Star className="h-5 w-5 text-amber-500 mx-auto mb-1.5" />
                            <p className="text-2xl font-bold">{profile.avgRating}</p>
                            <p className="text-xs text-muted-foreground">Avg Rating</p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/40 bg-card/60">
                        <CardContent className="p-4 text-center">
                            <FileText className="h-5 w-5 text-emerald-500 mx-auto mb-1.5" />
                            <p className="text-2xl font-bold">{profile.totalRatings}</p>
                            <p className="text-xs text-muted-foreground">Ratings</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Uploads */}
                <Card className="border-border/40 bg-card/60">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Your Uploads</CardTitle>
                            <Link href="/upload">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full gap-1.5 text-xs"
                                >
                                    <Upload className="h-3 w-3" />
                                    Upload New
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentUploads.map((upload) => (
                                <div
                                    key={upload.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 shrink-0">
                                        <FileText className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{upload.title}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <Badge
                                                variant="secondary"
                                                className="rounded-full text-[10px]"
                                            >
                                                {upload.category}
                                            </Badge>
                                            <span className="text-[11px] text-muted-foreground">
                                                {upload.date}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-semibold">{upload.downloads}</p>
                                        <p className="text-[10px] text-muted-foreground">downloads</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
