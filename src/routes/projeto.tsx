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
            Uma ponte entre o silêncio e a{" "}
            <span className="text-accent-blue">expressão</span>.
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            O VozAtiva nasceu da vontade de tornar a comunicação acessível a
            todas as crianças, independentemente de suas barreiras linguísticas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Por que este projeto?</h2>
            <p className="text-text-muted leading-relaxed">
              Milhares de crianças autistas no Brasil são não-verbais ou
              possuem comunicação limitada. Enquanto soluções de comunicação
              alternativa existem, muitas são financeiramente inacessíveis ou
              complexas para famílias de baixa renda.
            </p>
            <p className="text-text-muted leading-relaxed">
              O VozAtiva propõe uma alternativa de baixo custo, construída com
              Arduino e componentes acessíveis, que pode ser montada e
              personalizada por qualquer pessoa com acesso a materiais de
              eletrônica básica.
            </p>
          </div>
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Nossos pilares</h3>
            <div className="space-y-6">
              {[
                {
                  icon: <Zap size={20} />,
                  title: "Acessibilidade",
                  desc: "Custo de materiais inferior a R$ 150",
                },
                {
                  icon: <Heart size={20} />,
                  title: "Inclusão",
                  desc: "Design pensado para diversos perfis sensoriais",
                },
                {
                  icon: <Users size={20} />,
                  title: "Comunidade",
                  desc: "Construído com e para famílias autistas",
                },
                {
                  icon: <Cpu size={20} />,
                  title: "Open Source",
                  desc: "Código e esquemas livres para replicação",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="size-10 bg-soft-blue rounded-xl flex items-center justify-center text-accent-blue shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 text-center space-y-6">
          <h2 className="text-3xl font-bold">Como funciona?</h2>
          <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">
            O dispositivo utiliza botões táteis conectados a um Arduino Uno. Ao
            pressionar um botão, o Arduino ativa um módulo de áudio MP3 que
            reproduz a frase correspondente. A interface pode ser adaptada com
            ícones, cores e texturas diferentes para cada criança.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-2xl font-bold text-accent-blue">0.2s</p>
              <p className="text-xs text-text-muted uppercase tracking-wider">Latência</p>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-2xl font-bold text-accent-blue">6+</p>
              <p className="text-xs text-text-muted uppercase tracking-wider">Botões configuráveis</p>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-2xl font-bold text-accent-blue">&lt;R$150</p>
              <p className="text-xs text-text-muted uppercase tracking-wider">Custo estimado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
