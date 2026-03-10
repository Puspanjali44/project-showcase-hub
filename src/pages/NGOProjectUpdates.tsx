import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { mockNGOs } from "@/data/mockData";
import {
  Plus,
  Image as ImageIcon,
  Video,
  FileText,
  MapPin,
  Calendar,
  CheckCircle2,
  Circle,
  ArrowRight,
  Footprints,
  Upload,
  X,
  Clock,
} from "lucide-react";

interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  media: { type: "photo" | "video" | "document"; url: string; name: string }[];
  milestone: string;
  milestoneIndex: number;
}

const defaultMilestones = [
  "Project Initiated",
  "Planning & Research",
  "Fund Allocation",
  "Implementation Started",
  "Mid-Way Review",
  "Major Milestone Achieved",
  "Final Phase",
  "Project Completed",
];

const mockUpdates: Record<string, ProjectUpdate[]> = {
  p1: [
    {
      id: "u1",
      date: "2026-03-08",
      title: "Foundation Laid for School #1",
      description: "The foundation for the first school in Gorkha has been successfully laid. Local community participated in the ceremony. Construction materials have arrived on site.",
      media: [
        { type: "photo", url: "/placeholder.svg", name: "foundation-ceremony.jpg" },
        { type: "photo", url: "/placeholder.svg", name: "construction-site.jpg" },
      ],
      milestone: "Implementation Started",
      milestoneIndex: 3,
    },
    {
      id: "u2",
      date: "2026-02-15",
      title: "Budget Approved & Materials Ordered",
      description: "The district committee approved the full budget. Earthquake-resistant construction materials have been ordered from approved vendors.",
      media: [
        { type: "document", url: "#", name: "budget-approval.pdf" },
      ],
      milestone: "Fund Allocation",
      milestoneIndex: 2,
    },
    {
      id: "u3",
      date: "2026-01-20",
      title: "Site Survey Completed",
      description: "Engineering team completed geological surveys of all 5 proposed school locations. Architectural plans drafted.",
      media: [
        { type: "photo", url: "/placeholder.svg", name: "survey-team.jpg" },
        { type: "video", url: "#", name: "site-walkthrough.mp4" },
      ],
      milestone: "Planning & Research",
      milestoneIndex: 1,
    },
    {
      id: "u4",
      date: "2025-12-10",
      title: "Project Kick-off",
      description: "Officially launched the Build 5 Schools initiative with stakeholder meeting in Kathmandu.",
      media: [],
      milestone: "Project Initiated",
      milestoneIndex: 0,
    },
  ],
  p2: [
    {
      id: "u5",
      date: "2026-02-28",
      title: "First Batch Training Completed",
      description: "25 teachers from Gorkha district completed the first module of the training program.",
      media: [
        { type: "photo", url: "/placeholder.svg", name: "training-session.jpg" },
      ],
      milestone: "Implementation Started",
      milestoneIndex: 3,
    },
  ],
};

const NGOProjectUpdates = () => {
  const ngo = mockNGOs[0];
  const [selectedProject, setSelectedProject] = useState(ngo.projects[0].id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: "", description: "", milestone: "" });
  const [uploadedFiles, setUploadedFiles] = useState<{ type: "photo" | "video" | "document"; name: string }[]>([]);

  const project = ngo.projects.find((p) => p.id === selectedProject)!;
  const updates = mockUpdates[selectedProject] || [];

  const currentMilestoneIndex = updates.length > 0 ? Math.max(...updates.map((u) => u.milestoneIndex)) : -1;
  const progressPct = Math.round(((currentMilestoneIndex + 1) / defaultMilestones.length) * 100);

  const handleFileUpload = (type: "photo" | "video" | "document") => {
    const names: Record<string, string> = {
      photo: `photo-${Date.now()}.jpg`,
      video: `video-${Date.now()}.mp4`,
      document: `doc-${Date.now()}.pdf`,
    };
    setUploadedFiles((prev) => [...prev, { type, name: names[type] }]);
    toast({ title: `${type.charAt(0).toUpperCase() + type.slice(1)} added` });
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePostUpdate = () => {
    if (!newUpdate.title || !newUpdate.description) {
      toast({ title: "Please fill in title and description", variant: "destructive" });
      return;
    }
    toast({ title: "Update posted!", description: "Your project update has been published." });
    setNewUpdate({ title: "", description: "", milestone: "" });
    setUploadedFiles([]);
    setDialogOpen(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Project Updates</h1>
            <p className="text-muted-foreground mt-1">Track and share your project's journey</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground gap-2">
                <Plus className="w-4 h-4" /> Post Update
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif">Post Project Update</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <Label className="font-semibold text-foreground">Project</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ngo.projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-semibold text-foreground">Update Title</Label>
                  <Input
                    placeholder="e.g. Construction milestone reached"
                    className="mt-1.5"
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate((p) => ({ ...p, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="font-semibold text-foreground">Description</Label>
                  <Textarea
                    placeholder="Describe what happened, progress made, challenges faced..."
                    className="mt-1.5 min-h-[100px]"
                    value={newUpdate.description}
                    onChange={(e) => setNewUpdate((p) => ({ ...p, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="font-semibold text-foreground">Milestone Reached</Label>
                  <Select value={newUpdate.milestone} onValueChange={(v) => setNewUpdate((p) => ({ ...p, milestone: v }))}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select milestone..." /></SelectTrigger>
                    <SelectContent>
                      {defaultMilestones.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Media upload */}
                <div>
                  <Label className="font-semibold text-foreground mb-2 block">Attach Media</Label>
                  <div className="flex gap-2 flex-wrap">
                    <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => handleFileUpload("photo")}>
                      <ImageIcon className="w-3.5 h-3.5" /> Photo
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => handleFileUpload("video")}>
                      <Video className="w-3.5 h-3.5" /> Video
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => handleFileUpload("document")}>
                      <FileText className="w-3.5 h-3.5" /> Document
                    </Button>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2">
                          {f.type === "photo" && <ImageIcon className="w-3.5 h-3.5 text-primary" />}
                          {f.type === "video" && <Video className="w-3.5 h-3.5 text-primary" />}
                          {f.type === "document" && <FileText className="w-3.5 h-3.5 text-primary" />}
                          <span className="flex-1 text-foreground truncate">{f.name}</span>
                          <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">Cancel</Button>
                  <Button className="flex-1 bg-primary text-primary-foreground" onClick={handlePostUpdate}>
                    Publish Update
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Project selector */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
        <div className="flex gap-2 flex-wrap">
          {ngo.projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProject(p.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedProject === p.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Milestone Trail */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10 rounded-xl bg-card border border-border p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Footprints className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground font-serif">Project Journey</h2>
          <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary border-0 text-xs">
            {progressPct}% Complete
          </Badge>
        </div>

        <Progress value={progressPct} className="h-2 mb-6" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

          <div className="space-y-0">
            {defaultMilestones.map((milestone, idx) => {
              const reached = idx <= currentMilestoneIndex;
              const isCurrent = idx === currentMilestoneIndex;
              const update = updates.find((u) => u.milestoneIndex === idx);

              return (
                <div key={milestone} className="flex gap-4 relative py-3">
                  {/* Dot */}
                  <div className="relative z-10 shrink-0">
                    {reached ? (
                      <CheckCircle2
                        className={`w-[30px] h-[30px] ${
                          isCurrent ? "text-primary" : "text-primary/60"
                        }`}
                        fill={isCurrent ? "hsl(var(--primary) / 0.15)" : "hsl(var(--primary) / 0.08)"}
                      />
                    ) : (
                      <Circle className="w-[30px] h-[30px] text-muted-foreground/30" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold ${
                        reached ? "text-foreground" : "text-muted-foreground/50"
                      }`}
                    >
                      {milestone}
                    </p>
                    {update && (
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(update.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Updates Timeline */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="text-lg font-bold text-foreground font-serif mb-5 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" /> Update History
        </h2>

        {updates.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground rounded-xl bg-card border border-border">
            <Footprints className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No updates yet</p>
            <p className="text-sm mt-1">Post your first update to start tracking progress</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {updates.map((update, i) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl bg-card border border-border p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-foreground">{update.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(update.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {update.milestone}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-[10px] shrink-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {update.milestone}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{update.description}</p>

                  {/* Media grid */}
                  {update.media.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {update.media.map((m, mi) => (
                        <div
                          key={mi}
                          className="flex items-center gap-2 text-xs bg-muted/50 rounded-lg px-3 py-2 border border-border/50"
                        >
                          {m.type === "photo" && <ImageIcon className="w-3.5 h-3.5 text-primary" />}
                          {m.type === "video" && <Video className="w-3.5 h-3.5 text-accent-foreground" />}
                          {m.type === "document" && <FileText className="w-3.5 h-3.5 text-muted-foreground" />}
                          <span className="text-foreground">{m.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NGOProjectUpdates;
