"use client";

import { Activity, ShieldCheck, Wifi, Server, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function StatusHeader() {
    const { data: session } = useSession();

    return (
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 animate-in slide-in-from-top duration-700">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <Activity className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">System Terminal</h1>
                    <p className="text-white/40 text-xs flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Vérification de l'infrastructure en direct
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium text-white/80">{session?.user?.name} (Dev)</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <Server className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium text-white/80">API v1.4.2</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <Wifi className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium text-white/80">LAT: 12ms</span>
                </div>

                <button
                    onClick={() => signOut()}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-full transition-all"
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
