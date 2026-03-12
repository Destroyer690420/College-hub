"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
    rating: number;
    count?: number;
    interactive?: boolean;
    size?: "sm" | "md";
    onRate?: (score: number) => void;
}

export function RatingStars({
    rating,
    count,
    interactive = false,
    size = "sm",
    onRate,
}: RatingStarsProps) {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(rating);

    const displayRating = hoverRating || currentRating;
    const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

    const handleClick = (score: number) => {
        if (!interactive) return;
        setCurrentRating(score);
        onRate?.(score);
    };

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        disabled={!interactive}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                        className={cn(
                            "transition-all duration-150",
                            interactive && "cursor-pointer hover:scale-110 active:scale-95",
                            !interactive && "cursor-default"
                        )}
                    >
                        <Star
                            className={cn(
                                starSize,
                                "transition-colors",
                                star <= displayRating
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-transparent text-muted-foreground/30"
                            )}
                        />
                    </button>
                ))}
            </div>
            {count !== undefined && (
                <span className="text-xs text-muted-foreground">
                    {currentRating.toFixed(1)} ({count})
                </span>
            )}
        </div>
    );
}
