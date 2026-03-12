"use client";

import { useState } from "react";
import { X, Download, ExternalLink, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PdfViewerProps {
    fileUrl: string;
    fileName: string;
    onClose: () => void;
}

export function PdfViewer({ fileUrl, fileName, onClose }: PdfViewerProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm",
                isFullscreen ? "p-0" : "p-4 sm:p-6 lg:p-8"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-14 px-4 bg-card border-b border-border/50 rounded-t-xl shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm font-medium truncate">{fileName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </a>
                    <a href={fileUrl} download>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                        </Button>
                    </a>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 bg-muted rounded-b-xl overflow-hidden">
                <iframe
                    src={`${fileUrl}#toolbar=0`}
                    className="w-full h-full border-0"
                    title={fileName}
                />
            </div>
        </div>
    );
}
