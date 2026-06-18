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
                <code>{`#include <SoftwareSerial.h>
#include <Keypad.h>

// --- Pino do LED ---
const int LED = 13;

// --- DFMini Player (Sempre verifique se a fiação RX/TX está cruzada) ---
SoftwareSerial dfSerial(10, 11); // RX=10, TX=11

// --- Configuração da Matriz (Keypad) ---
// Definimos as dimensões
const byte LINHAS = 4;
const byte COLUNAS = 4;

// Definimos os pinos corretos (de acordo com a esquemática fornecida)
byte pinosLinhas[LINHAS] = {2, 3, 4, 5};
byte pinosColunas[COLUNAS] = {6, 7, 8, 9};

// Mapa numérico: Define o valor (char) que cada tecla retorna.
// O valor retornado é o número do som a tocar (e o índice do nome).
char mapaTeclas[LINHAS][COLUNAS] = {
  { 1,  2,  3,  4},
  { 5,  6,  7,  8},
  { 9, 10, 11, 12},
  {13, 14, 15, 16}
};

// Matriz de nomes para o Monitor Serial, correspondente ao mapa numérico.
const char* nomesTeclas[LINHAS][COLUNAS] = {
  {"Botao 1",  "Botao 2",  "Botao 3",  "Botao 4"},
  {"Botao 5",  "Botao 6",  "Botao 7",  "Botao 8"},
  {"Botao 9",  "Botao 10", "Botao 11", "Botao 12"},
  {"Botao 13", "Botao 14", "Botao 15", "Botao 16"}
};

// Instanciação da biblioteca Keypad
Keypad teclado = Keypad(makeKeymap(mapaTeclas), pinosLinhas, pinosColunas, LINHAS, COLUNAS);

// ============================================
void setup() {
  Serial.begin(9600);
  dfSerial.begin(9600);

  // Configura LED
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);

  // Inicializa DFMini (mantivemos sua lógica de init)
  delay(1000);
  dfMiniInit();

  // Pisca LED 3x para indicar que está pronto
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED, HIGH);
    delay(200);
    digitalWrite(LED, LOW);
    delay(200);
  }

  Serial.println("=== PROJETO AUTISTAS PRONTO ===");
  Serial.println("Pressione um botao!");
}

// ============================================
void loop() {
  // A biblioteca getKey() faz uma leitura instantânea. 
  // Se não houver tecla pressionada, retorna 0 (falso).
  char tecla = teclado.getKey();

  if (tecla) {
    // Tecla foi pressionada (retorna o valor char do mapaTeclas)
    digitalWrite(LED, HIGH);

    // Converte char para int para uso como número do som
    int numTecla = (int)tecla;
    
    // Calcula os índices (linha e coluna) matematicamente com base no valor
    int linha = (numTecla - 1) / 4;
    int coluna = (numTecla - 1) % 4;

    // Mostra no Monitor Serial
    Serial.print("Pressionado: ");
    Serial.print(nomesTeclas[linha][coluna]); // Busca o nome correto
    Serial.print(" -> tocando som ");
    Serial.println(numTecla); // Toca o som numérico

    // Toca o som correspondente no DFMini
    tocarSom(numTecla);

    // Pequeno delay visual para o LED, mas sem travar o loop completamente
    delay(150);
    digitalWrite(LED, LOW);
  }
}

// ============================================
// Inicializa o modulo DFMini Player (Inalterado)
void dfMiniInit() {
  // Reseta o modulo
  enviarComando(0x0C, 0, 0);
  delay(500);

  // Define fonte como cartao SD
  enviarComando(0x09, 0, 2);
  delay(200);

  // Define volume (0 a 30)
  enviarComando(0x06, 0, 25);
  delay(200);

  Serial.println("DFMini inicializado!");
}

// ============================================
// Toca um arquivo de som pelo numero (Simplificado)
void tocarSom(int numero) {
  // O número do som é o terceiro parâmetro, convertemos int para byte
  enviarComando(0x03, 0, (byte)numero);
}

// ============================================
// Envia comando para o DFMini Player (Mantivemos sua lógica)
void enviarComando(byte comando, byte param1, byte param2) {
  byte msg[10] = {
    0x7E,        // inicio
    0xFF,        // versao
    0x06,        // tamanho
    comando,     // comando
    0x00,        // feedback
    param1,      // parametro 1
    param2,      // parametro 2
    0x00,        // checksum alto (simplificado)
    0x00,        // checksum baixo
    0xEF         // fim
  };
  for (int i = 0; i < 10; i++) {
    dfSerial.write(msg[i]);
  }
  // A biblioteca Keypad é rápida, esse delay aqui é necessário para o DFMini
  delay(100); 
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
