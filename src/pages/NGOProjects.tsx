import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockNGOs } from "@/data/mockData";

const NGOProjects = () => {
  const ngo = mockNGOs[0];

  const projectStatuses = ["Active", "Completed", "Active"];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold text-foreground mb-8"
      >
        Projects
      </motion.h1>

      <div className="space-y-4">
        {ngo.projects.map((project, i) => {
          const status = projectStatuses[i] || "Active";
          const pct = Math.round((project.raised / project.goal) * 100);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl bg-card border border-border"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-foreground text-lg">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    status === "Active"
                      ? "bg-primary/10 text-primary border-0"
                      : "bg-accent text-accent-foreground border-0"
                  }
                >
                  {status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 inline-block" />}
                  {status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Rs. {project.raised.toLocaleString()} raised of Rs. {project.goal.toLocaleString()}
              </p>
              <Progress value={pct} className="h-1.5 mb-3" />
              {status === "Active" && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs text-destructive border-destructive/30 hover:bg-destructive/10">
                    Pause
                  </Button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NGOProjects;
