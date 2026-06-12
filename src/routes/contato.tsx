import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — VozAtiva" },
      { name: "description", content: "Entre em contato com a equipe do VozAtiva. Queremos ouvir sua história e colaborar para um mundo mais inclusivo." },
      { property: "og:title", content: "Contato — VozAtiva" },
      { property: "og:description", content: "Entre em contato com a equipe do VozAtiva." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-text-main">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <span className="inline-block px-3 py-1 bg-soft-blue text-accent-blue text-xs font-bold uppercase tracking-widest rounded-full">
            Contato
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Vamos <span className="text-accent-blue">conversar</span>?
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Estamos abertos a colaborações, dúvidas e histórias. Se você é
            desenvolvedor, terapeuta, educador ou familiar, queremos te ouvir.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[
              {
                icon: <Mail size={24} />,
                title: "Email",
                info: "contato@vozativa.org",
                desc: "Respondemos em até 48 horas úteis.",
              },
              {
                icon: <MessageCircle size={24} />,
                title: "Redes Sociais",
                info: "@vozativa",
                desc: "Siga-nos para acompanhar as novidades em tempo real.",
              },
              {
                icon: <MapPin size={24} />,
                title: "Localização",
                info: "Brasil",
                desc: "Projeto desenvolvido remotamente com colaboradores de várias regiões.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="size-12 bg-soft-blue rounded-2xl flex items-center justify-center text-accent-blue shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-text-main font-medium">{item.info}</p>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2rem] p-8 border border-slate-100">
            <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium mb-2"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent resize-none"
                  placeholder="Conte-nos sua história ou dúvida..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-blue text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
