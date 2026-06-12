import { createFileRoute, Link } from "@tanstack/react-router";
import heroDevice from "@/assets/hero-device.jpg";
import postHardware from "@/assets/post-hardware.jpg";
import postClassroom from "@/assets/post-classroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VozAtiva — Comunicação Assistiva com Arduino" },
      { name: "description", content: "Um dispositivo Arduino para ajudar crianças autistas não-verbais a se comunicarem de forma intuitiva e independente." },
      { property: "og:title", content: "VozAtiva — Comunicação Assistiva com Arduino" },
      { property: "og:description", content: "Dispositivo Arduino para comunicação alternativa de crianças autistas não-verbais." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-text-main selection:bg-soft-blue">
      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-soft-blue text-accent-blue text-xs font-bold uppercase tracking-widest rounded-full">
              Em Desenvolvimento
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900">
              Dando voz ao silêncio através da{" "}
              <span className="text-accent-blue">tecnologia</span>.
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Um dispositivo assistivo baseado em Arduino desenhado para ajudar
              crianças autistas não-verbais a expressarem suas necessidades de
              forma intuitiva e independente.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projeto"
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition-all"
              >
                Conheça o Protótipo
              </Link>
              <Link
                to="/arduino"
                className="px-8 py-4 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all"
              >
                Ver Código
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroDevice}
              alt="Protótipo do dispositivo VozAtiva com botões coloridos e Arduino"
              width={1024}
              height={1024}
              className="w-full aspect-square object-cover rounded-[40px] shadow-sm"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-[240px]">
              <div className="flex gap-2 mb-3">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <p className="text-sm font-medium">&quot;Quero água&quot;</p>
              <p className="text-xs text-text-muted mt-1">
                Resposta tátil processada em 0.2s
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Core Description */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="size-12 bg-soft-blue rounded-2xl flex items-center justify-center text-accent-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Interface Tátil</h3>
              <p className="text-text-muted leading-relaxed">
                Botões de grandes dimensões e cores contrastantes para facilitar
                a seleção visual e motora.
              </p>
            </div>
            <div className="space-y-4">
              <div className="size-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Feedback Auditivo</h3>
              <p className="text-text-muted leading-relaxed">
                Módulos de som que vocalizam as necessidades da criança
                instantaneamente para o cuidador.
              </p>
            </div>
            <div className="space-y-4">
              <div className="size-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Código Aberto</h3>
              <p className="text-text-muted leading-relaxed">
                Totalmente customizável para as necessidades específicas de cada
                perfil sensorial e cognitivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Preview */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl font-bold mb-6">
              Como funciona na prática?
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Abaixo simulamos o painel de comunicação. Cada ícone representa um
              gatilho que o Arduino processa para gerar voz.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Fome", icon: "🍎" },
                { label: "Sono", icon: "😴" },
                { label: "Brincar", icon: "🧸" },
                { label: "Banheiro", icon: "🚽" },
                { label: "Dor", icon: "💢" },
                { label: "Sair", icon: "🚪" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="aspect-square bg-slate-800 rounded-2xl border border-slate-700 flex flex-col items-center justify-center gap-3 hover:bg-accent-blue transition-all cursor-pointer group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-10%] size-96 bg-accent-blue/20 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* Recent Updates */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Diário do Projeto</h2>
            <p className="text-text-muted">
              Acompanhe os avanços e testes de campo.
            </p>
          </div>
          <Link
            to="/diario"
            className="text-accent-blue font-bold text-sm hover:underline"
          >
            Ver todos os posts
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/diario" className="group cursor-pointer block">
            <div className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-sm">
              <img
                src={postHardware}
                alt="Componentes eletrônicos e fiação Arduino"
                width={1024}
                height={640}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-accent-blue uppercase tracking-widest">
                <span>Hardware</span>
                <span className="size-1 bg-slate-300 rounded-full" />
                <span className="text-text-muted">12 Out, 2023</span>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-accent-blue transition-colors">
                Escolhendo o hardware ideal: Por que Arduino Uno?
              </h3>
              <p className="text-text-muted">
                Uma análise sobre custo-benefício e facilidade de manutenção para
                famílias que desejam replicar o projeto...
              </p>
            </div>
          </Link>

          <Link to="/diario" className="group cursor-pointer block">
            <div className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-sm">
              <img
                src={postClassroom}
                alt="Sala de aula inclusiva com professores e alunos"
                width={1024}
                height={640}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-accent-blue uppercase tracking-widest">
                <span>Estudo de Caso</span>
                <span className="size-1 bg-slate-300 rounded-full" />
                <span className="text-text-muted">05 Out, 2023</span>
              </div>
              <h3 className="text-2xl font-bold group-hover:text-accent-blue transition-colors">
                Primeiros testes na APAE: O que aprendemos?
              </h3>
              <p className="text-text-muted">
                Observações valiosas sobre a sensibilidade do toque e a
                necessidade de ícones mais universais para as crianças.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
