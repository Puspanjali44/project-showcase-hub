import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-serif font-bold">DanaDisha</span>
          </div>
          <p className="text-sm opacity-70">
            Transparent, trustworthy donation management for Nepal. Connecting generous hearts with verified causes.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Platform</h4>
          <div className="flex flex-col gap-2">
            <Link to="/ngos" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Browse NGOs</Link>
            <Link to="/dashboard" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Donor Dashboard</Link>
            <Link to="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">About Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Support</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm opacity-70">FAQ</span>
            <span className="text-sm opacity-70">Contact Us</span>
            <span className="text-sm opacity-70">Privacy Policy</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Connect</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm opacity-70">Facebook</span>
            <span className="text-sm opacity-70">Twitter</span>
            <span className="text-sm opacity-70">Instagram</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm opacity-50">
        © 2025 DanaDisha. All rights reserved. Built with ❤️ for Nepal.
      </div>
    </div>
  </footer>
);

export default Footer;
