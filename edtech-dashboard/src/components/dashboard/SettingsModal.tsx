"use client";

import { useState, useEffect } from "react";
import { X, Key, Save, Trash2, ExternalLink } from "lucide-react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApiKeyChange: (key: string | null) => void;
}

export function SettingsModal({ isOpen, onClose, onApiKeyChange }: SettingsModalProps) {
    const [apiKey, setApiKey] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const storedKey = localStorage.getItem("gemini_api_key");
            if (storedKey) {
                setApiKey(storedKey);
                setIsSaved(true);
            }
        }
    }, [isOpen]);

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem("gemini_api_key", apiKey.trim());
            setIsSaved(true);
            onApiKeyChange(apiKey.trim());
            onClose();
        }
    };

    const handleDelete = () => {
        localStorage.removeItem("gemini_api_key");
        setApiKey("");
        setIsSaved(false);
        onApiKeyChange(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                        <Key className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">API Settings</h2>
                        <p className="text-sm text-slate-500">Configure your AI Intelligence</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Google Gemini API Key
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="sk-..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-mono text-sm"
                            />
                            <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        </div>
                        <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            Get your key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google AI Studio</a>
                        </p>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                        {isSaved ? (
                            <button
                                onClick={handleDelete}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                            >
                                <Trash2 className="h-4 w-4" />
                                Remove Key
                            </button>
                        ) : null}

                        <button
                            onClick={handleSave}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm shadow-sm"
                        >
                            <Save className="h-4 w-4" />
                            Save Configuration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
