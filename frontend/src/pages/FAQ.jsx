import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  ArrowRight,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
} from 'lucide-react';

const FAQ_SECTIONS = [
  {
    title: 'Candidatura',
    items: [
      {
        question: 'Como faço a inscrição no PRENTMA?',
        answer:
          'Crie uma conta no portal, escolha a sua categoria, complete o formulário e carregue os documentos solicitados. Todo o processo é gratuito.',
      },
      {
        question: 'Posso alterar dados depois de submeter?',
        answer:
          'Sim, as candidaturas podem ser actualizadas até ao final do período oficial de inscrições.',
      },
    ],
  },
  {
    title: 'Elegibilidade',
    items: [
      {
        question: 'Quais os requisitos mínimos?',
        answer:
          'Experiência comprovada, documentação legal validada e inexistência de infrações graves nos últimos 12 meses.',
      },
      {
        question: 'Profissionais independentes podem participar?',
        answer:
          'Sim. Cooperativas e profissionais independentes são bem-vindos, desde que cumpram os critérios de cadastro.',
      },
    ],
  },
  {
    title: 'Avaliação',
    items: [
      {
        question: 'Como é feita a avaliação?',
        answer:
          'Combinamos avaliação técnica (40%), votação popular (30%), avaliação de pares (20%) e impacto social (10%).',
      },
      {
        question: 'Receberei feedback?',
        answer:
          'Todos os candidatos recebem um resumo com as pontuações e comentários do júri.',
      },
    ],
  },
];

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = useMemo(() => {
    if (!searchTerm) return FAQ_SECTIONS;
    const term = searchTerm.toLowerCase();
    return FAQ_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => item.question.toLowerCase().includes(term) || item.answer.toLowerCase().includes(term)
      ),
    })).filter((section) => section.items.length > 0);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            FAQ PRENTMA
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Respostas rápidas para avançar com a sua candidatura
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            Procure por palavras-chave ou explore as perguntas frequentes sobre inscrições, elegibilidade e avaliação.
          </p>
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Pesquisar respostas"
              className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          {filteredSections.map((section) => (
            <Card key={section.title} className="border-[#D7E3FF] bg-[#F6F9FF] transition hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-[#0071C0]" />
                <CardTitle className="text-lg font-semibold text-[#0071C0]">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-normal text-[#171E43]/75">
                {section.items.map((item) => (
                  <div key={item.question} className="rounded-2xl bg-white p-4">
                    <p className="font-semibold text-[#0071C0]">{item.question}</p>
                    <p className="mt-2 text-[#171E43]/75">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {filteredSections.length === 0 && (
            <div className="rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-8 text-center text-sm font-normal text-[#171E43]/70">
              Nenhuma resposta encontrada. Ajuste os termos de pesquisa ou fale com a nossa equipa.
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl grid gap-6 px-4 lg:grid-cols-3 lg:px-0">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Mail className="h-6 w-6 text-[#0071C0]" />
            <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Email</h3>
            <p className="mt-2 text-sm font-normal text-[#171E43]/70">suporte@prentma.ao</p>
            <Button variant="outline" className="mt-4 border-[#0071C0]/40 text-[#0071C0] hover:bg-white/80">
              Enviar mensagem
            </Button>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <Phone className="h-6 w-6 text-[#0071C0]" />
            <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Linha directa</h3>
            <p className="mt-2 text-sm font-normal text-[#171E43]/70">+244 900 000 000 · Seg-Sex 8h-18h</p>
            <Button variant="outline" className="mt-4 border-[#0071C0]/40 text-[#0071C0] hover:bg-white/80">
              Ligar agora
            </Button>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <MessageCircle className="h-6 w-6 text-[#0071C0]" />
            <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Chat ao vivo</h3>
            <p className="mt-2 text-sm font-normal text-[#171E43]/70">Converse com a nossa equipa directamente no portal.</p>
            <Button className="mt-4 inline-flex items-center gap-2 bg-[#0071C0] text-white hover:bg-[#005ea5]">
              Abrir chat
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
