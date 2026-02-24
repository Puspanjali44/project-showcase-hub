import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, MapPin, Users, Heart, ArrowLeft, Clock, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockNGOs } from "@/data/mockData";

const NGODetail = () => {
  const { id } = useParams();
  const ngo = mockNGOs.find((n) => n.id === id);

  if (!ngo) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">NGO Not Found</h1>
          <Link to="/ngos" className="text-primary hover:underline">← Back to Browse</Link>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round((ngo.raised / ngo.goal) * 100);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-hero-gradient py-12">
        <div className="container mx-auto px-4">
          <Link to="/ngos" className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Browse
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-background/20 flex items-center justify-center text-primary-foreground font-serif font-bold text-3xl backdrop-blur-sm">
              {ngo.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground">{ngo.name}</h1>
                {ngo.verified && (
                  <Badge className="bg-secondary/20 text-secondary border-0">
                    <Shield className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-primary-foreground/70 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ngo.location}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {ngo.donors} donors</span>
                <span>{ngo.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-xl font-serif font-bold text-foreground mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{ngo.description}</p>
              </motion.div>

              {/* Projects */}
              <div>
                <h2 className="text-xl font-serif font-bold text-foreground mb-4">Active Projects</h2>
                <div className="space-y-4">
                  {ngo.projects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-xl bg-card border border-border shadow-card"
                    >
                      <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>NPR {(project.raised / 1000).toFixed(0)}K raised</span>
                        <span>Goal: NPR {(project.goal / 1000).toFixed(0)}K</span>
                      </div>
                      <Progress value={project.progress} className="h-2 mb-3" />
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {project.updatesCount} updates</span>
                        <span className="flex items-center gap-1"><Image className="w-3 h-3" /> Photo evidence</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Donation Card */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 p-6 rounded-xl bg-card border border-border shadow-warm"
              >
                <h3 className="font-serif font-bold text-lg text-foreground mb-4">Support This Cause</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>NPR {(ngo.raised / 1000).toFixed(0)}K raised</span>
                    <span className="font-semibold text-foreground">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">Goal: NPR {(ngo.goal / 1000).toFixed(0)}K</div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[500, 1000, 5000].map((amt) => (
                    <button
                      key={amt}
                      className="py-2 rounded-lg border border-border text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors text-foreground"
                    >
                      NPR {amt}
                    </button>
                  ))}
                </div>

                <Button className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90 mb-3">
                  <Heart className="w-4 h-4 mr-2" /> Donate Now
                </Button>
                <Button variant="outline" className="w-full">
                  Set Up Recurring
                </Button>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  🔒 Secure payment via Khalti
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NGODetail;
