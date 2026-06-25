import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, Tag } from "lucide-react";

export const Route = createFileRoute("/diario")({
  head: () => ({
    meta: [
      { title: "Diário de Bordo — VozAtiva" },
      { name: "description", content: "Acompanhe o desenvolvimento do projeto VozAtiva, testes de campo e avanços na comunicação assistiva." },
      { property: "og:title", content: "Diário de Bordo — VozAtiva" },
      { property: "og:description", content: "Acompanhe o desenvolvimento do projeto VozAtiva." },
    ],
  }),
  component: DiarioPage,
});

const posts = [
  {
    id: 1,
    title: "Escolhendo o hardware ideal: Por que Arduino Uno?",
    excerpt:
      "Uma análise sobre custo-benefício e facilidade de manutenção para famílias que desejam replicar o projeto. O Arduino Uno se mostrou a melhor escolha devido à sua robustez e comunidade ativa.",
    category: "Hardware",
    date: "12 Out, 2023",
    readTime: "8 min",
    color: "bg-soft-blue text-accent-blue",
  },
  {
    id: 2,
    title: "Otimizando o tempo de resposta do Arduino",
    excerpt:
      "Como reduzimos a latência para garantir que o feedback sonoro seja instantâneo ao toque, evitando frustração cognitiva na criança.",
    category: "Código",
    date: "28 Set, 2023",
    readTime: "6 min",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Design sensorial: texturas que comunicam",
    excerpt:
      "A importância do feedback tátil e por que optamos por botões físicos com texturas distintas em vez de telas touch.",
    category: "Design",
    date: "15 Set, 2023",
    readTime: "7 min",
    color: "bg-purple-100 text-purple-600",
  },
];

function DiarioPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-text-main">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <span className="inline-block px-3 py-1 bg-soft-blue text-accent-blue text-xs font-bold uppercase tracking-widest rounded-full">
            Diário de Bordo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Acompanhe o <span className="text-accent-blue">desenvolvimento</span>
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Registro de avanços, aprendizados e histórias do projeto VozAtiva.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${post.color}`}
                >
                  <Tag size={12} />
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Clock size={14} />
                  {post.readTime} de leitura
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">
                {post.title}
              </h2>
              <p className="text-text-muted leading-relaxed">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
