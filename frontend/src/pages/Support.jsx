import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { formatDateTime } from '../lib/utils';
import {
  ArrowRight,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const CHANNELS = [
  {
    title: 'Email de suporte',
    description: 'Questões gerais, documentação e relatórios.',
    detail: 'suporte@prentma.ao',
    icon: Mail,
  },
  {
    title: 'Linha directa',
    description: 'Assistência imediata a inscrições e avaliações.',
    detail: '+244 900 000 000',
    icon: Phone,
  },
  {
    title: 'Chat ao vivo',
    description: 'Converse com a nossa equipa durante o horário laboral.',
    detail: 'Seg-Sex · 08h às 18h',
    icon: MessageCircle,
  },
];

export const Support = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);

    try {
      // faz POST ao backend /api/support (criar rota no FastAPI)
      await axios.post('/api/support', form);

      toast.success('Mensagem enviada! Entraremos em contacto em breve.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Não foi possível enviar a mensagem. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Centro de suporte
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Estamos ao seu lado em todas as etapas da candidatura
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            Escolha o canal de apoio ou envie uma mensagem directa. A nossa equipa responde em menos de 24 horas úteis.
          </p>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl grid gap-6 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-0">
          <div className="space-y-6">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              return (
                <Card key={channel.title} className="border-[#D7E3FF] bg-[#F6F9FF] transition hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071C0]/10 text-[#0071C0]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 text-sm">
                      <h3 className="text-lg font-semibold text-[#0071C0]">{channel.title}</h3>
                      <p className="text-[#171E43]/70">{channel.description}</p>
                      <p className="text-[#0071C0] font-semibold">{channel.detail}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="border-[#D7E3FF] bg-[#F6F9FF] p-6 text-sm text-[#171E43]/70">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[#0071C0]" />
                <div>
                  <p className="font-semibold text-[#0071C0]">Dica rápida</p>
                  <p>
                    Consulte a secção de FAQ para respostas imediatas ou descarregue o regulamento completo antes de abrir um ticket.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 border-[#0071C0]/40 text-[#0071C0] hover:bg-white/80"
                    onClick={() => (window.location.href = '/faq')}
                  >
                    Ver FAQ
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="border-[#D7E3FF] bg-[#F6F9FF] shadow-lg">
            <CardContent className="space-y-4 p-6">
              <CardTitle className="text-xl font-semibold text-[#0071C0]">Envie-nos uma mensagem</CardTitle>
              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-normal text-[#171E43]/75">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  required
                  className="w-full rounded-lg border border-[#D7E3FF] bg-white px-4 py-3 focus:border-[#0071C0] focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full rounded-lg border border-[#D7E3FF] bg-white px-4 py-3 focus:border-[#0071C0] focus:outline-none"
                />
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Assunto"
                  required
                  className="w-full rounded-lg border border-[#D7E3FF] bg-white px-4 py-3 focus:border-[#0071C0] focus:outline-none"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Descreva a sua dúvida ou problema"
                  rows={6}
                  required
                  className="w-full rounded-lg border border-[#D7E3FF] bg-white px-4 py-3 focus:border-[#0071C0] focus:outline-none"
                />
                <Button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-[#0071C0] text-white hover:bg-[#005ea5] disabled:bg-[#0071C0]/50"
                >
                  {sending ? 'A enviar...' : 'Enviar mensagem'}
                  {!sending && <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 px-4 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-2">
              <MapPin className="h-5 w-5 text-[#0071C0]" />
              <p className="text-sm font-semibold text-[#0071C0]">Morada</p>
              <p className="text-sm font-normal text-[#171E43]/70">
                Rua Ho Chi Minh · Edifício Torres Dipanda · Luanda
              </p>
            </div>
            <div className="space-y-2">
              <Clock className="h-5 w-5 text-[#0071C0]" />
              <p className="text-sm font-semibold text-[#0071C0]">Horário</p>
              <p className="text-sm font-normal text-[#171E43]/70">
                Seg-Sex: 08h às 18h · Sábado: 08h às 12h
              </p>
            </div>
            <div className="space-y-2">
              <HelpCircle className="h-5 w-5 text-[#0071C0]" />
              <p className="text-sm font-semibold text-[#0071C0]">Documentação útil</p>
              <Button
                variant="outline"
                className="mt-2 inline-flex items-center gap-2 border-[#0071C0]/40 text-[#0071C0] hover:bg-white/80"
              >
                Descarregar regulamento
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
