import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, Tag } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string };

type Post = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  modalTitle: string;
  modalSubtitle: string;
  content: Block[];
};

// Inline **bold** renderer
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

const posts: Post[] = [
  {
    id: 1,
    title: "Por que Arduino Uno?",
    excerpt:
      "Uma análise sobre custo-benefício e facilidade de manutenção para famílias que desejam replicar o projeto. O Arduino Uno se mostrou a melhor escolha devido à sua robustez e comunidade ativa.",
    category: "Hardware",
    date: "12 Out, 2023",
    readTime: "8 min",
    color: "bg-soft-blue text-accent-blue",
    modalTitle: "Escolhendo o hardware ideal: Por que o Arduino Uno?",
    modalSubtitle:
      "Uma análise sobre custo-benefício, arquitetura e facilidade de manutenção para replicação domiciliar.",
    content: [
      { type: "p", text: "A engenharia por trás de dispositivos de tecnologia assistiva, historicamente, sofre de um problema crônico: o modelo de \"caixa preta\". Equipamentos proprietários voltados para Comunicação Alternativa e Aumentativa (CAA), como os painéis PECS eletrônicos tradicionais, são caros, fechados para modificações e exigem manutenção especializada. Quando um botão quebra ou a bateria falha, o dispositivo fica inoperante por semanas até que a assistência técnica resolva, prejudicando o desenvolvimento da criança." },
      { type: "p", text: "A decisão de basear um dispositivo PECS no Arduino Uno subverte essa lógica. Não se trata apenas de escolher um microcontrolador, mas de adotar uma plataforma que democratiza o acesso e a manutenção. A escolha do Uno não é motivada por ele ser o hardware mais poderoso do mercado, mas por ser o mais adequado para a realidade de famílias que precisam replicar e manter o projeto por conta própria." },
      { type: "h3", text: "1. A Robustez Técnica e o Fator \"Tolerância a Falhas\"" },
      { type: "p", text: "Para entender a adequação do Arduino Uno para famílias e iniciantes, precisamos olhar para a sua arquitetura. O coração do Uno R3 tradicional é o microcontrolador ATmega328P da Microchip." },
      { type: "p", text: "**Explicação técnica curta:** O Uno opera com uma lógica de nível TTL de 5 Volts. Isso é crucial porque a grande maioria dos sensores, botões e módulos de baixo custo do mercado operam nativamente em 5V. Microcontroladores mais modernos (como o ESP32) operam em 3.3V, o que exige conversores de nível lógico para interagir com certos periféricos, adicionando complexidade ao circuito." },
      { type: "p", text: "Além disso, o Uno é extremamente tolerante a erros de montagem (\"Tolerância a Falhas\"). O ATmega328P suporta curtos-circuitos temporários e variações de corrente nas portas de I/O (Entrada/Saída) que \"fritariam\" placas mais sensíveis. Para um pai ou mãe que está montando um circuito pela primeira vez na mesa da cozinha usando uma protoboard, ligar um LED ou um botão invertido ocasionalmente vai acontecer. O Uno foi projetado especificamente para sobreviver a esse tipo de curva de aprendizado." },
      { type: "p", text: "**O formato físico (DIP):** O chip ATmega328P no Uno R3 tradicional vem em um encapsulamento DIP (Dual In-line Package), ou seja, ele é encaixado em um soquete, não soldado diretamente na placa. Se, em um caso extremo, o microcontrolador for danificado por um curto-circuito grave, a placa inteira não é perdida. O usuário pode simplesmente puxar o chip com uma pinça, comprar um chip novo por uma fração ínfima do preço da placa, encaixá-lo e o dispositivo volta à vida. Nenhuma solda SMD (Surface-Mount Device) é necessária." },
      { type: "h3", text: "2. Descartando o Inviável: Por que não usar um Raspberry Pi ou similar?" },
      { type: "p", text: "Em projetos acadêmicos, há uma tendência a \"superdimensionar\" o hardware. Se o objetivo é apenas processar cliques de botões e emitir áudio/sinais, o uso de computadores de placa única (SBCs) como o Raspberry Pi deve ser descartado por ser uma solução não inteligente e inviável para este escopo." },
      { type: "p", text: "**Tempo de Boot:** Um autista precisa de previsibilidade e resposta imediata. Um Arduino Uno liga e está executando o código em milissegundos após ser energizado. Um Raspberry Pi precisa carregar um sistema operacional inteiro (Linux), levando de 15 a 40 segundos para estar pronto." },
      { type: "p", text: "**Corrupção de Dados:** Dispositivos baseados em Raspberry Pi usam cartões MicroSD para o sistema operacional. Se uma criança puxar o dispositivo da tomada ou a bateria acabar abruptamente, há um risco altíssimo de corromper o sistema de arquivos do Linux, inutilizando o painel até que o cartão seja reformatado e reconfigurado pelo computador. O Arduino executa o código diretamente da sua memória Flash (EEPROM), sendo completamente imune a desligamentos abruptos." },
      { type: "p", text: "**Consumo de Bateria:** O Uno pode funcionar por dias com baterias simples. Processadores robustos drenam powerbanks em poucas horas." },
      { type: "h3", text: "3. Custo-Benefício Absoluto e Viabilidade Econômica" },
      { type: "p", text: "O impacto financeiro de um filho atípico já é alto devido a terapias, intervenções e materiais adaptados. Um painel de comunicação comercial pode custar milhares de reais." },
      { type: "p", text: "O design do Arduino é Open-Source Hardware (Hardware de Código Aberto). Isso significa que os esquemáticos originais são públicos e legais de serem copiados. Como resultado, o mercado global é abastecido por placas compatíveis e clones de altíssima qualidade (geralmente utilizando o chip conversor USB-Serial CH340)." },
      { type: "p", text: "A viabilidade econômica se dá em dois estágios:" },
      { type: "p", text: "**Custo de Aquisição:** Uma placa compatível com Uno pode ser adquirida por valores extremamente acessíveis, frequentemente abaixo de R$ 50. Os componentes adjacentes (fios jumper, botões de fliperama/arcade, resistores) custam centavos. O custo total de hardware de um projeto funcional pode ser inferior a 10% de uma solução comercial." },
      { type: "p", text: "**Custo de Substituição:** Este é o verdadeiro custo-benefício. Crianças podem ser bruscas, derrubar líquidos ou deixar o aparelho cair. Se um painel comercial sofre um dano por água, a perda financeira é massiva. Com a arquitetura do projeto baseada em Arduino, as peças são modulares. Caiu suco no botão? Troca-se apenas o botão por R$ 3,00. A placa-mãe queimou? Troca-se apenas a placa, reaproveitando toda a fiação e carcaça, por um valor irrisório e em questão de minutos." },
      { type: "h3", text: "4. A Comunidade e a Escala de Solução de Problemas" },
      { type: "p", text: "O maior gargalo de projetos \"Maker\" ou de hardware de garagem é a documentação. Você pode escolher o microcontrolador mais eficiente do mundo, mas se o usuário final não encontrar respostas quando algo der errado, o projeto morre na gaveta." },
      { type: "p", text: "O Arduino Uno não é apenas uma placa, é o padrão global para ensino de eletrônica e programação básica há mais de uma década. Isso gera um ecossistema sem precedentes. Se um familiar que está construindo ou fazendo a manutenção do painel se deparar com um erro como \"avrdude: stk500_getsync()\" ao tentar carregar o código para atualizar os botões, uma pesquisa rápida no Google retornará milhões de resultados, vídeos em português e fóruns explicando passo a passo como resolver." },
      { type: "p", text: "O software utilizado para programar o Arduino (a Arduino IDE) abstrai toda a complexidade dos registradores C/C++. Uma família não precisa entender manipulação de bits para mudar o que o \"Botão 1\" faz. Eles só precisam localizar a linha if (botao1 == HIGH) em um código bem comentado. A curva de aprendizado é a mais suave possível dentro da engenharia de hardware." },
      { type: "h3", text: "5. Facilidade de Manutenção Domiciliar (Design Modular)" },
      { type: "p", text: "A replicação do projeto por famílias dita que a montagem não pode exigir ferramentas industriais ou habilidades avançadas de solda." },
      { type: "p", text: "O ecossistema do Arduino Uno é focado em conectividade via barras de pinos (pin headers) fêmeas. A fiação de todo o painel de botões do PECS pode ser feita utilizando cabos Dupont (Jumpers) com conectores machos, que simplesmente se encaixam nos pinos do Arduino como blocos de montar." },
      { type: "p", text: "Para elevar a robustez e evitar que os fios se soltem com o uso diário pela criança, famílias com o mínimo de destreza podem utilizar um Sensor Shield V5.0 acoplado em cima do Uno, ou simplesmente fixar as conexões com cola quente." },
      { type: "p", text: "Se o dispositivo parar de funcionar, a arquitetura aberta permite um diagnóstico visual direto: um fio solto é imediatamente detectado pelo pai/mãe. Não existem parafusos proprietários com travas de garantia. A manutenção domiciliar devolve o controle aos pais, garantindo que a ferramenta de comunicação da criança esteja sempre disponível, transformando um hardware puramente eletrônico em um verdadeiro instrumento de independência terapêutica." },
    ],
  },
  {
    id: 2,
    title: "Otimização de Latência",
    excerpt:
      "Como reduzimos a latência para garantir que o feedback sonoro seja instantâneo ao toque, evitando frustração cognitiva na criança.",
    category: "Código",
    date: "28 Set, 2023",
    readTime: "6 min",
    color: "bg-green-100 text-green-600",
    modalTitle: "Otimizando o Tempo de Resposta: Garantindo Feedback Instantâneo no Arduino",
    modalSubtitle:
      "Estratégias de hardware e software para reduzir a latência a zero e preservar o vínculo cognitivo.",
    content: [
      { type: "p", text: "No desenvolvimento de dispositivos de Comunicação Alternativa e Aumentativa (CAA) para crianças no espectro autista, o tempo de resposta não é apenas uma métrica de performance técnica; é um requisito clínico. A compreensão cognitiva de \"causa e efeito\" (eu aperto este botão = a máquina fala o que eu quero) exige um feedback quase instantâneo. Se houver um atraso perceptível — uma latência superior a 100 ou 150 milissegundos — a criança pode apertar o botão repetidas vezes achando que falhou, gerando sobrecarga sensorial e frustração." },
      { type: "p", text: "O Arduino Uno, rodando a 16 MHz, é capaz de executar 16 milhões de instruções por segundo. Computacionalmente, ele é infinitamente mais rápido do que a percepção humana. Portanto, se um dispositivo baseado em Arduino apresenta \"lag\" ao toque, o problema invariavelmente não é a placa, mas sim a arquitetura do código e a interface com os módulos periféricos." },
      { type: "p", text: "Para garantir que o dispositivo PECS seja impecável, a otimização deve ocorrer em quatro pilares fundamentais." },
      { type: "h3", text: "1. Eliminação de Funções Bloqueantes (O Fim do delay())" },
      { type: "p", text: "O erro mais comum em projetos de Arduino é o uso da função delay(). Quando o processador encontra um delay(200), ele literalmente congela a execução de qualquer outra linha de código por 200 milissegundos." },
      { type: "p", text: "Assim como no loop principal de processamento de uma engine, onde o travamento da thread principal derruba a taxa de quadros (FPS) e a responsividade dos controles, no Arduino isso significa botões \"cegos\". Se a criança pressionar o botão \"Água\" enquanto o Arduino estiver executando um atraso referente à animação de um LED, o toque será ignorado." },
      { type: "p", text: "**A Solução Técnica:** A arquitetura do código deve abandonar scripts lineares e adotar Máquinas de Estado Finito (FSM) baseadas na função millis(). O millis() atua como um cronômetro interno contínuo. Em vez de pausar o sistema para esperar o tempo passar, o código apenas verifica se o intervalo de tempo necessário já transcorreu, permitindo que a varredura dos botões continue rodando na velocidade máxima do clock ininterruptamente." },
      { type: "h3", text: "2. Tratamento de Debounce: Hardware vs. Software" },
      { type: "p", text: "Botões físicos, como os de fliperama geralmente usados nesses painéis, possuem componentes mecânicos de metal. Quando pressionados, esses contatos não fecham o circuito perfeitamente de uma vez; eles \"quicam\" microscopicamente por alguns milissegundos, enviando múltiplos sinais de LIGADO/DESLIGADO para o Arduino. Se isso não for tratado, um único clique fará o dispositivo repetir a palavra várias vezes de forma engasgada (\"A-A-A-Água\")." },
      { type: "p", text: "O tratamento via software (Debounce) tradicionalmente exige que o processador espere cerca de 50ms para confirmar se o botão realmente estabilizou. Isso adiciona 50ms de latência forçada." },
      { type: "p", text: "**A Solução Técnica:** Para resposta instantânea com zero custo de processamento, o debounce não deve ser feito no código, mas no circuito físico. A inclusão de um pequeno capacitor (ex: 100nF) em paralelo com o botão atua como um filtro passa-baixa (um circuito RC simples). O capacitor absorve as flutuações elétricas mecânicas. Assim, o pino do Arduino recebe um sinal limpo e absoluto imediatamente, permitindo que o código acione o áudio no exato milissegundo do contato inicial." },
      { type: "h3", text: "3. Interrupções de Hardware (Bypass do Loop)" },
      { type: "p", text: "No método tradicional (Polling), o Arduino lê o estado de cada botão, um por um, a cada ciclo do loop(). Se houver muitas tarefas sendo processadas, pode haver um micro-atraso até que o processador \"olhe\" para aquele botão específico." },
      { type: "p", text: "**A Solução Técnica:** Para botões de emergência ou de altíssima prioridade, a arquitetura deve utilizar as Interrupções de Hardware (Hardware Interrupts). No Uno, os pinos 2 e 3 possuem essa capacidade. Ao configurar uma interrupção (attachInterrupt()), você diz ao microcontrolador para abandonar imediatamente o que estiver fazendo no loop() assim que a voltagem do pino mudar (RISING ou FALLING) e executar a função de áudio. É a garantia de nível de hardware de que o toque será processado no exato instante físico em que ocorrer, com latência tendendo a zero. Se o projeto exigir mais pinos do que o Uno oferece nativamente para interrupções, técnicas de Pin Change Interrupts (PCINT) podem ser aplicadas a todas as portas." },
      { type: "h3", text: "4. Otimização da Camada de Áudio (O Gargalo Real)" },
      { type: "p", text: "O Arduino Uno não tem capacidade nativa para decodificar e tocar arquivos MP3; ele delega essa função para um módulo externo (geralmente o DFPlayer Mini) usando comunicação Serial. É aqui que reside o maior gargalo de latência." },
      { type: "p", text: "Se o código disser ao módulo \"Toque a faixa 1\", o atraso entre o comando e a saída do som no alto-falante pode chegar a meio segundo devido ao tempo que o módulo leva para procurar o arquivo no cartão SD." },
      { type: "p", text: "**As Soluções Técnicas:**" },
      { type: "p", text: "**Comunicação Serial Eficiente:** O uso da biblioteca SoftwareSerial em pinos genéricos consome muitos recursos. Se a comunicação entre o Arduino e o módulo de MP3 for lenta, a resposta atrasa. Deve-se garantir uma taxa de transmissão (Baud Rate) enxuta, geralmente 9600 bps para estabilidade em módulos baratos." },
      { type: "p", text: "**Acesso Direto à Memória (SD Card):** A latência de leitura do cartão SD é fatal. O cartão deve estar formatado em FAT32 com tamanhos de unidade de alocação pequenos. Mais importante: o código não deve instruir o módulo a procurar um arquivo pelo nome (o que exige varredura da Tabela de Alocação de Arquivos - FAT). Os arquivos de áudio devem estar nomeados numericamente (ex: 0001.mp3) dentro de uma pasta fixa (/mp3/), e o código deve enviar comandos de índice direto (playFolder(1, 1)). Isso corta o tempo de busca da CPU do módulo, liberando o áudio quase instantaneamente." },
      { type: "p", text: "**Manipulação de Porta Direta (Opcional):** Para desenvolvedores buscando a performance absoluta, o comando padrão digitalRead() do Arduino consome cerca de 50 ciclos de clock devido às suas checagens de segurança ocultas. Substituí-lo pela leitura direta dos registradores do microcontrolador (ex: ler o registrador PIND ou PINB) reduz essa verificação para 1 único ciclo de clock (62.5 nanossegundos). Embora a diferença seja imperceptível ao ouvido humano, do ponto de vista da arquitetura de sistemas embarcados, é a implementação mais limpa e otimizada possível." },
      { type: "p", text: "A combinação dessas arquiteturas — não bloquear o código, delegar o debounce para a física, usar leitura direta e otimizar a indexação de áudio — transforma o Arduino de um simples protótipo estudantil em um equipamento de resposta em tempo real, fornecendo o feedback sonoro exato de que a criança precisa para validar sua ação sem frustrações." },
    ],
  },
  {
    id: 3,
    title: "Design Sensorial e Tátil",
    excerpt:
      "A importância do feedback tátil e por que optamos por botões físicos com texturas distintas em vez de telas touch.",
    category: "Design",
    date: "15 Set, 2023",
    readTime: "7 min",
    color: "bg-purple-100 text-purple-600",
    modalTitle: "Design Sensorial: Texturas que Comunicam",
    modalSubtitle:
      "A superioridade do feedback tátil e mecânico sobre telas capacitivas no desenvolvimento de interfaces para o espectro autista.",
    content: [
      { type: "p", text: "Existe um viés na tecnologia moderna de assumir que telas touch screen são o ápice do design de interfaces. Para o usuário neurotípico, o vidro liso de um tablet oferece versatilidade. No entanto, ao projetar Tecnologias Assistivas e dispositivos de Comunicação Alternativa e Aumentativa (CAA) para indivíduos no Transtorno do Espectro Autista (TEA), a tela plana de vidro frequentemente atua como uma barreira arquitetônica e cognitiva." },
      { type: "p", text: "A decisão de projetar o dispositivo PECS utilizando botões físicos e mecânicos, aprimorados com texturas distintas, é uma escolha deliberada de engenharia sensorial. A interface deixa de ser apenas um meio de entrada de dados e passa a ser uma extensão do processo terapêutico." },
      { type: "h3", text: "1. A Sobrecarga Cognitiva e a Falha das Telas Capacitivas" },
      { type: "p", text: "A interação com uma tela touch exige um alto nível de coordenação motora fina e um processo cognitivo de dupla tarefa. Para acionar um botão em um tablet, a criança precisa:" },
      { type: "p", text: "Olhar para a tela (processamento visual)." },
      { type: "p", text: "Mapear espacialmente a posição do ícone." },
      { type: "p", text: "Guiar o dedo até o vidro liso sem encostar em áreas adjacentes (sem feedback físico de limite)." },
      { type: "p", text: "Confiar que o toque foi registrado pelo software." },
      { type: "p", text: "Muitas crianças no espectro autista lidam com Transtorno do Processamento Sensorial (TPS) ou déficits na propriocepção — a capacidade neurológica de saber onde os membros do corpo estão no espaço sem precisar olhar para eles." },
      { type: "p", text: "Em uma tela de vidro, não há limites táteis. O dedo desliza sem atrito ou barreiras. Isso força a criança a manter os olhos fixos na tela o tempo todo, aumentando a fadiga visual e a carga cognitiva. O painel físico elimina essa necessidade. Um botão mecânico possui bordas, altura e relevo. A criança pode tatear o painel, encontrar o botão pelo contorno físico e pressioná-lo de forma assertiva, muitas vezes sem sequer olhar para o dispositivo. O hardware se adapta à motricidade do usuário, e não o oposto." },
      { type: "h3", text: "2. O Ciclo de Feedback: A Validação do \"Clique\" Mecânico" },
      { type: "p", text: "Em interfaces computacionais, o \"feedback\" é o que confirma ao usuário que a máquina registrou sua intenção. Em telas, esse feedback é predominantemente visual (o ícone pisca) ou depende de um micro-motor de vibração genérico." },
      { type: "p", text: "Para um cérebro com processamento atípico, a latência entre encostar no vidro e o software processar o áudio pode gerar dissonância. O botão físico de curso profundo (como micro-switches de arcade) resolve isso na camada de hardware através do Feedback Háptico Nativo." },
      { type: "p", text: "**Explicação Técnica:** Quando a criança pressiona um botão mecânico, há uma resistência elástica (a mola) seguida de um colapso tátil (o acionamento do interruptor de metal) que gera um som audível natural (o \"clique\"). Antes mesmo do processador Arduino interpretar o sinal elétrico e disparar a voz sintetizada, o cérebro da criança já recebeu confirmação tátil e auditiva mecânica de que a ação foi concluída. Esse ciclo de validação imediata é crucial para reforçar a relação de \"causa e efeito\" no aprendizado da comunicação." },
      { type: "h3", text: "3. Mapeamento Tátil: Texturas como Metadados de Comunicação" },
      { type: "p", text: "Aqui reside a maior inovação do painel físico em relação às telas: a codificação de informações através do tato." },
      { type: "p", text: "Em um sistema PECS clássico, a comunicação é 100% visual (a criança olha a imagem e associa ao conceito). Ao adicionar texturas diferentes às superfícies dos botões, criamos vias neurológicas redundantes para o aprendizado. A textura atua como um \"metadado\" físico daquela palavra." },
      { type: "p", text: "**Categorização Sensorial:** Botões que expressam necessidades fisiológicas urgentes (Fome, Sede, Banheiro) podem ter superfícies rugosas, de alta fricção (como lixa fina ou impressão 3D texturizada). Botões de emoções ou conforto (Abraço, Brinquedo) podem ser revestidos com EVA, silicone ou tecidos macios." },
      { type: "p", text: "**Acessibilidade em Crises:** Durante uma crise de sobrecarga sensorial (Meltdown), a capacidade de processamento visual da criança autista frequentemente cai drasticamente. A visão entra em \"túnel\" ou a criança fecha os olhos. Uma tela touch torna-se completamente inútil nesse estado. Um painel fisicamente texturizado permite que a criança encontre o botão de \"Ajuda\" ou \"Silêncio\" sentindo o padrão tátil com as pontas dos dedos, utilizando uma via sensorial que não foi sobrecarregada." },
      { type: "h3", text: "4. Implementação de Engenharia e Materiais" },
      { type: "p", text: "Do ponto de vista da fabricação e replicação técnica, a criação de superfícies texturizadas é simples e escalável, fugindo da dependência de hardware caro." },
      { type: "p", text: "As capas dos botões (caps) podem ser projetadas em software CAD 3D e impressas utilizando diferentes filamentos." },
      { type: "p", text: "**PLA/ABS:** Para botões rígidos e lisos, ou com ranhuras topográficas impressas no próprio plástico." },
      { type: "p", text: "**TPU (Poliuretano Termoplástico):** Um filamento flexível que permite imprimir botões com textura emborrachada, deformáveis ao toque." },
      { type: "p", text: "Para famílias replicando o projeto em casa sem impressoras 3D, a arquitetura permite a \"modificação de superfície\" (Surface Modding). Utiliza-se botões flat de fliperama (24mm ou 30mm) e cola-se na superfície materiais cotidianos: o lado áspero do velcro, feltro, couro sintético, ou gotas de cola quente curada para formar pontos de relevo (semelhante ao Braille, mas para conceitos macro)." },
      { type: "h3", text: "5. Durabilidade Estrutural e Comportamentos Estereotipados (Stimming)" },
      { type: "p", text: "Dispositivos para o público infantil, especialmente atípico, precisam de especificações de resistência quase industriais." },
      { type: "p", text: "Crianças no espectro autista frequentemente apresentam comportamentos estereotipados (\"Stimming\"), que podem envolver bater palmas, balançar as mãos ou aplicar pressão repetitiva em objetos. Um tablet de mil reais com tela de vidro é altamente suscetível a quebra sob pressão repetitiva ou se a criança bater nele durante uma frustração." },
      { type: "p", text: "A arquitetura com botões mecânicos e carcaça plástica (ou de madeira) transforma o dispositivo PECS em uma ferramenta de \"Stimming seguro\". Botões de fliperama são projetados especificamente para suportar milhões de ciclos de golpes contundentes em ambientes hostis. A criança pode pressionar o botão repetidas vezes, usar força excessiva ou bater no painel, e o hardware resistirá. A interface não é frágil; ela acolhe a força e o comportamento do usuário sem penalizá-lo com a quebra do equipamento." },
      { type: "p", text: "Em suma, a rejeição das telas touch e a adoção de um design focado em texturas e mecânica profunda elevam o dispositivo de um mero \"reprodutor de áudio\" para uma interface sensorialmente amigável, fisicamente indestrutível e cognitivamente mapeada para as realidades neurológicas do espectro autista." },
    ],
  },
];

function DiarioPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const activePost = posts.find((p) => p.id === openId) ?? null;

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
              onClick={() => setOpenId(post.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenId(post.id);
                }
              }}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 hover:shadow-lg transition-shadow cursor-pointer group text-left w-full"
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

      <Dialog open={openId !== null} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto p-8">
          {activePost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight text-slate-900">
                  {activePost.modalTitle}
                </DialogTitle>
                <DialogDescription className="text-base text-text-muted italic">
                  {activePost.modalSubtitle}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-4 leading-relaxed text-[15px] text-slate-700">
                {activePost.content.map((block, i) => {
                  if (block.type === "h2") {
                    return (
                      <h2 key={i} className="text-2xl font-bold mt-6 text-slate-900">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "h3") {
                    return (
                      <h3 key={i} className="text-lg font-bold mt-5 text-slate-900">
                        {block.text}
                      </h3>
                    );
                  }
                  return (
                    <p key={i} className="leading-relaxed">
                      {renderInline(block.text)}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
