import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { to: "/projeto", label: "O Projeto" },
    { to: "/diario", label: "Diário de Bordo" },
    { to: "/arduino", label: "Arduino & Código" },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 bg-accent-blue rounded-lg flex items-center justify-center">
            <div className="size-3 bg-white rounded-full" />
          </div>
          <span className="font-bold tracking-tight text-xl text-text-main">VozAtiva</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors hover:text-accent-blue ${
                isActive(link.to) ? "text-accent-blue" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contato"
            className="bg-accent-blue text-white px-4 py-2 rounded-full hover:shadow-lg transition-all text-sm font-medium"
          >
            Contato
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium transition-colors hover:text-accent-blue ${
                isActive(link.to) ? "text-accent-blue" : "text-text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contato"
            onClick={() => setMobileOpen(false)}
            className="block text-center bg-accent-blue text-white px-4 py-2 rounded-full hover:shadow-lg transition-all text-sm font-medium"
          >
            Contato
          </Link>
        </div>
      )}
    </nav>
  );
}
