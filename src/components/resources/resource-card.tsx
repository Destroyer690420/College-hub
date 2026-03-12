"use client";

import { useState } from "react";
import {
    FileText,
    Download,
    Eye,
    Calendar,
    HardDrive,
    User,
    MoreVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RatingStars } from "./rating-stars";
import { ReportDialog } from "./report-dialog";
import { PdfViewer } from "./pdf-viewer";
import { cn } from "@/lib/utils";
import type { ResourceCategory } from "@/lib/types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";

interface ResourceItem {
    id: string;
    title: string;
    description: string | null;
    file_url: string;
    file_name: string;
    file_size: number;
    file_type: string;
    category: ResourceCategory;
    contributor_name: string;
    avg_rating: number;
    rating_count: number;
    download_count: number;
    created_at: string;
}

interface ResourceCardProps {
    resource: ResourceItem;
}

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function ResourceCard({ resource }: ResourceCardProps) {
    const [showPdf, setShowPdf] = useState(false);

    return (
        <>
            <Card className="group border-border/40 bg-card/60 hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                        {/* File icon */}
                        <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/8 shrink-0 mt-0.5">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                            {/* Title row */}
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                                <h4 className="font-medium text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                                    {resource.title}
                                </h4>
                                <DropdownMenu>
                                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 -mr-1" />}>
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => setShowPdf(true)}
                                            className="gap-2"
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                            Preview
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-2" render={<a href={resource.file_url} download />}>
                                            <Download className="h-3.5 w-3.5" />
                                            Download
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Category badge */}
                            <div className="flex items-center gap-2 mb-2.5">
                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        "rounded-full text-[10px] font-semibold px-2 py-0",
                                        CATEGORY_COLORS[resource.category]
                                    )}
                                >
                                    {CATEGORY_LABELS[resource.category]}
                                </Badge>
                                <span className="text-[11px] text-muted-foreground">
                                    {resource.file_type.toUpperCase()}
                                </span>
                            </div>

                            {/* Description */}
                            {resource.description && (
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                                    {resource.description}
                                </p>
                            )}

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(resource.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HardDrive className="h-3 w-3" />
                                    <span>{formatFileSize(resource.file_size)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{resource.contributor_name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="h-3 w-3" />
                                    <span>{resource.download_count}</span>
                                </div>
                            </div>

                            {/* Rating + Actions */}
                            <div className="flex items-center justify-between">
                                <RatingStars
                                    rating={resource.avg_rating}
                                    count={resource.rating_count}
                                    interactive
                                    onRate={(score) =>
                                        console.log("Rated", resource.id, score)
                                    }
                                />
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 gap-1.5 text-xs"
                                        onClick={() => setShowPdf(true)}
                                    >
                                        <Eye className="h-3 w-3" />
                                        <span className="hidden sm:inline">Preview</span>
                                    </Button>
                                    <ReportDialog
                                        resourceId={resource.id}
                                        resourceTitle={resource.title}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* PDF Viewer overlay */}
            {showPdf && (
                <PdfViewer
                    fileUrl={resource.file_url}
                    fileName={resource.file_name}
                    onClose={() => setShowPdf(false)}
                />
            )}
        </>
    );
}
