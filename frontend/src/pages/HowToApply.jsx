import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  ShieldCheck,
  Trophy,
  Upload,
  User,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Criar conta",
    description: "Registe-se com email, contacto e dados pessoais no portal PRENTMA.",
    icon: User,
    duration: "2 minutos",
    requirements: ["Email válido", "Telefone activo", "Dados pessoais"],
  },
  {
    number: 2,
    title: "Escolher categoria",
    description: "Selecione a categoria que melhor representa a sua actuação.",
    icon: Trophy,
    duration: "1 minuto",
    requirements: ["Verificar critérios", "Confirmar elegibilidade"],
  },
  {
    number: 3,
    title: "Preencher formulário",
    description: "Conte-nos sobre a sua experiência profissional e motivação.",
    icon: FileText,
    duration: "10 minutos",
    requirements: ["Histórico profissional", "Experiência", "Referências"],
  },
  {
    number: 4,
    title: "Carregar documentos",
    description: "Faça upload dos comprovativos para validar a candidatura.",
    icon: Upload,
    duration: "5 minutos",
    requirements: ["Bilhete de identidade", "Carta de condução", "Documentos do veículo"],
  },
  {
    number: 5,
    title: "Submeter candidatura",
    description: "Revise os dados, aceite os termos e finalize a inscrição.",
    icon: CheckCircle2,
    duration: "2 minutos",
    requirements: ["Revisão final", "Aceitar termos", "Confirmação"]
  },
];

const documentTypes = [
  { name: "Bilhete de Identidade ou Passaporte", required: true, format: "PDF ou JPG" },
  { name: "Carta de Condução", required: true, format: "PDF ou JPG" },
  { name: "Documentos do veículo", required: true, format: "PDF ou JPG" },
  { name: "Registo criminal actualizado", required: false, format: "PDF" },
  { name: "Comprovativo de morada", required: false, format: "PDF ou JPG" },
];

const timeline = [
  { phase: "Inscrições", period: "1 Março - 30 Abril", status: "current" },
  { phase: "Avaliação técnica", period: "1 - 31 Maio", status: "upcoming" },
  { phase: "Votação popular", period: "1 - 30 Junho", status: "upcoming" },
  { phase: "Resultados", period: "15 Julho", status: "upcoming" },
];

export const HowToApply = () => {
  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Guia de candidatura
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Complete a sua candidatura em poucos passos
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            Siga este roteiro e prepare toda a documentação antes de submeter a inscrição. O processo é 100% digital e pode ser acompanhado em tempo real.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/inscricao">
              <Button size="pill" className="bg-white text-[#0071C0] hover:bg-white/90">
                Começar candidatura
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/criterios">
              <Button
                variant="outline"
                size="pill"
                className="border-white/40 bg-white/10 text-white hover:bg-white/15"
              >
                Ver critérios completos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 lg:px-0">
          <div className="text-center space-y-4">
            <span className="inline-flex items-center rounded-full bg-[#E6EEFF] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
              Passo a passo
            </span>
            <h2 className="text-3xl font-semibold">Processo de candidatura</h2>
            <p className="mx-auto max-w-3xl text-base font-normal text-[#171E43]/80">
              Organize-se com antecedência e garanta uma submissão sem erros.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              return (
                <div key={step.number} className="relative flex flex-col gap-6 rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  {!isLast && (
                    <span className="absolute left-7 top-[calc(100%-10px)] h-10 w-px bg-gradient-to-b from-[#0071C0]/20 to-transparent"></span>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0071C0]/10 text-[#0071C0] text-lg font-semibold">
                      {step.number}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#0071C0]">
                          <Icon className="h-5 w-5" />
                          {step.title}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0071C0]">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm font-normal text-[#171E43]/75">{step.description}</p>
                      <div className="grid gap-2 text-sm font-normal text-[#171E43]/70 sm:grid-cols-3">
                        {step.requirements.map((req) => (
                          <span key={req} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 lg:px-0">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
              Documentação
            </span>
            <h2 className="text-3xl font-semibold">Prepare estes documentos</h2>
            <p className="mx-auto max-w-3xl text-base font-normal text-[#171E43]/80">
              Faça o upload em PDF ou JPG. Garanta boa legibilidade e validade mínima de 6 meses.
            </p>
          </div>

          <div className="space-y-4">
            {documentTypes.map((doc) => (
              <Card key={doc.name} className="border-[#D7E3FF] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full ${doc.required ? "bg-[#0071C0]" : "bg-[#C7D6FF]"}`}></div>
                    <div>
                      <h3 className="text-base font-semibold text-[#0071C0]">{doc.name}</h3>
                      <p className="text-sm font-normal text-[#171E43]/70">Formato: {doc.format}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    doc.required
                      ? "bg-[#0071C0]/10 text-[#0071C0]"
                      : "bg-[#E6EEFF] text-[#171E43]/70"
                  }`}>
                    {doc.required ? "Obrigatório" : "Opcional"}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-3xl border border-[#D7E3FF] bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3 text-[#0071C0]">
                <AlertCircle className="mt-0.5 h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.24em]">
                  Importante
                </p>
              </div>
              <ul className="space-y-2 text-sm font-normal text-[#171E43]/70">
                <li>Todos os ficheiros devem ter no máximo 5MB.</li>
                <li>Certifique-se de que os documentos de seguro e inspeção estão dentro da validade.</li>
                <li>Em caso de dúvida, envie um email para <span className="text-[#0071C0] font-semibold">candidaturas@prentma.ao</span>.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 lg:px-0">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center rounded-full bg-[#E6EEFF] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
              Cronograma oficial
            </span>
            <h2 className="text-3xl font-semibold">Acompanhe as fases do concurso</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <div
                key={item.phase}
                className={`rounded-3xl border p-6 text-center transition hover:-translate-y-1 hover:shadow-lg ${
                  item.status === "current"
                    ? "border-[#0071C0] bg-[#F6F9FF]"
                    : "border-[#D7E3FF] bg-[#EEF4FF]"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0071C0]">
                  {item.phase}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-[#171E43]">{item.period}</h3>
                <p className="mt-2 text-xs font-normal text-[#171E43]/70">
                  {item.status === "current" ? "Em andamento" : "Preparar documentação"}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-[#EEF4FF] p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-[#0071C0]">
                  Precisa de ajuda durante a candidatura?
                </h2>
                <p className="text-base font-normal text-[#171E43]/75">
                  A nossa equipa de atendimento está disponível para esclarecer dúvidas sobre critérios, documentação e prazos do concurso.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/suporte">
                    <Button className="w-full bg-[#0071C0] text-white hover:bg-[#005ea5]">
                      Falar com suporte
                    </Button>
                  </Link>
                  <a
                    href="mailto:candidaturas@prentma.ao"
                    className="flex w-full items-center justify-center rounded-full border border-[#0071C0]/40 bg-white px-5 py-3 text-sm font-semibold text-[#0071C0] transition hover:bg-white/80"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar email
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 text-sm font-normal text-[#171E43]/70">
                <div className="flex items-center gap-3 text-[#0071C0]">
                  <ShieldCheck className="h-5 w-5" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em]">Checklist rápido</p>
                </div>
                <ul className="mt-4 space-y-2">
                  <li>↳ Digitalize os documentos em boa qualidade.</li>
                  <li>↳ Utilize contactos actualizados para receber notificações.</li>
                  <li>↳ Acompanhe o email para confirmar a submissão.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

