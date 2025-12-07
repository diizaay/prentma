import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Filter,
  Mail,
  MapPin,
  Megaphone,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';

const HERO_IMAGES = [
  "linear-gradient(120deg, rgba(0,61,136,0.85), rgba(0,113,192,0.7)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
  "linear-gradient(120deg, rgba(0,71,155,0.85), rgba(0,113,192,0.7)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80')",
];

const EVENT_TYPES = [
  { value: 'all', label: 'Todos', icon: Filter },
  { value: 'inscricao', label: 'Inscrições', icon: Megaphone },
  { value: 'formacao', label: 'Formações', icon: Users },
  { value: 'avaliacao', label: 'Avaliação', icon: Sparkles },
  { value: 'premiacao', label: 'Premiação', icon: Trophy },
];

const EVENTS = [
  {
    id: 'launch',
    title: 'Confêrencia de lançamento do PRENTMA 2025',
    description: 'Apresentação oficial do concurso com parceiros institucionais e meios de comunicação.',
    date: '18 de Outubro 2025',
    time: '10h00',
    location: 'Hotel Zunelli - Luanda',
    type: 'inscricao',
  },
  {
    id: 'roadshow',
    title: 'Realização das selecções provinciais nas 21 províncias',
    description: 'Cada província terá até 20 de Novembro para concluir os processos de candidatura, avaliação e selecção.',
    date: '1 à 20 de Novembro',
    time: '08h00',
    location: 'Todas as províncias',
    type: 'formacao',
  },
  {
    id: 'triage',
    title: 'Avaliação nacional dos vencedores provinciais',
    description: 'Análise técnica e validação documental para definir finalistas regionais.',
    date: '23 de Novembro à 5 de Dezembro',
    time: '14h00',
    location: 'Comissão Nacional - Luanda',
    type: 'avaliacao',
  },
  {
    id: 'gala',
    title: 'Gala Nacional de Premiação',
    description: 'Cerimónia que reconhece os melhores taxistas, mototaxistas e cooperativas do país.',
    date: '13 Dezembro 2025',
    time: '18h00',
    location: 'Hotel Intercontinental - Luanda',
    type: 'premiacao',
  },
];

const TYPE_STYLES = {
  inscricao: 'bg-[#E6EEFF] text-[#0071C0]',
  formacao: 'bg-[#E8FFF5] text-[#1F8C62]',
  avaliacao: 'bg-[#F5ECFF] text-[#6B3EE8]',
  premiacao: 'bg-[#FFF1E6] text-[#C56A16]',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Events = () => {
  const [activeType, setActiveType] = useState('all');
  const [heroIndex, setHeroIndex] = useState(0);
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [agendaEmail, setAgendaEmail] = useState('');
  const [agendaError, setAgendaError] = useState('');
  const [isAgendaSubmitting, setIsAgendaSubmitting] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isAgendaOpen) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isAgendaOpen]);

  const heroStyle = useMemo(
    () => ({
      backgroundImage: HERO_IMAGES[heroIndex],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    [heroIndex]
  );

  const visibleEvents = activeType === 'all' ? EVENTS : EVENTS.filter((item) => item.type === activeType);

  const handleAgendaOpen = (event) => {
    setSelectedEvent(event);
    setIsAgendaOpen(true);
    setAgendaEmail('');
    setAgendaError('');
  };

  const handleAgendaClose = () => {
    setIsAgendaOpen(false);
    setSelectedEvent(null);
    setAgendaEmail('');
    setAgendaError('');
    setIsAgendaSubmitting(false);
  };

  const handleAgendaSubmit = (event) => {
    event.preventDefault();
    const normalizedEmail = agendaEmail.trim();

    if (!normalizedEmail || !EMAIL_PATTERN.test(normalizedEmail)) {
      setAgendaError('Introduza um e-mail valido.');
      return;
    }

    setAgendaError('');
    setIsAgendaSubmitting(true);

    setTimeout(() => {
      toast.custom((t) => (
        <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-white p-4 text-[#171E43] shadow-xl shadow-[#0071C0]/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0071C0]/10 text-[#0071C0]">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Agenda atualizada</p>
            <p className="text-xs text-[#171E43]/70">{selectedEvent?.title ?? 'Evento'} foi partilhada com {normalizedEmail}</p>
          </div>
          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-[#171E43]/40 transition hover:text-[#171E43]/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ));

      setIsAgendaSubmitting(false);
      handleAgendaClose();
    }, 800);
  };

  useEffect(() => {
    if (!isAgendaOpen) {
      return;
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleAgendaClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isAgendaOpen]);

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-24" style={heroStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Agenda PRENTMA
          </span>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Datas oficiais para acompanhar o concurso
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            Saiba quando acontecem os lancamentos, formações, etapas de avaliação e a gala nacional de premiação.
          </p>
          <div className="flex flex-wrap gap-3">
            {EVENT_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setActiveType(type.value)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm transition ${
                    isActive
                      ? "bg-white text-[#0071C0] shadow-sm"
                      : "bg-white/15 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-[#0071C0]">Proximas atividades</h2>
            <p className="max-w-3xl text-base font-normal text-[#171E43]/75">
              Seleccione um filtro para explorar cada momento da jornada PRENTMA 2025.
            </p>
          </div>

          <div className="space-y-6">
            {visibleEvents.map((event) => (
              <Card key={event.id} className="border-[#D7E3FF] bg-[#F6F9FF] transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-[#0071C0]">
                    <span className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2 text-[#171E43]/70">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2 text-[#171E43]/70">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                    <Badge className={`w-fit ${TYPE_STYLES[event.type] ?? 'bg-[#EEF4FF] text-[#0071C0]'}`}>
                      {EVENT_TYPES.find((item) => item.value === event.type)?.label}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-[#0071C0]">{event.title}</h3>
                    <p className="text-sm font-normal text-[#171E43]/75">{event.description}</p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleAgendaOpen(event)}
                    className="inline-flex items-center gap-2 bg-[#0071C0] text-white hover:bg-[#005ea5]"
                  >
                    Adicionar a agenda
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl grid gap-6 px-4 lg:grid-cols-3 lg:px-0">
          <Card className="border-[#D7E3FF] bg-white p-8 text-sm font-normal text-[#171E43]/70">
            <Sparkles className="h-6 w-6 text-[#0071C0]" />
            <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Mentorias exclusivas</h3>
            <p className="mt-2">Finalistas recebem apoio personalizado antes da gala nacional.</p>
          </Card>
          <Card className="border-[#D7E3FF] bg-white p-8 text-sm font-normal text-[#171E43]/70">
            <Users className="h-6 w-6 text-[#0071C0]" />
            <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Rede de parceiros</h3>
            <p className="mt-2">Instituições públicas e privadas garantem credibilidade a cada etapa.</p>
          </Card>
          <Card className="border-[#D7E3FF] bg-white p-8 text-sm font-normal text-[#171E43]/70">
            <Trophy className="h-6 w-6 text-[#0071C0]" />
            <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Gala de premiação</h3>
            <p className="mt-2">Uma noite para celebrar as histórias que transformam a mobilidade.</p>
          </Card>
        </div>
      </section>

      {isAgendaOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#081C3C]/70 backdrop-blur-sm"
            onClick={handleAgendaClose}
          />
          <div className="relative w-full max-w-lg rounded-[32px] bg-white p-6 text-[#171E43] shadow-2xl shadow-[#081C3C]/30 sm:p-8">
            <button
              type="button"
              onClick={handleAgendaClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0071C0]/20 text-[#0071C0] transition hover:bg-[#0071C0]/10"
              aria-label="Fechar modal"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EEF4FF] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
                  Agenda inteligente
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-semibold text-[#171E43]">{selectedEvent.title}</h3>
                  <p className="text-sm text-[#171E43]/70">{selectedEvent.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#0071C0]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-3 py-1">
                      <CalendarCheck className="h-3.5 w-3.5" />
                      {selectedEvent.date}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-3 py-1">
                      <Clock className="h-3.5 w-3.5" />
                      {selectedEvent.time}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-3 py-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {selectedEvent.location}
                    </span>
                  </div>
                </div>
              </div>
              <form onSubmit={handleAgendaSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0071C0]">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0071C0]" />
                    <input
                      type="email"
                      value={agendaEmail}
                      onChange={(event) => {
                        setAgendaEmail(event.target.value);
                        if (agendaError) {
                          setAgendaError('');
                        }
                      }}
                      placeholder="nome@exemplo.com"
                      className="w-full rounded-2xl border border-[#D7E3FF] bg-white/90 py-3 pl-12 pr-4 text-[#171E43] focus:border-[#0071C0] focus:outline-none focus:ring-2 focus:ring-[#0071C0]/20"
                    />
                  </div>
                  {agendaError && <p className="text-xs font-semibold text-[#C2271A]">{agendaError}</p>}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={handleAgendaClose}
                    className="inline-flex w-full justify-center rounded-full border border-[#0071C0]/25 px-4 py-2 text-sm font-semibold text-[#0071C0] transition hover:bg-[#0071C0]/10 sm:w-auto"
                  >
                    Cancelar
                  </button>
                  <Button
                    type="submit"
                    disabled={isAgendaSubmitting}
                    className="w-full rounded-full bg-[#0071C0] text-white hover:bg-[#005ea5] disabled:bg-[#0071C0]/50 sm:w-auto"
                  >
                    {isAgendaSubmitting ? 'A enviar...' : 'Guardar na minha agenda'}
                    {!isAgendaSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-[#EEF4FF] p-10 px-4 lg:flex-row lg:items-center lg:px-12">
          <div className="space-y-3 flex-1">
            <h2 className="text-3xl font-semibold text-[#0071C0]">Não perca nenhum anúncio</h2>
            <p className="text-base font-normal text-[#171E43]/75">
              Subscreva alertas e receba notificações sobre inscrições, mentorias e a gala final do PRENTMA 2025.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="bg-[#0071C0] text-white hover:bg-[#005ea5]">
              Receber notificações
            </Button>
            <Button
              variant="outline"
              className="border-[#0071C0]/40 text-[#0071C0] hover:bg-white/80"
              onClick={() => (window.location.href = '/inscricao')}
            >
              Fazer candidatura
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
