"use client";

import { useState, useEffect } from 'react';
import { NewsArticle } from '@/types';

const STORAGE_KEY = 'edtech_dashboard_bookmarks';

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Load
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setBookmarks(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Failed to load bookmarks:", error);
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever bookmarks change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
        }
    }, [bookmarks, isLoaded]);

    const addBookmark = (article: NewsArticle) => {
        setBookmarks(prev => {
            if (prev.some(b => b.id === article.id)) return prev;
            return [article, ...prev];
        });
    };

    const removeBookmark = (articleId: string) => {
        setBookmarks(prev => prev.filter(b => b.id !== articleId));
    };

    const toggleBookmark = (article: NewsArticle) => {
        if (isBookmarked(article.id)) {
            removeBookmark(article.id);
        } else {
            addBookmark(article);
        }
    };

    const isBookmarked = (articleId: string) => {
        return bookmarks.some(b => b.id === articleId);
    };

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        toggleBookmark,
        isBookmarked,
        isLoaded
    };
}
