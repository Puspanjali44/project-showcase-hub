import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, FileText, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { mockNGOs } from "@/data/mockData";

const NGODashboard = () => {
  const { user } = useAuth();
  // Using first mock NGO as example data for the dashboard
  const ngo = mockNGOs[0];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <section className="bg-gold-gradient py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-serif font-bold text-primary-foreground mb-2">
              NGO Dashboard 🏢
            </h1>
            <p className="text-primary-foreground/80">
              Manage your organization, projects, and donations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Raised", value: `NPR ${(ngo.raised / 1000).toFixed(0)}K`, icon: TrendingUp, gradient: "bg-hero-gradient" },
              { label: "Total Donors", value: ngo.donors.toString(), icon: Users, gradient: "bg-gold-gradient" },
              { label: "Active Projects", value: ngo.projects.length.toString(), icon: FileText, gradient: "bg-hero-gradient" },
              { label: "Verification", value: ngo.verified ? "Verified" : "Pending", icon: Building2, gradient: "bg-gold-gradient" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border shadow-card"
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
            {/* Projects */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-bold text-foreground">Your Projects</h2>
                <Button size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                  <Plus className="w-4 h-4 mr-1" /> New Project
                </Button>
              </div>
              <div className="space-y-4">
                {ngo.projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-card border border-border shadow-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>NPR {(project.raised / 1000).toFixed(0)}K raised</span>
                      <span>Goal: NPR {(project.goal / 1000).toFixed(0)}K</span>
                    </div>
                    <Progress value={project.progress} className="h-2 mb-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{project.updatesCount} updates posted</span>
                      <Button variant="ghost" size="sm" className="text-xs text-primary">
                        <Eye className="w-3 h-3 mr-1" /> View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Organization Info */}
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <h3 className="font-serif font-bold text-foreground mb-4">Organization Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">{ngo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-foreground">{ngo.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">{ngo.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className="bg-primary/10 text-primary border-0 text-xs">
                      {ngo.verified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Recent Donations */}
              <div className="p-6 rounded-xl bg-hero-gradient shadow-warm">
                <h3 className="font-serif font-bold text-primary-foreground mb-4">Funding Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-primary-foreground/80 mb-1">
                      <span>Overall</span>
                      <span>{Math.round((ngo.raised / ngo.goal) * 100)}%</span>
                    </div>
                    <Progress value={(ngo.raised / ngo.goal) * 100} className="h-1.5 bg-primary-foreground/20" />
                  </div>
                  <div className="text-xs text-primary-foreground/70 mt-3">
                    NPR {(ngo.raised / 1000).toFixed(0)}K of NPR {(ngo.goal / 1000).toFixed(0)}K goal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NGODashboard;
