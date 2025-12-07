import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { createStatusCheck } from '../services/api';
import {
  BellRing,
  CheckCircle,
  ClipboardCheck,
  MailCheck,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

const timeline = [
  {
    title: 'Confirmação enviada',
    description: 'Receba o e-mail com o resumo da candidatura e ligação directa para suporte.',
    icon: MailCheck,
    status: 'current',
  },
  {
    title: 'Validação documental',
    description: 'A equipa analisa os documentos e confirma se tudo está em conformidade.',
    icon: ShieldCheck,
    status: 'upcoming',
  },
  {
    title: 'Entrevistas e avaliação',
    description: 'Os especialistas marcam interacções e fazem perguntas adicionais quando necessario.',
    icon: ClipboardCheck,
    status: 'upcoming',
  },
  {
    title: 'Mentorias e agenda final',
    description: 'Acompanhe mentorias, eventos e comunicados oficiais antes da gala.',
    icon: BellRing,
    status: 'upcoming',
  },
];

const nextSteps = [
  {
    icon: MailCheck,
    title: 'Confirmação automática',
    description: 'Verifique a caixa de entrada e confirme que recebeu o resumo da candidatura.',
  },
  {
    icon: ShieldCheck,
    title: 'Documentos em analise',
    description: 'Pode ser contactado para completar informações ou actualizar ficheiros.',
  },
  {
    icon: Users,
    title: 'Equipa dedicada',
    description: 'Especialistas do PRENTMA acompanham cada passo e disponibilizam apoio rápido.',
  },
  {
    icon: Sparkles,
    title: 'Preparação para entrevistas',
    description: 'Organize testemunhos, referências e disponibilidade para os momentos de avaliação.',
  },
];


export const ApplicationSuccess = () => {
  const location = useLocation();
  const application = location.state?.application || null;

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success('Email de confirmação enviado!', {
        description: 'Verifique a caixa de entrada e a pasta de spam.',
        duration: 5000,
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const candidatureId = useMemo(() => {
    if (application?.id) {
      return application.id;
    }
    return `PRENTMA-${Date.now().toString().slice(-6)}`;
  }, [application?.id]);

  const createdAt = useMemo(() => {
    if (application?.created_at) {
      return new Date(application.created_at);
    }
    return new Date();
  }, [application?.created_at]);

  const submissionDate = useMemo(() => createdAt.toLocaleDateString('pt-PT'), [createdAt]);
  const submissionTime = useMemo(() => createdAt.toLocaleTimeString('pt-PT'), [createdAt]);

  const applicantName = useMemo(() => {
    if (!application) {
      return 'Candidato PRENTMA';
    }
    const fullName = `${application.first_name} ${application.last_name}`.trim();
    return fullName || application.email || 'Candidato PRENTMA';
  }, [application]);

    const [alertLoading, setAlertLoading] = useState(false);

  const handleShare = async () => {
    const applicationId = application?.id || undefined;
    const shareData = {
      title: 'Candidatura PRENTMA',
      text: `Acabei de submeter a minha candidatura ao PRENTMA! ${applicantName}`,
      url: window.location.href,
    };

    let shared = false;

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Partilha enviada com sucesso.');
        shared = true;
      } catch (error) {
        if (error?.name === 'AbortError') {
          return;
        }
        console.error(error);
      }
    }

    if (!shared) {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Ligação copiada para partilhar onde quiser.');
        shared = true;
      } catch (error) {
        console.error(error);
        toast.error('Não foi possivel partilhar. Copie manualmente a ligação.');
      }
    }

    if (shared) {
      try {
        await createStatusCheck('Partilha de candidatura', {
          type: 'share',
          application_id: applicationId,
          category: application?.category,
        });
      } catch (error) {
        console.error('Falhou registo da partilha', error);
      }
    }
  };

  const handleAlerts = async () => {
    if (alertLoading) {
      return;
    }

    const email = window.prompt('Indique o email para receber alertas:');
    if (!email) {
      return;
    }

    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
      toast.error('Introduza um email válido.');
      return;
    }

    setAlertLoading(true);
    try {
      await createStatusCheck(`Alertas: ${trimmed}`, {
        type: 'alerts',
        application_id: application?.id,
        category: application?.category,
      });
      toast.success('Alertas ativados para ' + trimmed + '.');
    } catch (error) {
      console.error(error);
      toast.error('Não foi possivel ativar os alertas agora.');
    } finally {
      setAlertLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 text-white">
      <div className="mx-auto max-w-5xl px-4 pb-24 lg:px-6">
        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <div className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-semibold text-primary shadow-sm">
            <span>ID da candidatura</span>
            <span className="font-mono">{candidatureId}</span>
          </div>
          <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">Candidatura recebida com sucesso!</h1>
          <p className="mt-4 text-base text-white/80">
            A equipa PRENTMA iniciou a validação do seu perfil. Receberá atualizações por e-mail e nesta plataforma.
          </p>
        </div>

        <Card className="mt-14 rounded-[32px] border-none bg-white text-primary shadow-2xl shadow-primary/30">
          <CardHeader className="border-b border-primary/10 pb-6">
            <CardTitle className="font-display text-2xl text-primary">Resumo da candidatura</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8 p-6 lg:grid-cols-2 lg:p-10">
            <div className="space-y-4 text-sm text-primary/70">
              <h3 className="font-semibold text-primary">Dados principais</h3>
              <p>Data de submissão: {new Date().toLocaleDateString('pt-PT')}</p>
              <p>Hora: {new Date().toLocaleTimeString('pt-PT')}</p>
              <p>
                Status: <span className="font-semibold text-primary">Recebida</span>
              </p>
            </div>
            <div className="space-y-4 text-sm text-primary/70">
              <h3 className="font-semibold text-primary">Próximos passos</h3>
              <div className="space-y-3">
                {nextSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-primary">{step.title}</p>
                        <p className="text-xs text-primary/70">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
                    </CardContent>
        </Card>

        <section className="mt-12 rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur">
          <h2 className="font-display text-2xl">Linha do tempo da sua jornada</h2>
          <p className="mt-2 text-sm text-white/75">
            Adicione noreply@prentma.ao aos contactos para garantir a recepção das notificações.
          </p>
          <div className="mt-8 space-y-4">
            {timeline.map((step, index) => {
              const Icon = step.icon;
              const isCurrent = step.status === 'current';
              return (
                <div
                  key={step.title}
                  className={[
                    'relative flex flex-col gap-4 rounded-3xl border border-white/15 p-6 text-left text-white transition hover:border-white/30 hover:bg-white/15 sm:flex-row sm:items-center sm:justify-between',
                    isCurrent ? 'bg-white/15' : 'bg-white/5',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <div
                        className={[
                          'flex h-12 w-12 items-center justify-center rounded-2xl',
                          isCurrent ? 'bg-white text-primary' : 'bg-white/10 text-white',
                        ].join(' ')}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                        Etapa {index + 1}
                      </p>
                      <h3 className="mt-1 font-display text-xl leading-tight">{step.title}</h3>
                      <p className="mt-2 text-sm text-white/80">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <Badge className={isCurrent ? 'bg-white text-primary' : 'bg-white/20 text-white'}>
                      {isCurrent ? 'Em andamento' : 'A seguir'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-none bg-white/10 p-6 text-white backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-xl">Partilhe a novidade</h3>
            <p className="mt-2 text-sm text-white/75">Divulgue a sua candidatura com a hashtag #PRENTMA2025 e convide outros profissionais.</p>
            <Button variant="outline" onClick={handleShare} className="mt-4 border-white/40 text-white hover:bg-white/15">
              Partilhar agora
            </Button>
          </Card>
          <Card className="rounded-3xl border-none bg-white/10 p-6 text-white backdrop-blur">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <BellRing className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-xl">Alertas personalizados</h3>
            <p className="mt-2 text-sm text-white/75">Receba avisos sobre prazos, mentorias e eventos na sua caixa de entrada.</p>
            <Button
              variant="outline"
              onClick={handleAlerts}
              disabled={alertLoading}
              className="mt-4 border-white/40 text-white hover:bg-white/15 disabled:opacity-60"
            >
              {alertLoading ? 'A configurar...' : 'Ativar alertas'}
            </Button>
          </Card>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/15 bg-white/10 p-8 text-center backdrop-blur sm:text-left">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-2xl">Precisa de suporte durante o processo?</h3>
              <p className="mt-2 text-sm text-white/80">
                Estamos disponíveis para ajudar com o que for necessário.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/">
                <Button className="bg-white text-primary hover:bg-white/90">Voltar ao início</Button>
              </Link>
              <Link to="/suporte">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/15">
                  Contactar suporte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

