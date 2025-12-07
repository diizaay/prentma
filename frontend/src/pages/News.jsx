import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  ArrowRight,
  CalendarCheck,
  Mail,
  Search,
  User,
} from 'lucide-react';

const HERO_IMAGES = [
  "linear-gradient(120deg, rgba(0, 61, 136, 0.85), rgba(0, 113, 192, 0.7)), url('Prentma2.jpg')",
  "linear-gradient(120deg, rgba(0, 49, 101, 0.9), rgba(0, 113, 192, 0.6)), url('Prentma5.jpg')",
];

const ARTICLES = [
  {
    id: 'launch',
    title: 'PRENTMA 2025 é lançado com agenda nacional',
    summary: 'O concurso regressa com novas categorias e um ecossistema digital para acompanhar as inscrições.',
    date: '1 Outubro 2025',
    author: 'Comissão PRENTMA',
    category: 'Destaques',
    image: 'Prentma1.jpg',
  },
  {
    id: 'partnerships',
    title: 'Seguradoras aderem ao programa de benefícios',
    summary: 'Empresas de seguro disponibilizam pacotes especiais para finalistas e cooperativas inscritas.',
    date: '15 Outubro 2025',
    author: 'ARSEG',
    category: 'Parcerias',
    image: 'Prentma2.jpg',
  },
  {
    id: 'criteria',
    title: 'Critérios de avaliação 2025 apresentados ao público',
    summary: 'Júri técnico divulga parâmetros que serão utilizados na triagem e avaliação nacional.',
    date: '20 Outubro 2025',
    author: 'Comissão Técnica',
    category: 'Regulamento',
    image: 'Prentma3.jpg',
  },
  {
    id: 'mentoria',
    title: 'Mentorias para finalistas terão formato híbrido',
    summary: 'Programa prevê sessões online e encontros presenciais nas principais províncias.',
    date: '3 Novembro 2025',
    author: 'Equipa de Formação',
    category: 'Formação',
    image: 'Prentma4.jpg',
  },
  {
    id: 'roadshow',
    title: 'Roadshow PRENTMA visita cooperativas em 21 províncias',
    summary: 'Iniciativa percorre o país para apoiar inscrições e recolher histórias inspiradoras.',
    date: '12 Novembro 2025',
    author: 'Equipa de Campo',
    category: 'Eventos',
    image: 'Prentma5.jpg',
  },
];

export const News = () => {
  const [heroIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroStyle = useMemo(
    () => ({
      backgroundImage: HERO_IMAGES[heroIndex],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    [heroIndex]
  );

  const filteredArticles = ARTICLES.filter((article) => {
    const term = search.toLowerCase();
    return (
      article.title.toLowerCase().includes(term) ||
      article.summary.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term)
    );
  });

  const featured = filteredArticles[0];
  const others = filteredArticles.slice(1);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-24" style={heroStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Notícias PRENTMA
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Actualizações oficiais e histórias do concurso
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            Acompanhe lançamentos, parcerias e bastidores do Prémio Nacional de Taxistas & Mototaxistas.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              type="search"
              placeholder="Pesquisar notícias"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:px-0">
          {featured && (
            <Card className="flex-1 border-[#D7E3FF] bg-[#F6F9FF] shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-64 w-full rounded-t-3xl object-cover"
              />
              <CardHeader className="space-y-3">
                <Badge className="w-fit rounded-full bg-[#E6EEFF] px-3 py-1 text-xs font-semibold text-[#0071C0]">
                  {featured.category}
                </Badge>
                <CardTitle className="text-2xl font-semibold text-[#0071C0]">
                  {featured.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm font-normal text-[#171E43]/60">
                  <span className="flex items-center gap-1">
                    <CalendarCheck className="h-4 w-4" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featured.author}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-normal text-[#171E43]/75">
                <p>{featured.summary}</p>
                <Button className="inline-flex items-center gap-2 bg-[#0071C0] text-white hover:bg-[#005ea5]">
                  Ler artigo completo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="flex-1 space-y-6">
            {others.map((article) => (
              <Card key={article.id} className="border-[#D7E3FF] bg-[#F6F9FF] transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge className="rounded-full bg-[#E6EEFF] px-3 py-1 text-xs font-semibold text-[#0071C0]">
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-2 text-xs font-semibold text-[#171E43]/60">
                      <CalendarCheck className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#0071C0]">{article.title}</h3>
                  <p className="text-sm font-normal text-[#171E43]/70">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#171E43]/50">Por {article.author}</span>
                    <Button
                      variant="outline"
                      className="border-[#0071C0]/30 text-[#0071C0] hover:bg-white"
                    >
                      Ler mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 px-4 text-center shadow-lg lg:px-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0071C0]/10 text-[#0071C0]">
            <Mail className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-[#0071C0]">Receba as novidades primeiro</h2>
          <p className="mt-3 text-base font-normal text-[#171E43]/75">
            Subscreva a newsletter do PRENTMA e fique a par de avisos importantes, chamadas para inscrições e momentos da gala.
          </p>
          {subscribed ? (
            <div className="mt-6 rounded-2xl border border-[#D3F1D7] bg-[#F0FFF3] p-6 text-sm font-semibold text-[#1F8C62]">
              Obrigado! Em breve receberá notificações no seu email.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Introduza o seu email"
                required
                className="flex-1 rounded-full border border-[#D7E3FF] bg-[#F6F9FF] px-5 py-3 text-sm font-normal text-[#171E43] focus:border-[#0071C0] focus:outline-none"
              />
              <Button type="submit" className="rounded-full bg-[#0071C0] px-6 py-3 text-white hover:bg-[#005ea5]">
                Subscrever
              </Button>
            </form>
          )}
        </div>
      </section>

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-[#EEF4FF] p-10 px-4 lg:flex-row lg:items-center lg:px-12">
          <div className="space-y-4 flex-1">
            <h2 className="text-3xl font-semibold text-[#0071C0]">
              Pronto para partilhar a sua história com Angola?
            </h2>
            <p className="text-base font-normal text-[#171E43]/75">
              Junte-se aos profissionais que lideram o futuro da mobilidade. Submeta a candidatura e receba suporte personalizado até à gala.
            </p>
          </div>
          <Button
            className="inline-flex items-center gap-2 bg-[#0071C0] px-6 py-3 text-white hover:bg-[#005ea5]"
            onClick={() => (window.location.href = '/inscricao')}
          >
            Candidatar-se agora
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};
