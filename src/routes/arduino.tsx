import { createFileRoute } from "@tanstack/react-router";
import { Code2, BookOpen, Wrench, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/arduino")({
  head: () => ({
    meta: [
      { title: "Arduino & Código — VozAtiva" },
      { name: "description", content: "Documentação técnica, esquemas de circuito e código-fonte do projeto VozAtiva." },
      { property: "og:title", content: "Arduino & Código — VozAtiva" },
      { property: "og:description", content: "Documentação técnica e código-fonte do projeto VozAtiva." },
    ],
  }),
  component: ArduinoPage,
});

function ArduinoPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-text-main">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <span className="inline-block px-3 py-1 bg-soft-blue text-accent-blue text-xs font-bold uppercase tracking-widest rounded-full">
            Arduino & Código
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
            Tecnologia <span className="text-accent-blue">aberta</span>
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            Todo o código e esquemas estão disponíveis para quem quiser replicar
            ou contribuir com o projeto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <Code2 size={24} />,
              title: "Código-fonte",
              desc: "Sketch Arduino em C++ comentado e documentado para fácil modificação.",
            },
            {
              icon: <BookOpen size={24} />,
              title: "Documentação",
              desc: "Guia passo a passo para montagem, configuração e personalização.",
            },
            {
              icon: <Wrench size={24} />,
              title: "Esquemas",
              desc: "Diagramas de circuito e lista de materiais necessários.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 space-y-4"
            >
              <div className="size-12 bg-soft-blue rounded-2xl flex items-center justify-center text-accent-blue">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Código do Arduino
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl">
              Este é o sketch básico que controla os botões e aciona os sons.
              O código utiliza a biblioteca DFPlayer Mini para controle do
              módulo MP3.
            </p>

            <div className="bg-slate-800 rounded-2xl p-6 overflow-x-auto border border-slate-700">
              <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                <code>{`#include "SoftwareSerial.h"
#include "DFRobotDFPlayerMini.h"

SoftwareSerial mySerial(10, 11);
DFRobotDFPlayerMini myDFPlayer;

const int buttons[] = {2, 3, 4, 5, 6, 7};
const int numButtons = 6;

void setup() {
  mySerial.begin(9600);
  myDFPlayer.begin(mySerial);
  myDFPlayer.volume(25);

  for (int i = 0; i < numButtons; i++) {
    pinMode(buttons[i], INPUT_PULLUP);
  }
}

void loop() {
  for (int i = 0; i < numButtons; i++) {
    if (digitalRead(buttons[i]) == LOW) {
      myDFPlayer.play(i + 1);
      delay(500);
    }
  }
}`}</code>
              </pre>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors">
                <ExternalLink size={18} />
                Ver no GitHub
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                <BookOpen size={18} />
                Guia Completo
              </button>
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-10%] size-96 bg-accent-blue/20 blur-[100px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
