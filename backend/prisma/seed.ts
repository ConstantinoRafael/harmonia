import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workshops = [
    {
      title: "Jogos Teatrais do Teatro do Oprimido",
      description: `Jogos teatrais do Teatro do Oprimido são exercícios, técnicas para o ator e também o
não-ator com vontade de dizer algo através do teatro. Serve para todas as pessoas
interessadas na aplicação de técnicas teatrais em atividades humanísticas como a psicologia,
psicoterapia, arte, educação, trabalho social e político. Servem para criação de personagens
em peças realistas ou não, dramáticas ou épicas. O Teatro do Oprimido é teatro no sentido mais
antigo da palavra: todos os seres humanos são atores, porque agem, e espectadores porque
observam. Somos todos espect-atores.`,
      professorName: "Helga Nemetik",
      date: new Date("2025-02-10T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Harmonia Vocal Para Teatro Musical - Wicked",
      description: `O Workshop de Harmonia Vocal Para Teatro Musical foi criado a partir da necessidade de
desenvolvimento da percepção dos atores/atrizes para as peças musicais que, cada vez mais,
apresentam arranjos vocais. Para isso, os alunos têm acesso a um material formado por números
musicais compostos especificamente para o teatro.

O principal objetivo é fazer com que os alunos entendam a timbragem através dos processos de
escuta coletiva.

Como o workshop se refere ao teatro musical, além do trabalho vocal, em alguns momentos
também são utilizados recursos cênicos com o grupo.`,
      professorName: "Tony Lucchesi",
      date: new Date("2025-02-10T18:00:00.000Z"),
      duration: 240, // 4 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },

    {
      title: "Teatralidade na Dança",
      description: `No Teatro Musical, a dança vai além de passos e sequências coreográficas — ela é uma
      poderosa ferramenta para contar histórias. O movimento não apenas acompanha a música, mas
      transmite emoções, intenções e a essência de um enredo.
      
      No workshop "Teatralidade na Dança", Larissa Landim compartilha sua vivência e pesquisa sobre
      como integrar a expressividade cênica ao movimento. Através de histórias e sequências
      coreográficas, os participantes aprenderão a infundir personalidade e emoção em sua dança,
      tornando-a não apenas técnica, mas verdadeiramente vivaz e cheia de significado.`,
      professorName: "Larissa Landim",
      date: new Date("2025-02-11T10:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Atuação Para Teatro Musical",
      description: `O curso tem como enfoque as técnicas de interpretação voltadas para o teatro musical. Os
      alunos vão experimentar exercícios de expressão corporal, improvisação, jogos teatrais,
      preparação de cenas, interpretação com enfoque na canção e uma reflexão escrita da
      experiência vivenciada. O curso tem como objetivo expandir a capacidade artística dos alunos.`,
      professorName: "Anderson Rosa",
      date: new Date("2025-02-11T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Dança Para Teatro Musical - Hamilton",
      description: `No curso de dança pra teatro musical trabalharemos o Musical Hamilton.
      Um musical que combina estilos de dança como Jazz e hip hop.
      Um musical influenciado pela dança social.`,
      professorName: "Ariane Rocha",
      date: new Date("2025-02-11T19:30:00.000Z"),
      duration: 120, // 2 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Preparo Físico Para Atores",
      description: `Atuar, dançar e cantar ao mesmo tempo, mantendo a leveza e a energia — esse é um dos
    maiores desafios para os atores de Teatro Musical.
    
    A exigência de uma performance completa, que exige de você resistência, flexibilidade e
    coordenação, pede muito mais do que técnica. Manter-se em forma e com o corpo preparado
    para os intensos ensaios e apresentações é essencial.
    
    Neste workshop, vamos trabalhar o preparo físico necessário para enfrentar as demandas do
    musical, com foco em alongamento, fortalecimento muscular e exercícios de coordenação. Aqui,
    você aprenderá a otimizar seu desempenho, seja nas coreografias mais exigentes ou nas longas
    jornadas de ensaio, tudo sem perder a energia ou a leveza.`,
      professorName: "Larissa Landim",
      date: new Date("2025-02-13T10:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Interpretação da Canção - Broadway",
      description: `Neste workshop, os alunos irão praticar a arte de atuar cantando. Receberão noções de estilo e
    técnica vocal, voltados especificamente para o repertório escolhido, sendo desafiados no limite
    de suas capacidades técnicas e expressivas.
    
    E para além do canto, através da utilização de
    diferentes técnicas teatrais, terão noções de análise de letra, gestalt da palavra, estilos de
    interpretação, construção de personagem, consciência corporal, história e dramaturgia do teatro
    musical.`,
      professorName: "Menelick de Carvalho & Tony Lucchesi",
      date: new Date("2025-02-13T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 15,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Dança Para Teatro Musical - O Rei do Show",
      description: `No curso de dança pra teatro musical, trabalharemos o Musical O Rei do Show, com três músicas
    que marcaram o espetáculo.
    
    Esse musical combina estilos de dança como Jazz, danças livres e Jazz funk.`,
      professorName: "Ariane Rocha",
      date: new Date("2025-02-13T19:30:00.000Z"),
      duration: 120, // 2 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Técnica Vocal Para Teatro Musical",
      description: `A oficina pretende estimular o aluno a mergulhar no processo de estudo do repertório, através de
    ferramentas expressivas, técnicas e musicais.
    
    Conteúdo: Aulas práticas de experimentação através de vocalises, jogos musicais e estudo dos
    solos de teatro musical. Não há pré-requisitos para participação. Idade mínima 16 anos.`,
      professorName: "Chiara Santoro",
      date: new Date("2025-02-14T10:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Sapateado Iniciante - Cantando na Chuva",
      description: `Para quem nunca dançou sapateado mas sempre quis aprender ou já tem experiência e deseja
    retomar.
    
    Inspire-se nas icônicas músicas do musical "Cantando na Chuva", que é sinônimo de sapateado,
    dançando ao som de clássicos como "Singin' in the Rain" e "Good Morning".
    
    Esta é uma oportunidade de aprender os fundamentos do sapateado ou aperfeiçoar suas
    habilidades e desenvolver sua coordenação e ritmo.
    
    Além disso, você vai se divertir dançando ao som de músicas clássicas e desafiar-se com novos
    passos e coreografias.`,
      professorName: "Thiago Murro",
      date: new Date("2025-02-14T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Material de Audição - Organização e Escolhas",
      description: `A partitura é material de trabalho essencial para o artista de teatro musical. Nesta aula,
    discutiremos os diversos modelos comerciais de escrita musical disponíveis no mercado e quais
    são os mais recomendados para um processo de audição.
    
    Além disso, demonstraremos cuidados básicos de comunicação escrita e oral com o pianista de audição.`,
      professorName: "Guilherme Borges & Tony Lucchesi",
      date: new Date("2025-02-14T18:00:00.000Z"),
      duration: 240, // 4 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title:
        "Atuação Para Teatro Musical - Infantojuvenil (até 16 anos) - Parte 1",
      description: `Curso de interpretação para crianças e adolescentes voltados para o teatro musical. 
    
    O curso tem como objetivo potencializar e expandir a experiência artística através de jogos teatrais,
    experimentações cênicas, improvisação, músicas e criação de histórias, tudo isso através de um
    ambiente lúdico e criativo.`,
      professorName: "Anderson Rosa",
      date: new Date("2025-02-15T10:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 15,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: true,
    },
    {
      title:
        "Atuação Para Teatro Musical - Infantojuvenil (até 16 anos) - Parte 2",
      description: `Curso de interpretação para crianças e adolescentes voltados para o teatro musical. 
    
    O curso tem como objetivo potencializar e expandir a experiência artística através de jogos teatrais,
    experimentações cênicas, improvisação, músicas e criação de histórias, tudo isso através de um
    ambiente lúdico e criativo.`,
      professorName: "Anderson Rosa",
      date: new Date("2025-02-16T10:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 15,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: true,
    },
    {
      title: "Sapateado Para Teatro Musical",
      description: `Ritmo e coordenação aliados ao Teatro Musical.
    
    O Workshop tem o objetivo de apresentar ao aluno os princípios básicos do Sapateado, além de
    desenvolver sua coordenação e ritmo.`,
      professorName: "Marcela Pires",
      date: new Date("2025-02-16T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Transformando a História em Texto",
      description: `“Transformando ideias em texto: Curso básico de dramaturgia” é um curso intensivo teórico-prático
    que pretende inserir os alunos no universo da dramaturgia para teatro. 
    
    Nossas aulas serão focadas em gerar ferramentas para que nossos alunos-artistas possam escrever seu
    próprio texto teatral. O workshop irá passear pela história do teatro e analisar características
    estruturantes de diversos movimentos artísticos, relacionando a época que estão inseridos.
    
    Pretendendo a partir da observação, revelar às múltiplas possibilidades de escrita para teatro.
    Vamos tratar rapidamente sobre as principais obras do teatro ocidental, bibliografia esta que não
    será obrigatória, mas que será um complemento para o workshop.
    
    O curso é voltado para qual tipo de público?
    Pessoas interessadas em textos teatrais e principalmente artistas que desejam transformar suas
    ideias em obras dramatúrgicas.`,
      professorName: "Tauã Delmiro",
      date: new Date("2025-02-17T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Harmonia Vocal Para Teatro Musical - O Antimusical",
      description: `O Workshop de Harmonia Vocal Para Teatro Musical foi criado a partir da necessidade de
    desenvolvimento da percepção dos atores/atrizes para as peças musicais que, cada vez mais,
    apresentam arranjos vocais.
    
    Para isso, os alunos têm acesso a um material formado por números musicais compostos especificamente para o teatro.
    
    O principal objetivo é fazer com que os alunos entendam a timbragem através dos processos de
    escuta coletiva.
    
    Como o workshop se refere ao teatro musical, além do trabalho vocal, em alguns momentos
    também são utilizados recursos cênicos com o grupo.`,
      professorName: "Tony Lucchesi",
      date: new Date("2025-02-17T18:00:00.000Z"),
      duration: 240, // 4 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Dança Para Teatro Musical - Fosse - Parte 1",
      description: `Um curso voltado para o público do Musical que tem interesse em se aprofundar na técnica e
    história do grande coreógrafo e bailarino, Bob Fosse.`,
      professorName: "Bella Mac",
      date: new Date("2025-02-18T10:00:00.000Z"),
      duration: 120, // 2 horas
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Workshop de Atuação Cênica - O Despertar da Cena",
      description: `Venha explorar o clássico "O Despertar da Primavera", de Frank Wedekind, em um workshop que
    une análise dramatúrgica e prática cênica. 
    
    Vamos investigar as camadas psicológicas dos personagens e pesquisar caminhos para trazê-las para o palco com verdade e emoção.
    
    Conteúdo Programático:
    - Relaxamento, alongamento e dinâmicas de grupo para preparação corporal e integração.
    - Leitura e análise detalhada de cenas pré-selecionadas, destacando subtextos e motivações dos personagens.
    - Experimentação prática das cenas a partir de provocações.`,
      professorName: "Leandro Moura",
      date: new Date("2025-02-18T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Escrevendo Para Teatro - Parte 1",
      description: `Neste workshop intensivo de dois dias, exploraremos a escrita teatral a partir da riqueza da
    cultura brasileira, utilizando ferramentas fundamentais para o desenvolvimento de roteiros
    sólidos. 
    
    A partir da estrutura clássica de três atos, passaremos por teóricos essenciais para entender as estruturas de um roteiro completo.
    
    Além da teoria, a prática será um elemento-chave: os participantes desenvolverão cenas e
    esboços de roteiros, experimentando técnicas que ajudam a transformar ideias em textos teatrais
    envolventes. Trabalharemos a construção de personagens, diálogos, ritmo e progressão
    dramática, sempre conectando a dramaturgia à identidade e à diversidade da cultura brasileira.`,
      professorName: "Pedro Henrique Lopes",
      date: new Date("2025-02-18T19:00:00.000Z"),
      duration: 150, // 2 horas e 30 minutos
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },

    {
      title: "Dança Para Teatro Musical - Fosse - Parte 2",
      description: `Um curso voltado para o público do Musical que tem interesse em se aprofundar na técnica e
      história do grande coreógrafo e bailarino, Bob Fosse.`,
      professorName: "Bella Mac",
      date: new Date("2025-02-20T10:00:00.000Z"),
      duration: 120, // 2 horas
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Interpretação da Canção - Chico Buarque",
      description: `Neste workshop, os alunos irão praticar a arte de atuar cantando. Receberão noções de estilo e
      técnica vocal, voltados especificamente para o repertório escolhido (músicas de Chico Buarque),
      sendo desafiados no limite de suas capacidades técnicas e expressivas. 
      
      E para além do canto, através da utilização de diferentes técnicas teatrais, terão noções de análise de letra, gestalt da
      palavra, estilos de interpretação, construção de personagem, consciência corporal, história e
      dramaturgia do teatro musical.`,
      professorName: "Menelick de Carvalho & Tony Lucchesi",
      date: new Date("2025-02-20T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 15,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Inteligência Cênica - Liberte Sua Criatividade no Palco",
      description: `Desenvolver a presença corporal e a clareza na comunicação. Ajudar os participantes a se
      desinibirem e liberarem a criatividade no palco. Explorar e aplicar as técnicas de Viewpoint,
      aprimorando a percepção espacial e emocional na performance.
      
      • Inteligência cênica - corpo e mente conectados. A importância da consciência corporal e
      espacial para a performance no palco e na vida.
      • O poder da palavra para fortalecer a presença do ator. Técnica de Camilla Amado - a
      tônica das palavras.
      • Introdução às técnicas de Viewpoint (movimento, tempo, espaço, etc.). Como os
      Viewpoints contribuem para a construção da cena e do personagem.
      • Dinâmicas que combinam as técnicas ensinadas, utilizando elementos de movimento,
      percepção e comunicação verbal.
      
      O workshop será conduzido de forma prática, com foco em atividades corporais, improvisação e
      jogos teatrais. O método de Viewpoints é utilizado como uma ferramenta para explorar o
      movimento e o espaço cênico.
      
      Público-alvo: Atores e não atores, bailarinos, cantores e pessoas de outras áreas que queiram
      melhorar a sua presença e a forma de se colocar frente ao mundo.`,
      professorName: "Rafaela Amado",
      date: new Date("2025-02-20T19:30:00.000Z"),
      duration: 150, // 2 horas e 30 minutos
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Produção na Veia",
      description: `Enquanto o telefone não toca, bora produzir?
        
        Um encontro voltado a conhecer as ferramentas estratégicas para o artista que pretende criar suas próprias oportunidades.
        
        Palavras-chave para o encontro:
        Pesquisar, elaborar, projetar, viabilizar, orçamento, financiamento, equipe, autoproduzir, produção, administração, organização, criação.
        
        Isabela Reis é atriz, cineasta e produtora cultural. Diretora da empresa Fogueira Doce Filmes e Produções Culturais. Vencedora do prêmio FITA de melhor produtora de espetáculo (2024), pelo musical "Kafka e a Boneca Viajante". 
        
        Como diretora de produção e produtora executiva, acumula espetáculos teatrais, musicais e festa literária. Por 15 anos coordenou os projetos culturais da ONG Grupo Pensar Cultural. Como diretora de produção e assistente de direção, participou de curtas, longas, webséries e videoclipe, muitos deles premiados e indicados em diversos festivais nacionais e internacionais. 
        
        Criadora do podcast "Produção na Veia", voltado para entrevistas de profissionais do mercado da produção cultural.`,
      professorName: "Isabela Reis",
      date: new Date("2025-02-21T10:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Sapateado Iniciante - Beetlejuice",
      description: `Para quem nunca dançou sapateado mas sempre quis aprender ou já tem experiência e deseja reviver.
        
        Vamos dançar inspirados em "Beetlejuice", da Broadway, ao som de hits como "That Beautiful Sound" e "What I Know Now".
        
        Esta é uma oportunidade de retomar ou ter o primeiro contato com o sapateado, trabalhando coordenação motora e ritmo. Você vai se divertir e desafiar com sequências coreográficas cheias de energia e expressão.`,
      professorName: "Thiago Murro",
      date: new Date("2025-02-21T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Escrevendo Para Teatro - Parte 2",
      description: `Neste workshop intensivo de dois dias, exploraremos a escrita teatral a partir da riqueza da cultura brasileira, utilizando ferramentas fundamentais para o desenvolvimento de roteiros sólidos. 
        
        A partir da estrutura clássica de três atos, passaremos por teóricos essenciais para entender as estruturas de um roteiro completo.
        
        Além da teoria, a prática será um elemento-chave: os participantes desenvolverão cenas e esboços de roteiros, experimentando técnicas que ajudam a transformar ideias em textos teatrais envolventes. Trabalharemos a construção de personagens, diálogos, ritmo e progressão dramática, sempre conectando a dramaturgia à identidade e à diversidade da cultura brasileira.`,
      professorName: "Pedro Henrique Lopes",
      date: new Date("2025-02-21T19:00:00.000Z"),
      duration: 150, // 2 horas e 30 minutos
      capacity: 20,
      address: "Rua Uruguai, 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Repertório Brasileiro Para o Ator de Musical",
      description: `O workshop de repertório brasileiro apresenta ao ator formas de abordar diferentes estilos de música brasileira, através do contexto histórico cultural, apreciação musical e análise de técnica vocal.
    
    Será uma aula em formato masterclass, portanto os alunos são encorajados a trazer um solo para ser trabalhado ou analisado.`,
      professorName: "Guilherme Borges",
      date: new Date("2025-02-21T20:30:00.000Z"),
      duration: 90, // 1 hora e 30 minutos
      capacity: 20,
      address: "Rua General Espírito Santo - 57A - Tijuca - RJ",
      isInfantojuvenil: false,
    },
    {
      title: "Cantando Disney - Infantojuvenil (até 16 anos)",
      description: `Mergulhe no universo do teatro musical com as inesquecíveis canções da Disney! 
    
    Neste workshop, crianças e adolescentes serão introduzidos à técnica vocal e à interpretação de forma divertida, explorando as possibilidades da voz através das canções mais icônicas da Disney!`,
      professorName: "Carol Donato",
      date: new Date("2025-02-22T10:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: true,
    },
    {
      title: "Condicionamento e Harmonia Vocal",
      description: `O workshop propõe o aprendizado de um número em que o artista cante e dance simultaneamente. 
    
    Para isso, os alunos aprenderão o arranjo vocal e realizarão exercícios que ajudarão no condicionamento físico.`,
      professorName: "Victor Maia & Tony Lucchesi",
      date: new Date("2025-02-22T14:00:00.000Z"),
      duration: 180, // 3 horas
      capacity: 20,
      address: "Rua Uruguai 317 - Sala 3 - Tijuca - RJ",
      isInfantojuvenil: false,
    },
  ];

  // Inserindo os workshops no banco
  for (const workshop of workshops) {
    await prisma.workshop.create({ data: workshop });
  }

  console.log("Seed data (primeira parte) criada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
