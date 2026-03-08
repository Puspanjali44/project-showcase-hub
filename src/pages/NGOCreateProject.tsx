import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const NGOCreateProject = () => {
  const handlePublish = () => {
    toast({ title: "Project submitted!", description: "Admin will review before publishing." });
  };

  const handleDraft = () => {
    toast({ title: "Draft saved", description: "You can continue editing later." });
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl bg-card border border-border p-8"
      >
        <h1 className="text-2xl font-serif font-bold text-foreground mb-1">Create New Project</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Fill in the details — admin will review before publishing
        </p>

        <div className="space-y-5">
          <div>
            <Label htmlFor="title" className="font-semibold text-foreground">Project Title</Label>
            <Input id="title" placeholder="e.g. Rural School Rebuilding 2026" className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="desc" className="font-semibold text-foreground">Description</Label>
            <Textarea
              id="desc"
              placeholder="Describe your project, goals and expected impact..."
              className="mt-1.5 min-h-[120px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goal" className="font-semibold text-foreground">Funding Goal (Rs.)</Label>
              <Input id="goal" type="number" placeholder="e.g. 1200000" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="endDate" className="font-semibold text-foreground">End Date</Label>
              <Input id="endDate" type="date" className="mt-1.5" />
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDraft}>Save as Draft</Button>
            <Button className="bg-primary text-primary-foreground hover:opacity-90" onClick={handlePublish}>
              Publish Project →
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NGOCreateProject;
