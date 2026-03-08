import { motion } from "framer-motion";
import { TrendingUp, FolderOpen, Users, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { mockNGOs } from "@/data/mockData";

const NGODashboard = () => {
  const { user } = useAuth();
  const ngo = mockNGOs[0];

  const stats = [
    { label: "TOTAL RAISED", value: `Rs. ${(ngo.raised / 1000).toFixed(0)}K`, icon: TrendingUp },
    { label: "ACTIVE PROJECTS", value: ngo.projects.length.toString(), icon: FolderOpen },
    { label: "TOTAL DONORS", value: ngo.donors.toString(), icon: Users },
    { label: "AVG. DONATION", value: `Rs. ${Math.round(ngo.raised / ngo.donors).toLocaleString()}`, icon: DollarSign },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold text-foreground mb-8"
      >
        NGO Dashboard
      </motion.h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-xl bg-card border border-border text-center"
          >
            <div className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              {stat.label}
            </div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Funding Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-serif font-bold text-foreground mb-4">Project Funding Overview</h2>
        <div className="space-y-4">
          {ngo.projects.map((project, i) => {
            const pct = Math.round((project.raised / project.goal) * 100);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="p-5 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{project.title}</h3>
                  <span className="text-sm font-medium text-muted-foreground">{pct}%</span>
                </div>
                <Progress value={pct} className="h-1.5 mb-2" />
                <p className="text-xs text-muted-foreground">
                  Rs. {project.raised.toLocaleString()} raised of Rs. {project.goal.toLocaleString()}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default NGODashboard;
