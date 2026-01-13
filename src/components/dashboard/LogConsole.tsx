"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Copy, Trash2, Search } from "lucide-react";

interface LogEntry {
    timestamp: string;
    level: "INFO" | "WARN" | "ERROR" | "DEBUG";
    message: string;
}

export function LogConsole() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulated stream
        const interval = setInterval(() => {
            const levels: ("INFO" | "WARN" | "ERROR" | "DEBUG")[] = ["INFO", "DEBUG", "WARN"];
            const messages = [
                "Request to /api/v1/orders success",
                "Cache hit for products_list",
                "Database connection established",
                "NextAuth session verified",
                "Asset compilation finished"
            ];

            const newLog: LogEntry = {
                timestamp: new Date().toLocaleTimeString(),
                level: levels[Math.floor(Math.random() * levels.length)],
                message: messages[Math.floor(Math.random() * messages.length)]
            };

            setLogs(prev => [...prev.slice(-49), newLog]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-[#0f0f12] border border-white/10 rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-white/40" />
                    <h2 className="text-sm font-bold text-white tracking-wide uppercase">System Logs</h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative group mr-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-blue-500" />
                        <input
                            type="text"
                            placeholder="Filtrer..."
                            className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/30 hover:text-white transition-colors">
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setLogs([])}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/30 hover:text-white transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="p-6 h-[400px] overflow-y-auto font-mono text-sm space-y-2 custom-scrollbar"
            >
                {logs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-white/10">
                        <Terminal className="w-8 h-8" />
                        <p>Aucun log actif. En attente de données...</p>
                    </div>
                )}
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 group hover:bg-white/[0.02] -mx-2 px-2 py-0.5 rounded transition-colors">
                        <span className="text-white/20 select-none whitespace-nowrap">[{log.timestamp}]</span>
                        <span className={`font-bold whitespace-nowrap ${log.level === 'ERROR' ? 'text-red-500' :
                                log.level === 'WARN' ? 'text-yellow-500' :
                                    log.level === 'INFO' ? 'text-blue-400' : 'text-purple-400'
                            }`}>
                            {log.level.padEnd(5)}
                        </span>
                        <span className="text-white/70">{log.message}</span>
                    </div>
                ))}
            </div>

            <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] text-white/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        INFO
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        WARN
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-white/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        ERROR
                    </div>
                </div>
                <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Stream: active</span>
            </div>
        </div>
    );
}
