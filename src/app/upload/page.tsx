"use client";

import { useState } from "react";
import {
    Upload as UploadIcon,
    FileText,
    X,
    Check,
    AlertCircle,
    CloudUpload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
    { id: "cse", name: "Computer Science & Engineering" },
    { id: "ece", name: "Electronics & Communication" },
    { id: "me", name: "Mechanical Engineering" },
    { id: "ce", name: "Civil Engineering" },
    { id: "ee", name: "Electrical Engineering" },
    { id: "it", name: "Information Technology" },
];

const SEMESTERS = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    name: `Semester ${i + 1}`,
}));

const CATEGORIES = [
    { id: "notes", name: "Notes" },
    { id: "pyqs", name: "Previous Year Questions" },
    { id: "assignments", name: "Assignments" },
    { id: "lab_manuals", name: "Lab Manuals" },
];

const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/webp",
];

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export default function UploadPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateFile = (f: File): boolean => {
        if (!ALLOWED_TYPES.includes(f.type)) {
            setError("Only PDF, DOC, DOCX, JPEG, PNG, and WebP files are allowed.");
            return false;
        }
        if (f.size > MAX_FILE_SIZE) {
            setError("File size must be under 25MB.");
            return false;
        }
        setError("");
        return true;
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const f = e.dataTransfer.files[0];
        if (f && validateFile(f)) {
            setFile(f);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f && validateFile(f)) {
            setFile(f);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title || !department || !semester || !category) {
            setError("Please fill in all required fields.");
            return;
        }

        setIsUploading(true);
        setError("");

        // Simulate upload — in production, this uploads to Supabase Storage
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsUploading(false);
        setIsSuccess(true);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    if (isSuccess) {
        return (
            <div className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-lg mx-auto text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 mx-auto mb-6">
                        <Check className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2">
                        Upload Successful!
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Your resource has been uploaded and will be available for others to
                        access. Thank you for contributing!
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Button
                            onClick={() => {
                                setIsSuccess(false);
                                setTitle("");
                                setDescription("");
                                setFile(null);
                                setDepartment("");
                                setSemester("");
                                setCategory("");
                            }}
                            className="rounded-full px-6 gap-2"
                        >
                            <UploadIcon className="h-4 w-4" />
                            Upload Another
                        </Button>
                        <Button
                            variant="outline"
                            className="rounded-full px-6"
                            onClick={() => (window.location.href = "/dashboard")}
                        >
                            Browse Resources
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                        Upload Resource
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Share your study materials with fellow students. All uploads are
                        reviewed for quality.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* File Upload */}
                    <Card className="border-border/40 bg-card/60">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">File</CardTitle>
                            <CardDescription className="text-xs">
                                PDF, DOC, DOCX, JPEG, PNG, or WebP (max 25MB)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {file ? (
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/30">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0"
                                        onClick={() => setFile(null)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    className={cn(
                                        "relative flex flex-col items-center justify-center py-10 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer",
                                        dragActive
                                            ? "border-primary bg-primary/5"
                                            : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
                                    )}
                                    onDragEnter={(e) => {
                                        e.preventDefault();
                                        setDragActive(true);
                                    }}
                                    onDragLeave={(e) => {
                                        e.preventDefault();
                                        setDragActive(false);
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    onClick={() =>
                                        document.getElementById("file-input")?.click()
                                    }
                                >
                                    <CloudUpload className="h-8 w-8 text-muted-foreground/50 mb-3" />
                                    <p className="text-sm font-medium mb-1">
                                        Drop your file here or{" "}
                                        <span className="text-primary">browse</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PDF, DOC, Images up to 25MB
                                    </p>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Details */}
                    <Card className="border-border/40 bg-card/60">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Details</CardTitle>
                            <CardDescription className="text-xs">
                                Provide information about the resource
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm">
                                    Title *
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., DSA Complete Notes Unit 1-5"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description of the resource..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="resize-none h-20 rounded-xl"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Classification */}
                    <Card className="border-border/40 bg-card/60">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Classification</CardTitle>
                            <CardDescription className="text-xs">
                                Categorize the resource correctly for easy discovery
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm">Department *</Label>
                                    <Select value={department} onValueChange={(val) => setDepartment(val || "")}>
                                        <SelectTrigger className="rounded-xl">
                                            <SelectValue placeholder="Select dept" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DEPARTMENTS.map((d) => (
                                                <SelectItem key={d.id} value={d.id}>
                                                    {d.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm">Semester *</Label>
                                    <Select value={semester} onValueChange={(val) => setSemester(val || "")}>
                                        <SelectTrigger className="rounded-xl">
                                            <SelectValue placeholder="Select sem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {SEMESTERS.map((s) => (
                                                <SelectItem key={s.id} value={s.id}>
                                                    {s.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm">Category *</Label>
                                <Select value={category} onValueChange={(val) => setCategory(val || "")}>
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((c) => (
                                            <SelectItem key={c.id} value={c.id}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isUploading || !file || !title || !department || !semester || !category}
                        className="w-full rounded-xl gap-2 h-12 text-base shadow-lg shadow-primary/20"
                    >
                        {isUploading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <UploadIcon className="h-4 w-4" />
                                Upload Resource
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
