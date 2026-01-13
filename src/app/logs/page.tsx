"use client";

import Link from "next/link";
import { Box, Button } from "@mui/material";
import { Terminal as TerminalIcon } from "@mui/icons-material";
import LogsHeader from "@/components/logs/LogsHeader";
import LogsTable from "@/components/logs/LogsTable";

export default function LogsPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <LogsHeader />

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          component={Link}
          href="/terminal"
          variant="contained"
          startIcon={<TerminalIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            bgcolor: "#1e1e1e",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          Ouvrir le Terminal Système
        </Button>
      </Box>

      <LogsTable />
    </Box>
  );
}
