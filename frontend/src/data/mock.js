// Mock data for PRENTMA - Prémio Nacional dos Taxistas e Mototaxistas de Angola

export const categories = [
  {
    id: 1,
    name: "Taxista do Ano",
    description: "Reconhece o profissional que se destaca pela qualidade do serviço, segurança e atendimento ao cliente",
    icon: "car",
    criteria: ["Qualidade do serviço", "Segurança", "Atendimento", "Pontualidade", "Veículo em bom estado"]
  },
  {
    id: 2,
    name: "Melhor Mototaxista",
    description: "Premia o mototaxista que demonstra excelência na prestação de serviços e responsabilidade",
    icon: "bike",
    criteria: ["Segurança viária", "Equipamentos de proteção", "Cortesia", "Conhecimento das vias", "Responsabilidade"]
  },
  {
    id: 3,
    name: "Melhor Cooperativa",
    description: "Reconhece a cooperativa que mais contribui para o desenvolvimento do setor",
    icon: "users",
    criteria: ["Organização", "Formação profissional", "Inovação", "Impacto social", "Sustentabilidade"]
  },
  {
    id: 4,
    name: "Inovação no Transporte",
    description: "Premia iniciativas inovadoras que melhoram a qualidade dos serviços de transporte",
    icon: "lightbulb",
    criteria: ["Criatividade", "Impacto positivo", "Sustentabilidade", "Replicabilidade", "Benefício social"]
  }
];

export const winners = [
  {
    id: 1,
    name: "João Manuel Silva",
    category: "Melhor Taxista",
    year: 2023,
    location: "Luanda",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    story: "15 anos de experiência, sempre com foco na segurança e satisfação do cliente"
  },
  {
    id: 2,
    name: "Maria Fernanda Costa",
    category: "Melhor Mototaxista",
    year: 2023,
    location: "Benguela",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=300&h=300&fit=crop&crop=face",
    story: "Pioneira no setor feminino de mototaxi, referência em segurança e profissionalismo"
  },
  {
    id: 3,
    name: "Cooperativa TransUnião",
    category: "Melhor Cooperativa",
    year: 2023,
    location: "Huambo",
    photo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop",
    story: "Mais de 200 associados, programas de formação e modernização do setor"
  }
];

export const events = [
  {
    id: 1,
    title: "Abertura das Inscrições PRENTMA 2025",
    date: "2024-03-01",
    type: "inscricao",
    description: "Início do período de candidaturas para todas as categorias"
  },
  {
    id: 2,
    title: "Workshop: Segurança no Transporte",
    date: "2024-04-15",
    type: "formacao",
    description: "Formação gratuita sobre melhores práticas de segurança"
  },
  {
    id: 3,
    title: "Votação Popular",
    date: "2024-05-01",
    type: "votacao",
    description: "Abertura da votação popular online"
  },
  {
    id: 4,
    title: "Cerimónia de Premiação",
    date: "2024-06-15",
    type: "premiacao",
    description: "Evento oficial de entrega dos prémios PRENTMA 2024"
  }
];

export const news = [
  {
    id: 1,
    title: "PRENTMA 2024: Novas Categorias e Critérios Actualizados",
    summary: "O prémio expande-se com novas categorias e critérios mais abrangentes para reconhecer a excelência no sector.",
    date: "2024-02-15",
    author: "Redação PRENTMA",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Parceria com Governo Fortalece Sector de Transporte",
    summary: "Nova parceria visa melhorar infraestruturas e qualificar profissionais do transporte informal.",
    date: "2024-02-10",
    author: "Ministério dos Transportes",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec6a4cdc?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Formação Gratuita para Candidatos ao PRENTMA",
    summary: "Programa de capacitação oferece cursos gratuitos sobre segurança, atendimento e gestão.",
    date: "2024-02-05",
    author: "Equipa PRENTMA",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "António Pereira",
    role: "Taxista há 12 anos",
    content: "O PRENTMA mudou a forma como vejo a minha profissão. Agora tenho orgulho de ser taxista e trabalho sempre para melhorar.",
    rating: 5
  },
  {
    id: 2,
    name: "Esperança Domingos",
    role: "Mototaxista",
    content: "Este prémio valoriza o nosso trabalho e mostra que podemos fazer a diferença na mobilidade urbana de Angola.",
    rating: 5
  },
  {
    id: 3,
    name: "Carlos Neto", 
    role: "Presidente de Cooperativa",
    content: "O PRENTMA incentiva a organização do sector e promove a melhoria contínua dos nossos serviços.",
    rating: 5
  }
];

export const stats = [
  { label: "Profissionais Registados", value: "2,500+" },
  { label: "Cooperativas Participantes", value: "30+" },
  { label: "Cidades Abrangidas", value: "21" },
  { label: "Anos de História", value: "1" }
];

export const criteriaDetails = {
  "Melhor Taxista": {
    description: "Avaliação baseada em múltiplos critérios que reflectem a excelência profissional",
    items: [
      { name: "Qualidade do Serviço", weight: "25%", description: "Pontualidade, rotas eficientes, conhecimento da cidade" },
      { name: "Segurança", weight: "25%", description: "Estado do veículo, cumprimento das normas de trânsito" },
      { name: "Atendimento", weight: "20%", description: "Cortesia, comunicação, respeito pelos clientes" },
      { name: "Apresentação", weight: "15%", description: "Higiene pessoal e do veículo, uniformidade" },
      { name: "Inovação", weight: "15%", description: "Uso de tecnologia, métodos modernos de trabalho" }
    ]
  },
  "Melhor Mototaxista": {
    description: "Critérios específicos para a modalidade de mototaxi",
    items: [
      { name: "Segurança Viária", weight: "30%", description: "Equipamentos de proteção, condução defensiva" },
      { name: "Responsabilidade", weight: "25%", description: "Cumprimento de horários, compromissos assumidos" },
      { name: "Conhecimento das Vias", weight: "20%", description: "Domínio das rotas, alternativas de percurso" },
      { name: "Atendimento", weight: "15%", description: "Cortesia, comunicação eficaz" },
      { name: "Estado da Motocicleta", weight: "10%", description: "Manutenção, limpeza, documentação em dia" }
    ]
  }
};