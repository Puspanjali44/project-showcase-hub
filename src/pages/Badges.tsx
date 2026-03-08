import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { mockBadges } from "@/data/mockData";

const earnedCount = mockBadges.filter((b) => b.earned).length;
const totalCount = mockBadges.length;

const Badges = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-1">Badges</h1>
        <p className="text-muted-foreground">Earn badges by making donations and supporting projects.</p>
      </motion.div>

      {/* Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-xl bg-hero-gradient shadow-warm mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif font-bold text-primary-foreground">Badge Progress</h2>
          <span className="text-sm text-primary-foreground/80">{earnedCount} / {totalCount} earned</span>
        </div>
        <Progress value={(earnedCount / totalCount) * 100} className="h-2.5 bg-primary-foreground/20" />
        <p className="text-xs text-primary-foreground/60 mt-2">
          Keep donating to unlock more achievements!
        </p>
      </motion.div>

      {/* Earned Badges */}
      <div className="mb-10">
        <h2 className="text-lg font-serif font-bold text-foreground mb-4">Earned</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockBadges
            .filter((b) => b.earned)
            .map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl bg-card border border-primary/20 shadow-card hover:shadow-warm transition-shadow text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{badge.icon}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{badge.name}</div>
                <div className="text-xs text-muted-foreground">{badge.description}</div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <h2 className="text-lg font-serif font-bold text-foreground mb-4">Locked</h2>
        {mockBadges.filter((b) => !b.earned).length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-12 h-12 text-secondary mx-auto mb-3" />
            <p className="font-serif font-bold text-foreground">All badges earned!</p>
            <p className="text-sm text-muted-foreground">You're a true champion.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockBadges
              .filter((b) => !b.earned)
              .map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="p-6 rounded-xl bg-muted/50 border border-border opacity-60 text-center"
                >
                  <div className="text-4xl mb-3 grayscale">{badge.icon}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Badges;
