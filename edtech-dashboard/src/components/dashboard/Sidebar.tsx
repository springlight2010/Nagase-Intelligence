import Link from "next/link";
import { NewsCategory } from "@/types";
import {
    LayoutDashboard,
    Newspaper,
    LineChart,
    Settings,
    LogOut,
    GraduationCap,
    Bookmark // Import Bookmark icon
} from "lucide-react";

interface SidebarProps {
    className?: string; // Keep
    selectedCategory?: string | null; // Allow 'Saved' string
    onSelectCategory?: (category: any | null) => void; // Allow string
}

export function Sidebar({ className, selectedCategory, onSelectCategory }: SidebarProps) {
    const categories: { id: NewsCategory; label: string }[] = [
        { id: 'UniversityEntrance', label: '大学入試' },
        { id: 'EdTech', label: '教育DX' },
        { id: 'Policy', label: '教育政策' },
        { id: 'Competitor', label: '競合動向' },
        { id: 'General', label: '塾・予備校' },
        { id: 'Other', label: 'その他' }
    ];

    return (
        <div className={`flex flex-col h-screen w-64 bg-slate-900 text-white ${className}`}>
            {/* Logo Area */}
            <div className="flex items-center gap-2 p-6 border-b border-slate-800">
                <GraduationCap className="h-8 w-8 text-emerald-400" />
                <div>
                    <h1 className="text-lg font-serif font-bold tracking-tight text-white">Nagase Intelligence</h1>
                    <p className="text-xs text-slate-400">Strategic News Dashboard</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 flex flex-col">

                {/* 1. All News */}
                <div className="mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
                        Main Menu
                    </div>
                    <button
                        onClick={() => onSelectCategory?.(null)}
                        className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${!selectedCategory ? 'text-white bg-slate-800 border-l-2 border-slate-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>All News</span>
                    </button>
                </div>

                {/* Divider 1 */}
                <div className="h-px bg-slate-800 mb-6 mx-2" />

                {/* 2. Categories */}
                <div className="mb-6">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
                        CATEGORIES
                    </div>
                    <div className="space-y-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => onSelectCategory?.(cat.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 w-full text-left text-sm rounded-lg transition-colors ${selectedCategory === cat.id
                                    ? 'text-white bg-emerald-900/50 border-l-2 border-emerald-500'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full ${selectedCategory === cat.id ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider 2 */}
                <div className="h-px bg-slate-800 mb-6 mx-2" />

                {/* 3. Saved Items */}
                <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
                        Library
                    </div>
                    <button
                        onClick={() => onSelectCategory?.('Saved')}
                        className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors ${selectedCategory === 'Saved' ? 'text-white bg-indigo-900/50 border-l-2 border-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        <Bookmark className={`h-5 w-5 ${selectedCategory === 'Saved' ? 'text-indigo-400' : ''}`} />
                        <span>Saved Items</span>
                    </button>
                </div>

            </nav>

            {/* Footer / User - REMOVED for CSV Mode */}
        </div>
    );
}
