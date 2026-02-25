import { NewsArticle } from "@/types";
import { cn } from "@/lib/utils";
import { Calendar, Tag, Bookmark } from "lucide-react";

interface NewsCardProps {
    article: NewsArticle;
    isSelected?: boolean;
    onClick: () => void;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
}

export function NewsCard({ article, isSelected, onClick, isBookmarked, onToggleBookmark }: NewsCardProps) {

    // Category Color Logic
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'UniversityEntrance': return 'bg-blue-400 text-white';
            case 'EdTech': return 'bg-emerald-400 text-white';
            case 'Policy': return 'bg-purple-400 text-white';
            case 'Competitor': return 'bg-rose-400 text-white';
            case 'General': return 'bg-sky-400 text-white';
            default: return 'bg-slate-400 text-white';
        }
    };

    return (
        <div
            onClick={onClick}
            className={cn(
                "cursor-pointer p-4 rounded-xl border transition-all duration-200 hover:shadow-md relative group",
                isSelected
                    ? "bg-white border-emerald-500 shadow-emerald-50 ring-1 ring-emerald-500"
                    : "bg-white border-slate-200 hover:border-emerald-300"
            )}
        >
            <div className="flex justify-between items-start mb-3">
                {/* Category Tag: Solid UI */}
                <span className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm",
                    getCategoryColor(article.category)
                )}>
                    <Tag className="h-3 w-3" />
                    {article.category}
                </span>

                {/* Bookmark Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark();
                    }}
                    className={cn(
                        "p-1.5 rounded-full transition-colors",
                        isBookmarked
                            ? "text-indigo-500 bg-indigo-50 hover:bg-indigo-100"
                            : "text-slate-300 hover:text-indigo-400 hover:bg-slate-50"
                    )}
                >
                    <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                </button>
            </div>

            <h3 className="font-bold text-slate-800 leading-snug mb-2 line-clamp-2 pr-2">
                {article.title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-400">
                    {article.sourceName}
                </span>
            </div>

            {/* Strategic Comment Section Removed for Compact View */}
        </div>
    );
}
