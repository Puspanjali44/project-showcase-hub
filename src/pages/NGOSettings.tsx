import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NGOSettings = () => {
  const handleSave = () => {
    toast({ title: "Changes saved", description: "Your settings have been updated." });
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold text-foreground mb-8"
      >
        Settings
      </motion.h1>

      <div className="space-y-6">
        {/* Organisation Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-card border border-border p-6"
        >
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-5">Organisation Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="font-semibold text-foreground">Organisation Name</Label>
              <Input defaultValue="Nepal Education Foundation" className="mt-1.5" />
            </div>
            <div>
              <Label className="font-semibold text-foreground">Registration Number</Label>
              <Input defaultValue="001" className="mt-1.5" />
            </div>
            <div>
              <Label className="font-semibold text-foreground">Email</Label>
              <Input defaultValue="info@nefedu.org" disabled className="mt-1.5 bg-muted/50" />
            </div>
            <div>
              <Label className="font-semibold text-foreground">Location</Label>
              <Input defaultValue="Kathmandu" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label className="font-semibold text-foreground">Mission</Label>
            <Textarea className="mt-1.5 min-h-[100px]" placeholder="Describe your organization's mission..." />
          </div>
        </motion.div>

        {/* Bank Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-card border border-border p-6"
        >
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-5">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold text-foreground">Bank Name</Label>
              <Input className="mt-1.5" placeholder="e.g. Nepal Bank Ltd" />
            </div>
            <div>
              <Label className="font-semibold text-foreground">Account Number</Label>
              <Input className="mt-1.5" placeholder="e.g. 1234567890" />
            </div>
          </div>
        </motion.div>

        <Button className="bg-primary text-primary-foreground hover:opacity-90" onClick={handleSave}>
          Save Changes
        </Button>

        {/* Verification Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl bg-card border border-border p-6"
        >
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-5">Verification Documents</h2>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Drop or browse</p>
            <p className="text-xs text-muted-foreground">PDF, JPG, PNG · max 5MB</p>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-destructive/30 p-6"
        >
          <h2 className="text-sm font-bold tracking-widest text-destructive uppercase mb-3">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">These actions are permanent and cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Pause All Projects
            </Button>
            <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Deactivate Account
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NGOSettings;
