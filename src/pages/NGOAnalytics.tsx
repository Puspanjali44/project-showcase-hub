import { motion } from "framer-motion";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockNGOs } from "@/data/mockData";

const monthlyData = [
  { month: "Jul", donations: 45000, donors: 12 },
  { month: "Aug", donations: 62000, donors: 18 },
  { month: "Sep", donations: 58000, donors: 15 },
  { month: "Oct", donations: 91000, donors: 28 },
  { month: "Nov", donations: 78000, donors: 22 },
  { month: "Dec", donations: 105000, donors: 35 },
];

const NGOAnalytics = () => {
  const ngo = mockNGOs[0];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold text-foreground mb-8"
      >
        Analytics
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-card border border-border p-6"
        >
          <h2 className="font-serif font-bold text-foreground mb-4">Donation Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="donations"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.15)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Donor Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-card border border-border p-6"
        >
          <h2 className="font-serif font-bold text-foreground mb-4">Donor Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="donors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Project Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-xl bg-card border border-border p-6"
      >
        <h2 className="font-serif font-bold text-foreground mb-4">Project Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground font-medium">Project</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Raised</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Goal</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Progress</th>
              </tr>
            </thead>
            <tbody>
              {ngo.projects.map((p) => (
                <tr key={p.id} className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">{p.title}</td>
                  <td className="py-3 text-right text-muted-foreground">Rs. {p.raised.toLocaleString()}</td>
                  <td className="py-3 text-right text-muted-foreground">Rs. {p.goal.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium text-primary">{p.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default NGOAnalytics;
