import { motion } from "framer-motion";
import { Heart, Shield, Eye, Users, Target, Lightbulb } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust & Verification", description: "Every organization undergoes thorough verification before listing on our platform." },
  { icon: Eye, title: "Full Transparency", description: "Real-time tracking with receipts, photos, and progress reports for every donation." },
  { icon: Users, title: "Community First", description: "We prioritize local communities and ensure donations reach those who need them most." },
  { icon: Target, title: "Impact Focused", description: "Every feature is designed to maximize the positive impact of your contributions." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => (
  <div className="min-h-screen pt-20">
    {/* Hero */}
    <section className="bg-hero-gradient py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">About DanaDisha</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
            Reimagining Philanthropy <br />in Nepal
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            DanaDisha was born from the belief that every act of generosity deserves transparency, trust, and impact. We bridge the gap between willing donors and verified organizations across Nepal.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center mb-4">
              <Lightbulb className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create a centralized, transparent donation management system that connects generous donors with verified NGOs across Nepal. We aim to restore confidence in charitable giving by providing real-time tracking, verified impact reports, and a community-driven platform.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="w-14 h-14 rounded-xl bg-hero-gradient flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Problem We Solve</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nepal's donation ecosystem is fragmented and lacks transparency. Donors struggle to find credible organizations, and NGOs lack tools to demonstrate their impact. DanaDisha solves this by creating a unified platform with verification, tracking, and accountability built in.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-3">Our Values</h2>
          <p className="text-muted-foreground max-w-md mx-auto">The principles that guide everything we do.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 rounded-xl bg-card border border-border shadow-card text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-hero-gradient flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 font-sans">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Tech Stack */}
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Built With Modern Technology</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          DanaDisha leverages cutting-edge technologies to deliver a fast, secure, and reliable platform.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["React.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Khalti Payment", "Google Maps API"].map((tech) => (
            <span key={tech} className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
