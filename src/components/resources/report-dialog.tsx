"use client";

import { useState } from "react";
import { Flag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const REPORT_REASONS = [
    "Incorrect / Wrong content",
    "Duplicate file",
    "Poor quality / Unreadable",
    "Copyright violation",
    "Spam or irrelevant",
    "Other",
];

interface ReportDialogProps {
    resourceId: string;
    resourceTitle: string;
}

export function ReportDialog({ resourceId, resourceTitle }: ReportDialogProps) {
    const [selectedReason, setSelectedReason] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        // In production, this would call a Supabase function
        console.log("Report submitted:", {
            resourceId,
            reason: selectedReason,
            additionalInfo,
        });
        setIsSubmitted(true);
        setTimeout(() => {
            setOpen(false);
            setIsSubmitted(false);
            setSelectedReason("");
            setAdditionalInfo("");
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive gap-1.5 h-8 text-xs" />}>
                <Flag className="h-3 w-3" />
                Report
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                {isSubmitted ? (
                    <div className="py-8 text-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 mx-auto mb-4">
                            <AlertTriangle className="h-6 w-6 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Report Submitted</h3>
                        <p className="text-sm text-muted-foreground">
                            Thank you for helping us maintain quality resources.
                        </p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Report Resource</DialogTitle>
                            <DialogDescription>
                                Report an issue with &ldquo;{resourceTitle}&rdquo;
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">
                                    Reason for reporting
                                </Label>
                                <div className="grid gap-2">
                                    {REPORT_REASONS.map((reason) => (
                                        <button
                                            key={reason}
                                            type="button"
                                            onClick={() => setSelectedReason(reason)}
                                            className={cn(
                                                "flex items-center px-3 py-2.5 rounded-xl border text-sm text-left transition-all",
                                                selectedReason === reason
                                                    ? "border-primary bg-primary/5 text-foreground"
                                                    : "border-border/50 hover:bg-accent text-muted-foreground"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-4 h-4 rounded-full border-2 mr-3 shrink-0 transition-all",
                                                    selectedReason === reason
                                                        ? "border-primary bg-primary"
                                                        : "border-muted-foreground/30"
                                                )}
                                            />
                                            {reason}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium">
                                    Additional details (optional)
                                </Label>
                                <Textarea
                                    placeholder="Provide any additional context..."
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    className="resize-none h-20"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={!selectedReason}
                                className="rounded-xl gap-2"
                                variant="destructive"
                            >
                                <Flag className="h-3.5 w-3.5" />
                                Submit Report
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
