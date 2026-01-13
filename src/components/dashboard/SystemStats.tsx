"use client";

import { Cpu, Database, HardDrive, Zap, Network } from "lucide-react";

interface StatItemProps {
    label: string;
    value: string;
    subValue: string;
    progress: number;
    icon: any;
    color: string;
}

function StatItem({ label, value, subValue, progress, icon: Icon, color }: StatItemProps) {
    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl transition-all ${color} group-hover:scale-110`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-white tracking-tight">{value}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{subValue}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white/50">{label}</span>
                    <span className="text-xs font-mono text-white/40">{progress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ease-out ${color.replace('bg-', 'bg-')}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export function SystemStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-in zoom-in duration-700 delay-200">
            <StatItem
                label="CPU Load"
                value="24.8%"
                subValue="Intel Xeon Platinum"
                progress={24}
                icon={Cpu}
                color="bg-blue-600"
            />
            <StatItem
                label="RAM Usage"
                value="1.2GB"
                subValue="8GB Dedicated"
                progress={15}
                icon={Zap}
                color="bg-purple-600"
            />
            <StatItem
                label="Storage"
                value="42GB"
                subValue="Free: 128GB"
                progress={32}
                icon={HardDrive}
                color="bg-emerald-600"
            />
            <StatItem
                label="API Traffic"
                value="842"
                subValue="Requests / min"
                progress={68}
                icon={Network}
                color="bg-orange-600"
            />
        </div>
    );
}
