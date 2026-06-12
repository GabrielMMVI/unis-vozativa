import { Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-text-muted text-sm">
        &copy; {new Date().getFullYear()} VozAtiva. Desenvolvido para um mundo mais inclusivo.
      </p>
      <div className="flex gap-6 items-center">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent-blue transition-colors"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent-blue transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <a
          href="mailto:contato@vozativa.org"
          className="text-text-muted hover:text-accent-blue transition-colors"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </div>
    </footer>
  );
}
