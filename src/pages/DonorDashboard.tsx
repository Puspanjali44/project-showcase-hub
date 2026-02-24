import { motion } from "framer-motion";
import { Heart, TrendingUp, Calendar, Award, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockDonations, mockBadges } from "@/data/mockData";

const DonorDashboard = () => {
  const totalDonated = mockDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalNGOs = new Set(mockDonations.map((d) => d.ngoName)).size;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-hero-gradient py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-serif font-bold text-primary-foreground mb-2">Welcome back, Donor! 👋</h1>
            <p className="text-primary-foreground/80">Track your contributions and see your impact.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Donated", value: `NPR ${(totalDonated / 1000).toFixed(0)}K`, icon: Heart, color: "bg-hero-gradient" },
              { label: "NGOs Supported", value: totalNGOs.toString(), icon: TrendingUp, color: "bg-gold-gradient" },
              { label: "Donations", value: mockDonations.length.toString(), icon: Calendar, color: "bg-hero-gradient" },
              { label: "Badges Earned", value: mockBadges.filter((b) => b.earned).length.toString(), icon: Award, color: "bg-gold-gradient" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border shadow-card"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-2xl font-serif font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation History */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-serif font-bold text-foreground mb-4">Donation History</h2>
              <div className="space-y-3">
                {mockDonations.map((d, i) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-card border border-border shadow-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-serif font-bold text-foreground">
                        {d.ngoName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-foreground">{d.ngoName}</div>
                        <div className="text-xs text-muted-foreground">{d.project}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">NPR {d.amount.toLocaleString()}</div>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            d.status === "completed"
                              ? "bg-primary/10 text-primary"
                              : d.status === "recurring"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                          } border-0`}
                        >
                          {d.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Badges & Gamification */}
            <div>
              <h2 className="text-xl font-serif font-bold text-foreground mb-4">Your Badges</h2>
              <div className="grid grid-cols-2 gap-3">
                {mockBadges.map((badge, i) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className={`p-4 rounded-xl border text-center ${
                      badge.earned
                        ? "bg-card border-primary/20 shadow-card"
                        : "bg-muted/50 border-border opacity-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-xs font-semibold text-foreground">{badge.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{badge.description}</div>
                  </motion.div>
                ))}
              </div>

              {/* Impact summary */}
              <div className="mt-6 p-5 rounded-xl bg-hero-gradient shadow-warm">
                <h3 className="font-serif font-bold text-primary-foreground mb-3">Your Impact</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-primary-foreground/80 mb-1">
                      <span>Education</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-1.5 bg-primary-foreground/20" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-primary-foreground/80 mb-1">
                      <span>Healthcare</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-1.5 bg-primary-foreground/20" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-primary-foreground/80 mb-1">
                      <span>Environment</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-1.5 bg-primary-foreground/20" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-primary-foreground/70">
                  <ArrowUpRight className="w-3 h-3" /> 3 communities impacted
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonorDashboard;
