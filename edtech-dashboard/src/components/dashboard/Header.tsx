import { Search, Bell, User } from "lucide-react";
import { DateFilterType } from "@/types";

interface HeaderProps {
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    dateFilter?: DateFilterType;
    onDateFilterChange?: (filter: DateFilterType) => void;
}

export function Header({
    searchQuery = "",
    onSearchChange,
    dateFilter = "This Week",
    onDateFilterChange
}: HeaderProps) {
    return (
        <header className="h-16 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
            {/* Search Bar */}
            <div className="flex items-center w-96 bg-slate-100 rounded-full px-4 py-2 ring-1 ring-transparent focus-within:ring-emerald-500 transition-all">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search keywords (e.g., 'University Entrance', 'AI')"
                    className="bg-transparent border-none focus:outline-none flex-1 ml-2 text-sm text-slate-700 placeholder:text-slate-400"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Date Filter - Toggle Buttons */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    {(['This Week', 'This Month', 'All Time'] as DateFilterType[]).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => onDateFilterChange?.(filter)}
                            className={`px-3 py-1.5 text-xs rounded-md transition-all ${dateFilter === filter
                                    ? "bg-white text-slate-800 shadow-sm font-bold text-emerald-600"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm border border-emerald-200">
                    TS
                </div>
            </div>
        </header>
    );
}
