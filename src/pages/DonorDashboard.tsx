import { motion } from "framer-motion";
import { Heart, TrendingUp, Calendar, Award, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { mockDonations, mockBadges, mockNGOs } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jun", amount: 0 },
  { month: "Jul", amount: 0 },
  { month: "Aug", amount: 5000 },
  { month: "Sep", amount: 3000 },
  { month: "Oct", amount: 10000 },
  { month: "Nov", amount: 7500 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const DonorDashboard = () => {
  const totalDonated = mockDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalNGOs = new Set(mockDonations.map((d) => d.ngoName)).size;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-1">Welcome Back, Donor! 👋</h1>
        <p className="text-muted-foreground">Track your contributions and see your impact.</p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Donated", value: `NPR ${(totalDonated / 1000).toFixed(0)}K`, icon: Heart, gradient: "bg-hero-gradient" },
          { label: "NGOs Supported", value: totalNGOs.toString(), icon: TrendingUp, gradient: "bg-gold-gradient" },
          { label: "Donations", value: mockDonations.length.toString(), icon: Calendar, gradient: "bg-hero-gradient" },
          { label: "Badges Earned", value: mockBadges.filter((b) => b.earned).length.toString(), icon: Award, gradient: "bg-gold-gradient" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="p-5 rounded-xl bg-card border border-border shadow-card hover:shadow-warm transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.gradient} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-2xl font-serif font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Donation Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl bg-card border border-border shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif font-bold text-foreground">Donation Trends</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                Last 6 months
              </Badge>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 45%, 32%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(152, 45%, 32%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(150, 10%, 45%)" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(40, 25%, 97%)",
                      border: "1px solid hsl(40, 15%, 88%)",
                      borderRadius: "0.5rem",
                      fontSize: "0.75rem",
                    }}
                    formatter={(value: number) => [`NPR ${value.toLocaleString()}`, "Amount"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(152, 45%, 32%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Donations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif font-bold text-foreground">Recent Donations</h2>
              <Link to="/my-donations">
                <Button variant="ghost" size="sm" className="text-primary text-xs">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {mockDonations.slice(0, 3).map((d, i) => (
                <motion.div
                  key={d.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="flex items-center justify-between p-4 rounded-xl bg-card border border-border shadow-card hover:shadow-warm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center font-serif font-bold text-primary-foreground">
                      {d.ngoName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">{d.ngoName}</div>
                      <div className="text-xs text-muted-foreground">{d.project}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">NPR {d.amount.toLocaleString()}</div>
                    <Badge
                      variant="secondary"
                      className={`text-xs border-0 ${
                        d.status === "completed"
                          ? "bg-primary/10 text-primary"
                          : d.status === "recurring"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {d.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Your Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-hero-gradient shadow-warm"
          >
            <h3 className="font-serif font-bold text-primary-foreground mb-4">Your Impact</h3>
            <div className="space-y-4">
              {[
                { label: "Education", value: 60 },
                { label: "Healthcare", value: 25 },
                { label: "Environment", value: 15 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-primary-foreground/80 mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5 bg-primary-foreground/20" />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-primary-foreground/70">
              <ArrowUpRight className="w-3 h-3" /> 3 communities impacted
            </div>
          </motion.div>

          {/* Badges Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl bg-card border border-border shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-foreground">Your Badges</h3>
              <Link to="/badges">
                <Button variant="ghost" size="sm" className="text-primary text-xs">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mockBadges.slice(0, 6).map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className={`p-3 rounded-lg border text-center ${
                    badge.earned
                      ? "bg-card border-primary/20 shadow-card"
                      : "bg-muted/50 border-border opacity-40"
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-[10px] font-semibold text-foreground leading-tight">{badge.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommended NGO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-xl bg-gold-gradient shadow-warm"
          >
            <h3 className="font-serif font-bold text-primary-foreground mb-3">Recommended for You</h3>
            <div className="space-y-3">
              {mockNGOs.slice(0, 2).map((ngo) => (
                <Link key={ngo.id} to={`/ngos/${ngo.id}`} className="block">
                  <div className="p-3 rounded-lg bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors">
                    <div className="font-medium text-sm text-primary-foreground">{ngo.name}</div>
                    <div className="text-xs text-primary-foreground/70">{ngo.category} · {ngo.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
