import { motion } from "framer-motion";
import { Activity, Bot, Wrench, Brain, ChevronRight } from "lucide-react";

interface LogEntry {
  agent: string;
  task: string;
  reasoning: string;
  tools: string[];
  confidence: number;
  nextAction: string;
  time: string;
}

const logs: LogEntry[] = [
  {
    agent: "Job Intelligence",
    task: "Scanning LinkedIn & Indeed for Senior Backend roles in Berlin",
    reasoning: "Filtering by 3+ years Python/Go experience, remote-first companies with >50 employees",
    tools: ["LinkedIn API", "Indeed Scraper", "Company DB"],
    confidence: 92,
    nextAction: "Pass 47 filtered listings to Matching Engine",
    time: "2s ago",
  },
  {
    agent: "Profile Analyzer",
    task: "Updated skill matrix from latest CV upload",
    reasoning: "Detected 2 new certifications, adjusted competency scores for cloud infrastructure",
    tools: ["CV Parser", "Skill Taxonomy"],
    confidence: 96,
    nextAction: "Re-calibrate matching weights",
    time: "1m ago",
  },
  {
    agent: "Outreach Agent",
    task: "Sent personalized email to Stripe HR",
    reasoning: "High match score (94%), company recently posted 3 similar roles, warm intro possible via mutual connection",
    tools: ["Email Composer", "Contact Finder", "Gmail API"],
    confidence: 88,
    nextAction: "Schedule follow-up in 3 days",
    time: "5m ago",
  },
  {
    agent: "Matching Engine",
    task: "Scored 23 new positions against profile",
    reasoning: "Applied ATS keyword optimization, weighted location preference and salary range",
    tools: ["Scoring Algorithm", "ATS Simulator"],
    confidence: 91,
    nextAction: "Queue top 8 for personalization",
    time: "12m ago",
  },
];

export function ActivityLog() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Activity className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Real-Time Agent Activity</h2>
          <p className="text-xs text-muted-foreground">AI reasoning & execution log</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-lg bg-secondary/30 p-4 border border-border/30 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bot className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">{log.agent}</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{log.time}</span>
            </div>

            <p className="text-xs text-foreground/90 mb-2">{log.task}</p>

            <div className="rounded-md bg-background/50 p-2.5 mb-2">
              <div className="flex items-center gap-1 mb-1">
                <Brain className="h-3 w-3 text-primary/70" />
                <span className="text-[10px] text-primary/70 font-medium uppercase tracking-wider">Reasoning</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{log.reasoning}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Wrench className="h-3 w-3 text-muted-foreground" />
                {log.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-secondary px-2 py-0.5 text-[9px] text-muted-foreground">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-success">{log.confidence}%</span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1 text-[10px] text-primary/60">
              <ChevronRight className="h-3 w-3" />
              <span>{log.nextAction}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
