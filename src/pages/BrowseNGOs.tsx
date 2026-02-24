import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, MapPin, Shield, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNGOs } from "@/data/mockData";

const categories = ["All", "Education", "Healthcare", "Environment", "Women", "Disaster Relief", "Culture"];

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
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-hero-gradient py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
              Browse Verified NGOs
            </h1>
            <p className="text-primary-foreground/80 mb-6 max-w-lg">
              Discover trusted organizations making real impact across Nepal.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search NGOs by name or cause..."
                className="pl-10 bg-background/90 border-0"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ngo, i) => (
              <motion.div
                key={ngo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/ngos/${ngo.id}`} className="block">
                  <div className="rounded-xl bg-card border border-border shadow-card hover:shadow-warm transition-all p-6 h-full group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center text-primary-foreground font-serif font-bold text-lg">
                        {ngo.name.charAt(0)}
                      </div>
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
                      <MapPin className="w-3 h-3" /> {ngo.location} · {ngo.category}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{ngo.description}</p>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>NPR {(ngo.raised / 1000).toFixed(0)}K raised</span>
                        <span>Goal: NPR {(ngo.goal / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-hero-gradient rounded-full transition-all"
                          style={{ width: `${(ngo.raised / ngo.goal) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" /> {ngo.donors} donors
                      </div>
                      <span className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
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
      </section>
    </div>
  );
};

export default BrowseNGOs;
