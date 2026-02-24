import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Shield, BarChart3, MapPin, Trophy, ArrowRight, Users, Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { label: "Verified NGOs", value: "30+", icon: Building2 },
  { label: "Donors", value: "1,500+", icon: Users },
  { label: "Raised (NPR)", value: "50L+", icon: Heart },
  { label: "Communities", value: "75+", icon: Globe },
];

const features = [
  {
    icon: Shield,
    title: "Verified Organizations",
    description: "Every NGO on our platform undergoes a thorough vetting process to ensure credibility and legitimacy.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Track exactly how your donation is being used with receipts, progress updates, and photo evidence.",
  },
  {
    icon: MapPin,
    title: "Interactive Map",
    description: "Discover verified NGOs and community projects near you through our interactive map interface.",
  },
  {
    icon: Trophy,
    title: "Gamification & Rewards",
    description: "Earn badges, points, and climb the leaderboard as you contribute to making Nepal better.",
  },
];

const steps = [
  { step: "01", title: "Explore", description: "Browse verified NGOs and projects across Nepal by cause, location, or need." },
  { step: "02", title: "Donate", description: "Make secure one-time or recurring donations through trusted payment gateways." },
  { step: "03", title: "Track", description: "Follow your donation's journey with real-time updates, photos, and impact reports." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Nepal community" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-6 backdrop-blur-sm border border-secondary/20">
              Transparent Giving for Nepal 🇳🇵
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6">
              Every Donation <br />
              <span className="text-secondary">Tells a Story</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              DanaDisha connects generous hearts with verified NGOs across Nepal. Track your impact in real-time and see exactly how your contribution changes lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gold-gradient text-primary-foreground hover:opacity-90 shadow-warm text-base px-8">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-serif font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Why Choose DanaDisha?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We bridge the trust gap in Nepal's philanthropic ecosystem with technology and transparency.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-warm transition-shadow group"
              >
                <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-sans">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three simple steps to make a meaningful impact.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-5xl font-serif font-bold text-gradient-primary mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2 font-sans">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="bg-hero-gradient rounded-2xl p-10 md:p-16 text-center shadow-warm"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Join thousands of donors who are changing lives across Nepal with transparent, trustworthy giving.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:opacity-90 text-base px-8 shadow-warm">
                Join Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
