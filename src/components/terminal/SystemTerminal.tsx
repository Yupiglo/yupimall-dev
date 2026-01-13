"use client";

import { useState, useEffect, useRef } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Chip,
    Stack,
    Divider,
    Alert,
} from "@mui/material";
import {
    Terminal as TerminalIcon,
    PlayArrow,
    Clear,
    ContentCopy,
    Memory,
    Storage,
    Speed,
    Wifi,
} from "@mui/icons-material";

interface LogEntry {
    id: number;
    timestamp: string;
    type: "info" | "success" | "warning" | "error" | "command";
    message: string;
}

export default function SystemTerminal() {
    const [command, setCommand] = useState("");
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const logContainerRef = useRef<HTMLDivElement>(null);

    // Simulated system stats
    const [stats, setStats] = useState({
        cpu: 23,
        ram: 67,
        disk: 45,
        network: 128,
    });

    useEffect(() => {
        // Initial logs
        setLogs([
            { id: 1, timestamp: new Date().toISOString(), type: "info", message: "System initialized" },
            { id: 2, timestamp: new Date().toISOString(), type: "success", message: "All services running" },
            { id: 3, timestamp: new Date().toISOString(), type: "info", message: "Terminal ready for commands" },
        ]);

        // Simulate stats updates
        const interval = setInterval(() => {
            setStats({
                cpu: Math.floor(Math.random() * 40 + 10),
                ram: Math.floor(Math.random() * 30 + 50),
                disk: Math.floor(Math.random() * 20 + 40),
                network: Math.floor(Math.random() * 200 + 50),
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const executeCommand = () => {
        if (!command.trim()) return;

        setIsProcessing(true);
        const newLog: LogEntry = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            type: "command",
            message: `$ ${command}`,
        };
        setLogs((prev) => [...prev, newLog]);

        // Simulate command execution
        setTimeout(() => {
            let response: LogEntry;

            switch (command.toLowerCase().trim()) {
                case "status":
                    response = {
                        id: Date.now() + 1,
                        timestamp: new Date().toISOString(),
                        type: "success",
                        message: `CPU: ${stats.cpu}% | RAM: ${stats.ram}% | Disk: ${stats.disk}% | Network: ${stats.network}MB/s`,
                    };
                    break;
                case "clear":
                    setLogs([]);
                    setCommand("");
                    setIsProcessing(false);
                    return;
                case "help":
                    response = {
                        id: Date.now() + 1,
                        timestamp: new Date().toISOString(),
                        type: "info",
                        message: "Available commands: status, clear, help, users, orders, cache:clear, logs:tail",
                    };
                    break;
                case "users":
                    response = {
                        id: Date.now() + 1,
                        timestamp: new Date().toISOString(),
                        type: "info",
                        message: "Active users: 342 | Registered today: 18 | Online now: 56",
                    };
                    break;
                case "orders":
                    response = {
                        id: Date.now() + 1,
                        timestamp: new Date().toISOString(),
                        type: "info",
                        message: "Pending: 45 | Processing: 23 | Shipped: 156 | Delivered: 1,234",
                    };
                    break;
                case "cache:clear":
                    response = {
                        id: Date.now() + 1,
                        timestamp: new Date().toISOString(),
                        type: "success",
                        message: "Cache cleared successfully. 128MB freed.",
                    };
                    break;
                case "logs:tail":
                    response = {
                        id: Date.now() + 1,
                        timestamp: new Date().toISOString(),
                        type: "info",
                        message: "[INFO] API request /api/v1/products - 200 OK (45ms)\n[INFO] API request /api/v1/orders - 200 OK (67ms)\n[WARN] High memory usage detected",
                    };
                    break;
                default:
                    response = {
                        id: Date.now() + 1,
                        timestamp: new Date().toISOString(),
                        type: "error",
                        message: `Command not found: ${command}. Type 'help' for available commands.`,
                    };
            }

            setLogs((prev) => [...prev, response]);
            setCommand("");
            setIsProcessing(false);
        }, 500);
    };

    const getLogColor = (type: string) => {
        switch (type) {
            case "success": return "#4caf50";
            case "warning": return "#ff9800";
            case "error": return "#f44336";
            case "command": return "#2196f3";
            default: return "#9e9e9e";
        }
    };

    const copyLogs = () => {
        const text = logs.map((l) => `[${l.timestamp}] ${l.message}`).join("\n");
        navigator.clipboard.writeText(text);
    };

    return (
        <Box sx={{ mb: 4 }}>
            {/* Stats Bar */}
            <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
                <Chip
                    icon={<Speed />}
                    label={`CPU: ${stats.cpu}%`}
                    color={stats.cpu > 80 ? "error" : "default"}
                    variant="outlined"
                />
                <Chip
                    icon={<Memory />}
                    label={`RAM: ${stats.ram}%`}
                    color={stats.ram > 85 ? "warning" : "default"}
                    variant="outlined"
                />
                <Chip
                    icon={<Storage />}
                    label={`Disk: ${stats.disk}%`}
                    variant="outlined"
                />
                <Chip
                    icon={<Wifi />}
                    label={`Net: ${stats.network}MB/s`}
                    variant="outlined"
                />
            </Stack>

            {/* Terminal Window */}
            <Paper
                sx={{
                    bgcolor: "#1e1e1e",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #333",
                }}
            >
                {/* Terminal Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        py: 1,
                        bgcolor: "#2d2d2d",
                        borderBottom: "1px solid #444",
                    }}
                >
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TerminalIcon sx={{ color: "#4caf50", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "#fff" }}>
                            YupiMall System Console
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <IconButton size="small" onClick={copyLogs} sx={{ color: "#888" }}>
                            <ContentCopy fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => setLogs([])} sx={{ color: "#888" }}>
                            <Clear fontSize="small" />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Log Output */}
                <Box
                    ref={logContainerRef}
                    sx={{
                        height: 300,
                        overflowY: "auto",
                        p: 2,
                        fontFamily: "monospace",
                        fontSize: 13,
                    }}
                >
                    {logs.map((log) => (
                        <Box key={log.id} sx={{ mb: 0.5 }}>
                            <Typography
                                component="span"
                                sx={{ color: "#666", fontSize: 12, mr: 1 }}
                            >
                                [{new Date(log.timestamp).toLocaleTimeString()}]
                            </Typography>
                            <Typography
                                component="span"
                                sx={{ color: getLogColor(log.type), whiteSpace: "pre-wrap" }}
                            >
                                {log.message}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Divider sx={{ borderColor: "#444" }} />

                {/* Command Input */}
                <Box sx={{ display: "flex", alignItems: "center", p: 1, bgcolor: "#252525" }}>
                    <Typography sx={{ color: "#4caf50", mr: 1, fontFamily: "monospace" }}>
                        $
                    </Typography>
                    <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter command..."
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && executeCommand()}
                        disabled={isProcessing}
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                color: "#fff",
                                fontFamily: "monospace",
                                fontSize: 14,
                            },
                        }}
                    />
                    <IconButton onClick={executeCommand} disabled={isProcessing} sx={{ color: "#4caf50" }}>
                        <PlayArrow />
                    </IconButton>
                </Box>
            </Paper>
        </Box>
    );
}
