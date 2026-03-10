import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  FolderPlus,
  Settings,
  BarChart3,
  Heart,
  Footprints,
} from "lucide-react";

const previewNav = [
  { title: "Dashboard", url: "/preview/ngo-dashboard", icon: LayoutDashboard },
  { title: "My Projects", url: "/preview/ngo-projects", icon: Building2 },
  { title: "Project Updates", url: "/preview/ngo-project-updates", icon: Footprints },
  { title: "Create Project", url: "/preview/ngo-create-project", icon: FolderPlus },
  { title: "Settings", url: "/preview/ngo-settings", icon: Settings },
  { title: "Analytics", url: "/preview/ngo-analytics", icon: BarChart3 },
];

const NGOPreviewLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-border">
          <Link to="/preview/ngo-dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold text-foreground">DanaDisha</span>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">NGO Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 mb-3">
            Navigation
          </p>
          <div className="space-y-1">
            {previewNav.map((item) => {
              const active = location.pathname === item.url;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary border-l-3 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-12 flex items-center border-b border-border bg-background/80 backdrop-blur-sm px-4 sticky top-0 z-30">
          <span className="text-xs text-muted-foreground bg-accent/50 px-2 py-1 rounded">Preview Mode</span>
        </header>
        <main className="flex-1">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default NGOPreviewLayout;
