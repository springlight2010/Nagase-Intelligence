"use client";

import { useEffect, useState, useMemo } from "react";
// ★必ず {} で囲んでインポートしてください
import { fetchNewsFromRSS } from "@/lib/rss";
import { NewsArticle, DateFilterType, NewsCategory } from "@/types";

export function useNewsData() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState<DateFilterType>("All Time");
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                setIsLoading(true);
                const data = await fetchNewsFromRSS();
                if (isMounted && Array.isArray(data)) {
                    setArticles(data);
                    setLastUpdated(new Date().toLocaleString());
                }
            } catch (e) {
                console.error("Hook Error:", e);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }
        load();
        return () => { isMounted = false; };
    }, []);

    const filteredArticles = useMemo(() => {
        if (!articles) return [];
        let result = articles;
        if (selectedCategory) result = result.filter(a => a.category === selectedCategory);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(a => a.title?.toLowerCase().includes(q));
        }
        return result;
    }, [articles, selectedCategory, searchQuery]);

    return {
        articles,
        filteredArticles,
        isLoading,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        dateFilter,
        setDateFilter,
        lastUpdated
    };
}