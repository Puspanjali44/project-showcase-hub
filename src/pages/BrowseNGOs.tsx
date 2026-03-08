import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MapPin, Shield, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockNGOs } from "@/data/mockData";

const categories = ["All", "Education", "Healthcare", "Environment", "Women", "Disaster Relief", "Culture"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const BrowseNGOs = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = mockNGOs.filter((ngo) => {
    const matchesSearch = ngo.name.toLowerCase().includes(search.toLowerCase()) ||
      ngo.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || ngo.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-1">Browse NGOs</h1>
        <p className="text-muted-foreground mb-5">Discover verified organizations making a difference.</p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search NGOs by name or cause..."
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* NGO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((ngo, i) => (
          <motion.div
            key={ngo.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link to={`/ngos/${ngo.id}`} className="block">
              <div className="rounded-xl bg-card border border-border shadow-card hover:shadow-warm transition-all p-6 h-full group">
                {/* Cover placeholder */}
                <div className="h-32 rounded-lg bg-muted/50 mb-4 overflow-hidden flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-hero-gradient flex items-center justify-center text-primary-foreground font-serif font-bold text-2xl">
                    {ngo.name.charAt(0)}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{ngo.category}</span>
                  {ngo.verified && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                      <Shield className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1 font-sans group-hover:text-primary transition-colors">
                  {ngo.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" /> {ngo.location}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{ngo.description}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>NPR {(ngo.raised / 1000).toFixed(0)}K raised</span>
                    <span>{Math.round((ngo.raised / ngo.goal) * 100)}%</span>
                  </div>
                  <Progress value={(ngo.raised / ngo.goal) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" /> {ngo.donors} donors
                  </div>
                  <Button size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90 text-xs">
                    View Project <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No NGOs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseNGOs;
