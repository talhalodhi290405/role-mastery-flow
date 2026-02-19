import { motion } from "framer-motion";
import { Bot, CheckCircle2, Clock, Loader2 } from "lucide-react";

type AgentStatus = "running" | "waiting" | "completed";

interface AgentNode {
  name: string;
  status: AgentStatus;
  tokens: string;
  time: string;
}

const agents: AgentNode[] = [
  { name: "Profile Analyzer", status: "completed", tokens: "2.1k", time: "12s" },
  { name: "Job Intelligence", status: "running", tokens: "8.4k", time: "34s" },
  { name: "Matching Engine", status: "waiting", tokens: "—", time: "—" },
  { name: "Personalization Agent", status: "waiting", tokens: "—", time: "—" },
  { name: "Outreach Agent", status: "waiting", tokens: "—", time: "—" },
  { name: "Interview Prep Agent", status: "waiting", tokens: "—", time: "—" },
];

const statusConfig: Record<AgentStatus, { dot: string; label: string; icon: typeof CheckCircle2; color: string }> = {
  running: { dot: "bg-success animate-pulse", label: "Running", icon: Loader2, color: "text-success" },
  waiting: { dot: "bg-warning", label: "Waiting", icon: Clock, color: "text-warning" },
  completed: { dot: "bg-primary", label: "Completed", icon: CheckCircle2, color: "text-primary" },
};

export function AgentWorkflow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Live Agent Workflow</h2>
          <p className="text-xs text-muted-foreground">Real-time pipeline status</p>
        </div>
      </div>

      <div className="space-y-2">
        {agents.map((agent, i) => {
          const cfg = statusConfig[agent.status];
          const StatusIcon = cfg.icon;
          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
                agent.status === "running" ? "bg-success/5 border border-success/20" : "bg-secondary/30"
              }`}
            >
              <div className="relative">
                <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                {i < agents.length - 1 && (
                  <div className="absolute top-3 left-[3px] w-0.5 h-6 bg-border/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <StatusIcon className={`h-3 w-3 ${cfg.color} ${agent.status === "running" ? "animate-spin" : ""}`} />
                  <span className="text-xs font-medium text-foreground">{agent.name}</span>
                </div>
                <span className={`text-[10px] ${cfg.color}`}>{cfg.label}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-muted-foreground">{agent.tokens} tokens</p>
                <p className="text-[10px] font-mono text-muted-foreground">{agent.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
