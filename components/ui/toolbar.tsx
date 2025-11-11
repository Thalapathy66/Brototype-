"use client";

import * as React from "react"
import { cn } from "@/lib/utils";
import {
    Download,
    Sparkles,
    ChevronDown,
    Search,
    Filter,
} from "lucide-react";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    onSearch?: (value: string) => void;
    onFilterClick?: () => void;
    onCreateClick?: () => void;
    onDownloadClick?: () => void;
    filterOpen?: boolean;
}

function Toolbar({
    className,
    onSearch,
    onFilterClick,
    onCreateClick,
    onDownloadClick,
    filterOpen = false,
    ...props
}: ToolbarProps) {
    return (
        <div
            className={cn(
                "w-full",
                "bg-white dark:bg-zinc-900",
                "border border-zinc-200 dark:border-zinc-800",
                "rounded-xl",
                "flex items-center gap-2 p-2",
                className
            )}
            {...props}
        >
            {/* Search Input */}
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Search complaints..."
                    className="w-full h-9 pl-9 pr-4 
                        bg-zinc-100 dark:bg-zinc-800 
                        text-sm text-zinc-900 dark:text-zinc-100 
                        placeholder:text-zinc-500 
                        rounded-lg focus:outline-none"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Button */}
            <button
                onClick={onFilterClick}
                className={cn(
                    "h-9 px-3",
                    "rounded-lg flex items-center gap-2",
                    "text-sm text-zinc-900 dark:text-zinc-100",
                    "transition-colors",
                    filterOpen 
                        ? "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400"
                        : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                )}
            >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-zinc-500 transition-transform",
                    filterOpen && "rotate-180"
                )} />
            </button>

            {/* Download All Button */}
            <button
                onClick={onDownloadClick}
                title="Download all complaints as Word document"
                className="h-9 px-3 flex items-center gap-2
                    bg-green-100 dark:bg-green-900/30
                    text-green-700 dark:text-green-400
                    rounded-lg
                    hover:bg-green-200 dark:hover:bg-green-900/50
                    transition-colors"
            >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Export</span>
            </button>

            {/* Primary Action */}
            <button
                onClick={onCreateClick}
                className="h-9 px-4 flex items-center gap-2
                    rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 
                    transition-colors"
            >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm text-white">New Complaint</span>
            </button>
        </div>
    );
}

export { Toolbar }
