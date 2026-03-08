import { motion } from "framer-motion";
import { Heart, Download, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockDonations } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const totalDonated = mockDonations.reduce((sum, d) => sum + d.amount, 0);

const monthlyData = [
  { month: "Aug", amount: 5000 },
  { month: "Sep", amount: 3000 },
  { month: "Oct", amount: 10000 },
  { month: "Nov", amount: 7500 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

const MyDonations = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-1">My Donations</h1>
        <p className="text-muted-foreground">View and manage all your contributions.</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="p-6 rounded-xl bg-hero-gradient shadow-warm">
          <div className="text-xs uppercase tracking-wider text-primary-foreground/70 mb-1">Total Donated</div>
          <div className="text-3xl font-serif font-bold text-primary-foreground">NPR {totalDonated.toLocaleString()}</div>
          <div className="text-xs text-primary-foreground/60 mt-1">{mockDonations.length} donation{mockDonations.length !== 1 ? "s" : ""} total</div>
        </motion.div>
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp} className="p-6 rounded-xl bg-card border border-border shadow-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">This Month</div>
          <div className="text-3xl font-serif font-bold text-foreground">NPR 7,500</div>
          <div className="flex items-center gap-1 text-xs text-primary mt-1">
            <span>↑ 25% from last month</span>
          </div>
        </motion.div>
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="p-6 rounded-xl bg-card border border-border shadow-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Recurring</div>
          <div className="text-3xl font-serif font-bold text-foreground">{mockDonations.filter((d) => d.status === "recurring").length}</div>
          <div className="text-xs text-muted-foreground mt-1">Active recurring donations</div>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-6 rounded-xl bg-card border border-border shadow-card mb-8"
      >
        <h2 className="text-lg font-serif font-bold text-foreground mb-4">Monthly Giving</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
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
              <Bar dataKey="amount" fill="hsl(152, 45%, 32%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Donation List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-serif font-bold text-foreground">All Donations</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Filter className="w-3 h-3 mr-1" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="w-3 h-3 mr-1" /> Export
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {mockDonations.map((d, i) => (
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
                  <div className="font-medium text-sm text-foreground">{d.project}</div>
                  <div className="text-xs text-muted-foreground">NGO: {d.ngoName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">NPR {d.amount.toLocaleString()}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{new Date(d.date).toLocaleDateString()}</span>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDonations;
