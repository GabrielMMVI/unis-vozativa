import { createFileRoute } from "@tanstack/react-router";
import { Zap, Heart, Users, Cpu } from "lucide-react";

export const Route = createFileRoute("/projeto")({
  head: () => ({
    meta: [
      { title: "O Projeto — VozAtiva" },
      { name: "description", content: "Conheça o VozAtiva, um dispositivo Arduino para comunicação assistiva de crianças autistas não-verbais." },
      { property: "og:title", content: "O Projeto — VozAtiva" },
      { property: "og:description", content: "Dispositivo Arduino para comunicação alternativa de crianças autistas não-verbais." },
    ],
  }),
  component: ProjetoPage,
});

function ProjetoPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-text-main">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <span className="inline-block px-3 py-1 bg-soft-blue text-accent-blue text-xs font-bold uppercase tracking-widest rounded-full">
            O Projeto
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Uma ponte entre o silêncio e a{