import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from 'lucide-react';

const CATEGORY_CRITERIA = {
  'Taxista do Ano': {
    description: 'Reconhece profissionais que entregam serviço seguro, ético e exemplar no transporte urbano.',
    items: [
      {
        name: 'Histórico profissional',
        description: 'Experiência comprovada, referências comunitárias e ausência de infrações graves.',
       
      },
      {
        name: 'Segurança e documentação',
        description: 'Carta, documentos do veículo, seguro obrigatório e inspeções em dia.',
        weight: '20%',
      },
      {
        name: 'Atendimento ao passageiro',
        description: 'Feedback positivo, trato cordial, suporte a passageiros com necessidades especiais.',
        weight: '25%',
      },
      {
        name: 'Impacto social',
        description: 'Participação em iniciativas comunitárias, exemplos de solidariedade e cidadania.',
        weight: '20%',
      },
      {
        name: 'Formação e inovação',
        description: 'Participação em formações, uso de tecnologia e boas práticas de gestão.',
        weight: '10%',
      },
    ],
  },
  'Mototaxista do Ano': {
    description: 'Premia mototaxistas que representam segurança, compromisso social e atendimento exemplar.',
    items: [
      {
        name: 'Condução defensiva',
        description: 'Comprovação de formação, histórico de segurança e uso de equipamentos adequados.',
        weight: '30%',
      },
      {
        name: 'Documentação e seguro',
        description: 'Carta, documentos da moto e seguros válidos.',
        weight: '20%',
      },
      {
        name: 'Relacionamento comunitário',
        description: 'Atuação positiva e reconhecida na comunidade onde opera.',
        weight: '20%',
      },
      {
        name: 'História inspiradora',
        description: 'Iniciativas de apoio, solidariedade ou ação de destaque.',
        weight: '20%',
      },
      {
        name: 'Formação contínua',
        description: 'Participação em workshops, certificações e actualizações.',
        weight: '10%',
      },
    ],
  },
  'Exemplo do Ano': {
    description: 'Celebra histórias extraordinárias de coragem, solidariedade e impacto social.',
    items: [
      {
        name: 'Relevância do acto',
        description: 'Impacto positivo do episódio relatado e benefício gerado.',
        weight: '40%',
      },
      {
        name: 'Testemunhos e evidências',
        description: 'Provas documentais, depoimentos e reconhecimento público.',
        weight: '25%',
      },
      {
        name: 'Conduta ética contínua',
        description: 'Histórico profissional alinhado aos valores do PRENTMA.',
        weight: '20%',
      },
      {
        name: 'Multiplicador de boas práticas',
        description: 'Capacidade de inspirar outros profissionais.',
        weight: '15%',
      },
    ],
  },
  'Cooperativa do Ano': {
    description: 'Valoriza organizações que elevam a gestão, formação e inovação no sector.',
    items: [
      {
        name: 'Gestão e compliance',
        description: 'Estrutura formal, cumprimento das obrigações legais e financeiras.',
        weight: '25%',
      },
      {
        name: 'Segurança operacional',
        description: 'Programa de manutenção, seguros colectivos e estatísticas positivas.',
        weight: '20%',
      },
      {
        name: 'Desenvolvimento dos membros',
        description: 'Formações, apoio social e programas de reconhecimento interno.',
        weight: '25%',
      },
      {
        name: 'Inovação e tecnologia',
        description: 'Uso de ferramentas digitais, gestão de dados e novos serviços.',
        weight: '15%',
      },
      {
        name: 'Impacto na comunidade',
        description: 'Projectos sociais, colaboração com autoridades e contributo para mobilidade urbana.',
        weight: '15%',
      },
    ],
  },
};

const evaluationModel = [
  {
    title: 'Avaliação técnica',
    description: 'Painel de especialistas analisa cada candidatura com base nos critérios oficiais.',
    weight: '40%',
  },
  
  {
    title: 'Avaliação de pares',
    description: 'Representantes das associações elegem colegas que inspiram o sector.',
    weight: '20%',
  },
  {
    title: 'Impacto social',
    description: 'Análise do contributo para a comunidade e cidadania rodoviária.',
    weight: '10%',
  },
];

const scoreScale = [
  { label: 'Insuficiente', score: 1, description: 'Não atende aos requisitos mínimos.' },
  { label: 'Suficiente', score: 2, description: 'Cumpre parcialmente o esperado.' },
  { label: 'Bom', score: 3, description: 'Entrega o padrão requerido.' },
  { label: 'Muito bom', score: 4, description: 'Supera consistentemente o esperado.' },
  { label: 'Excelente', score: 5, description: 'Referência no sector, desempenho exemplar.' },
];

export const Criteria = () => {
  const [activeCategory, setActiveCategory] = useState('Taxista do Ano');
  const heroStyle = useMemo(
    () => ({
      backgroundImage: "linear-gradient(120deg, rgba(0,61,136,0.85), rgba(0,113,192,0.7)), url('https://images.unsplash.com/photo-1529429617124-aee7e1ff0a5b?auto=format&fit=crop&w=1600&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    []
  );

  const categoryNames = Object.keys(CATEGORY_CRITERIA);
  const categoryData = CATEGORY_CRITERIA[activeCategory];

  return (
    <div className="min-h-screen bg-[#0071C0] text-white font-sans">
      <section className="relative overflow-hidden pb-24 pt-24" style={heroStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Critérios oficiais
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Como avaliamos as candidaturas do PRENTMA
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            Transparência e rigor para reconhecer os melhores profissionais do transporte angolano.
          </p>
          <div className="flex flex-wrap gap-3">
            {categoryNames.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  category === activeCategory
                    ? "bg-white text-[#0071C0] shadow-sm"
                    : "bg-white/15 text-white/70 hover:bg-white/25"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-[#0071C0]">{activeCategory}</h2>
            <p className="max-w-3xl text-base font-normal text-[#171E43]/75">{categoryData.description}</p>
          </div>

          <div className="space-y-4">
            {categoryData.items.map((item) => (
              <Card key={item.name} className="border-[#D7E3FF] bg-[#F6F9FF] transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#0071C0]">{item.name}</h3>
                    <p className="text-sm font-normal text-[#171E43]/70">{item.description}</p>
                  </div>
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 lg:px-0">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center">

            {evaluationModel.map((item) => (
              <Card key={item.title} className="border-[#D7E3FF] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="space-y-3 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071C0]/10 text-[#0071C0]">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0071C0]">{item.title}</h3>
                  <p className="text-sm font-normal text-[#171E43]/70">{item.description}</p>
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <h2 className="text-3xl font-semibold text-[#0071C0]">Escala de pontuação</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {scoreScale.map((scale) => (
              <div key={scale.label} className="rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0071C0]">
                  <span className="text-lg font-semibold">{scale.score}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#0071C0]">{scale.label}</h3>
                <p className="mt-2 text-sm font-normal text-[#171E43]/70">{scale.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 px-4 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-[#0071C0]">Checklist antes de submeter</h2>
              <ul className="space-y-2 text-sm font-normal text-[#171E43]/70">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                  Confirme que a documentação essencial está digitalizada e atualizada.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                  Recolha testemunhos e evidências que comprovem o impacto da sua história.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                  Revise cada critério e assegure-se de fornecer exemplos concretos.
                </li>
              </ul>
            </div>
            <Button className="inline-flex items-center gap-2 bg-[#0071C0] px-6 py-3 text-white hover:bg-[#005ea5]">
              Candidatar-se agora
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
