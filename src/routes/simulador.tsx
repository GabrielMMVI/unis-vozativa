import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useLayoutEffect } from "react";
import { FundamentacaoDocs } from "@/components/FundamentacaoDocs";


export const Route = createFileRoute("/simulador")({
  head: () => ({
    meta: [
      { title: "Simulador — VozAtiva" },
      { name: "description", content: "Simulação interativa do protótipo VozAtiva: pressione os botões e veja as respostas no terminal." },
      { property: "og:title", content: "Simulador VozAtiva" },
      { property: "og:description", content: "Simulação do dispositivo de comunicação assistiva." },
    ],
  }),
  component: SimuladorPage,
});

type LogEntry = { id: number; text: string };

function SimuladorPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);
  

  useLayoutEffect(() => {
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [logs]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.pitch = 1;
    const ptVoice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang === "pt-BR" || v.lang.startsWith("pt"));
    if (ptVoice) utterance.voice = ptVoice;
    window.speechSynthesis.speak(utterance);
  };

  const phrases: Record<number, string> = {
    1: "Sim",
    2: "Não",
    3: "Estou bem",
    4: "Me sentindo mal",
    5: "Estou com sede",
    6: "Estou com fome",
    7: "Quero ir no banheiro",
    8: "Estou com sono",
    9: "Mãe",
    10: "Pai",
    11: "Professor/a",
    12: "Eu",
    13: "Passeio",
    14: "Casa",
    15: "Abraço",
    16: "Quarto",
  };

  const icons: Record<number, string> = {
    1: "👍",
    2: "👎",
    3: "😊",
    4: "🤢",
    5: "🥤",
    6: "🥪",
    7: "🚽",
    8: "😴",
    9: "👩‍🍼",
    10: "👨‍🍼",
    11: "🧑‍🏫",
    12: "🙋",
    13: "🛝",
    14: "🏠",
    15: "🫂",
    16: "🛏️",
  };

  const handlePress = (n: number) => {
    speak(phrases[n]);
    setLogs((prev) => [
      ...prev,
      { id: Date.now() + n, text: `${n}º Botão: ${phrases[n]}` },
    ]);
  };

  const buttons = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background font-sans text-text-main">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-soft-blue text-accent-blue text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            Protótipo Interativo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-accent-blue">
            Simulador VozAtiva
          </h1>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Pressione os botões para simular o comportamento do dispositivo. As
            respostas aparecem no terminal ao lado.
          </p>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Painel de botões */}
            <div className="bg-slate-100 rounded-3xl p-8 relative aspect-square flex items-center justify-center">
              <div className="absolute top-4 right-4 size-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              <div className="grid grid-cols-4 gap-3 w-full h-full">
                {buttons.map((n) => (
                  <button
                    key={n}
                    onClick={() => handlePress(n)}
                    aria-label={`Botão ${n}: ${phrases[n]}`}
                    title={phrases[n]}
                    className="rounded-xl bg-accent-blue/80 hover:bg-accent-blue active:scale-95 transition-all shadow-md flex items-center justify-center text-3xl md:text-4xl"
                  >
                    {icons[n]}
                  </button>
                ))}
              </div>
              {/* Detalhes laterais (alto-falante) */}
              <div className="absolute bottom-5 right-5 grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="size-1 rounded-full bg-slate-400" />
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-accent-blue mb-3">
                Terminal de comandos
              </h2>
              <div ref={terminalRef} className="bg-black rounded-2xl p-5 font-mono text-sm h-[400px] overflow-y-auto border border-slate-700">
                <p className="text-slate-400 mb-2">
                  &gt; Respostas do Arduino devem aparecer aqui
                </p>
                {logs.map((log) => (
                  <p key={log.id} className="text-yellow-300">
                    &gt; {log.text}
                  </p>
                ))}
              </div>
              {logs.length > 0 && (
                <button
                  onClick={() => setLogs([])}
                  className="mt-3 self-end text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Limpar terminal
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-text-muted text-sm mt-8">
          Esta é uma simulação visual. A lógica funcional será implementada em
          breve.
        </p>
      </section>
    </div>
  );
}
