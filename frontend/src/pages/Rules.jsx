import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  ArrowRight,
  Award,
  Users,
  Trophy,
  FileText,
  ShieldCheck,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

export const Rules = () => {
  const [activeRuleTab, setActiveRuleTab] = useState(0);

  const sections = [
    {
      title: 'Objetivo e Finalidade',
      icon: Trophy,
      bullets: [
        'Reconhecer e premiar a excelência no sector do transporte.',
        'Promover melhores práticas de serviço e segurança.',
        'Valorização dos profissionais e visibilidade nacional.',
      ],
    },
    {
      title: 'Elegibilidade',
      icon: Users,
      bullets: [
        'Profissionais com pelo menos 1 ano de experiência comprovada.',
        'Documentação legal válida (carta, documentos do veículo).',
        'Idade mínima de 18 anos e ausência de antecedentes criminais graves.',
      ],
    },
    {
      title: 'Categorias de Premiação',
      icon: Award,
      bullets: [
        'Melhor Taxista, Melhor Mototaxista, Melhor Cooperativa e Inovação no Transporte.',
        'Cada candidato pode concorrer em apenas uma categoria por edição.',
      ],
    },
    {
      title: 'Processo de Candidatura',
      icon: FileText,
      bullets: [
        'Submissão através da plataforma online oficial.',
        'Período de candidaturas e envio de documentação em formato digital.',
      ],
    },
    {
      title: 'Documentação',
      icon: ShieldCheck,
      bullets: [
        'Bilhete de identidade ou passaporte.',
        'Carta de condução e documentos do veículo.',
        'Comprovativo de experiência (quando aplicável).',
      ],
    },
    {
      title: 'Critérios de Avaliação',
      icon: Calendar,
      bullets: [
        'Qualidade do serviço (30%), Segurança (25%), Atendimento (20%).',
        'Apresentação e Inovação (25% combinados).',
      ],
    },
  ];

  const rules = [
    {
      category: 'Condições Gerais',
      items: [
        'A participação no PRENTMA é gratuita e voluntária.',
        'Os organizadores podem alterar as regras mediante aviso prévio.',
        'Decisões do júri são finais e não admitem recurso.',
        'Candidaturas incompletas ou fora do prazo são excluídas.',
        'Os organizadores não se responsabilizam por problemas técnicos na submissão.',
      ],
    },
    {
      category: 'Direitos e Deveres',
      items: [
        'Candidatos têm direito a feedback sobre sua avaliação.',
        'Vencedores devem participar da cerimónia de premiação.',
        'É proibida campanha publicitária paga para votação.',
        'Candidatos autorizam o uso de sua imagem para divulgação.',
        'Informações pessoais são tratadas conforme a lei de proteção de dados.',
      ],
    },
    {
      category: 'Processo de Seleção',
      items: [
        'Avaliação em duas fases: técnica (70%) e popular (30%).',
        'Júri técnico composto por especialistas do sector.',
        'Votação popular aberta durante período específico.',
        'Candidatos podem ser contactados para esclarecimentos.',
        'Resultados são divulgados em cerimónia pública.',
      ],
    },
    {
      category: 'Prémios e Reconhecimento',
      items: [
        'Vencedores recebem troféu oficial do PRENTMA.',
        'Certificado de reconhecimento válido por 2 anos.',
        'Divulgação em media nacionais e plataformas digitais.',
        'Prémios monetários conforme categoria (a definir).',
      ],
    },
    {
      category: 'Disposições Finais',
      items: [
        'Regulamento entra em vigor na data de publicação.',
        'Casos omissos são decididos pela organização.',
        'Foro judicial de Luanda para resolução de conflitos.',
        'Dúvidas podem ser esclarecidas através dos contactos oficiais.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0071C0] text-white font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl px-4 lg:px-0">
          <Badge className="w-fit rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Regulamento Oficial
          </Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Regulamento do PRENTMA
          </h1>
          <p className="mt-4 max-w-2xl text-base font-normal text-white/85 sm:text-lg">
            Todas as regras, condições e procedimentos para participar no Prémio Nacional dos Taxistas e Mototaxistas de Angola.
          </p>

          
        </div>
      </section>

      {/* Content area */}
      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl px-4 lg:px-0">
          <div className="grid gap-8 md:grid-cols-3">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative overflow-hidden rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0071C0]/10 text-[#0071C0]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0071C0]">{s.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm font-normal text-[#171E43]/70">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-3">
                {rules.map((r, i) => (
                  <button
                    key={r.category}
                    type="button"
                    onClick={() => setActiveRuleTab(i)}
                    className={`rounded-full px-5 py-2 text-sm transition ${
                      activeRuleTab === i ? 'bg-[#0071C0] text-white shadow' : 'bg-[#F1F6FF] text-[#171E43]/80 hover:bg-[#E6EEFF]'
                    }`}
                  >
                    {r.category}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-[#D7E3FF] bg-white p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-[#0071C0]">Resumo rápido</h4>
                  <p className="mt-2 text-sm text-[#171E43]/75">
                    Clique numa categoria ao lado para ver as regras detalhadas. O regulamento é público e visa garantir transparência em todas as etapas do concurso.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[#F6F9FF] p-4">
                      <Sparkles className="h-5 w-5 text-[#0071C0]" />
                      <p className="mt-2 text-xs text-[#171E43]/70">Transparência e boas práticas</p>
                    </div>
                    <div className="rounded-2xl bg-[#F6F9FF] p-4">
                      <Zap className="h-5 w-5 text-[#0071C0]" />
                      <p className="mt-2 text-xs text-[#171E43]/70">Suporte e comunicação ativa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-[#D7E3FF] bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#171E43]">{rules[activeRuleTab].category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {rules[activeRuleTab].items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                        <div className="w-8 h-8 bg-[#0071C0] text-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold">{idx + 1}</span>
                        </div>
                        <div className="text-sm text-[#171E43]/90">{item}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      
      
    </div>
  );
};