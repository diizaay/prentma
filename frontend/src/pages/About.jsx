import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Building2,
  CheckCircle2,
  Heart,
  MapPin,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";

const panoramaItems = [
  {
    label: "Profissionais",
    title: "Uma rede vital para a mobilidade",
    description:
      "Mais de duas mil inscrições em todo o país demonstram a força da classe e a importância do transporte alternativo para a economia angolana.",
    info: ["Presença em 21 províncias", "Serviço essencial nas zonas urbanas e rurais", "Geração de emprego formal e informal"],
  },
  {
    label: "Desafios",
    title: "Regularização e segurança em destaque",
    description:
      "A falta de documentação, seguros e formação contínua ainda limita o crescimento sustentável da categoria.",
    info: ["Necessidade de formação permanente", "Reforço da disciplina rodoviária", "Integração institucional"],
  },
  {
    label: "Oportunidades",
    title: "Tecnologia e reconhecimento",
    description:
      "O PRENTMA cria um ecossistema digital para mentorias, visibilidade e prémios que valorizam quem faz a diferença no volante.",
    info: ["Mentorias e capacitação", "Conexão com parceiros estratégicos", "Premiações e certificações"],
  },
];

const objectiveItems = [
  {
    title: "Objectivo geral",
    description:
      "Promover condutas éticas, disciplina rodoviária e regularização completa dos taxistas e mototaxistas em Angola.",
  },
  {
    title: "Formação e educação",
    description:
      "Estimular a qualificação académica mínima (9ª classe) e acesso a programas de capacitação contínua.",
  },
  {
    title: "Segurança e documentação",
    description:
      "Reforçar a importância do cumprimento do Código de Estrada, seguros obrigatórios e vistorias periódicas.",
  },
  {
    title: "Reconhecimento público",
    description:
      "Valorizar histórias inspiradoras, postura exemplar e impacto social no transporte nacional.",
  },
];

const values = [
  {
    icon: Trophy,
    title: "Excelência",
    description: "Celebramos profissionais que elevam o padrão de atendimento e segurança.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    description: "Promovemos mobilidade responsável e respeito pelas normas.",
  },
  {
    icon: Users,
    title: "Inclusão",
    description: "Garantimos espaço para todas as vozes do sector de transporte.",
  },
  {
    icon: Heart,
    title: "Impacto social",
    description: "Incentivamos histórias que transformam comunidades todos os dias.",
  },
];

const partnerGroups = [
  {
    title: "Governamentais",
    icon: Building2,
    items: ["Ministério dos Transportes", "Ministério do Interior", "Ministério das Finanças", "Governos Provinciais"],
  },
  {
    title: "Parceiras",
    icon: Users,
    items: ["Associação Nacional dos Taxistas", "Associação Nacional dos Mototaxistas", "Associações Juvenis", "Seguradoras Nacionais"],
  },
  {
    title: "Apoiadoras",
    icon: MapPin,
    items: ["Bancos Comerciais", "Concessionárias", "Oficinas Mecânicas", "Empresas de Serviços"],
  },
];

export const About = () => {
  const [panoramaTab, setPanoramaTab] = useState(0);
  const [objectiveTab, setObjectiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-10 px-4 lg:px-0">
          <Badge className="w-fit rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Sobre o PRENTMA
          </Badge>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Prémio Nacional de Taxistas & Mototaxistas de Angola
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            O PRENTMA é o concurso oficial que reconhece e apoia os profissionais responsáveis por manter o país em movimento, promovendo formação, segurança e oportunidades reais.
          </p>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 lg:px-0">
          <div className="flex flex-wrap gap-3">
            {panoramaItems.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => setPanoramaTab(index)}
                onFocus={() => setPanoramaTab(index)}
                onClick={() => setPanoramaTab(index)}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  panoramaTab === index
                    ? "bg-[#0071C0] text-white shadow"
                    : "bg-[#F1F6FF] text-[#171E43]/80 hover:bg-[#E6EEFF]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">{panoramaItems[panoramaTab].title}</h2>
              <p className="text-base font-normal text-[#171E43]/80">
                {panoramaItems[panoramaTab].description}
              </p>
              <ul className="space-y-3 text-sm font-normal text-[#171E43]/70">
                {panoramaItems[panoramaTab].info.map((info) => (
                  <li key={info} className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 text-[#0071C0]" />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-8 shadow-lg transition hover:-translate-y-1">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-[#0071C0]">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em]">Panorama actual</span>
                </div>
                <p className="text-sm font-normal text-[#171E43]/70">
                  Dados obtidos com base em inscrições oficiais, relatórios de parceiros e monitorização do sector realizada pela comissão PRENTMA.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-2xl font-semibold text-[#0071C0]">1.000+</p>
                    <p className="text-xs font-normal text-[#171E43]/60">Profissionais registados</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-2xl font-semibold text-[#0071C0]">30+</p>
                    <p className="text-xs font-normal text-[#171E43]/60">Cooperativas em destaque</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 lg:px-0">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
              Objectivos do concurso
            </span>
            <h2 className="text-3xl font-semibold">Plano estratégico do PRENTMA</h2>
            <p className="mx-auto max-w-3xl text-base font-normal text-[#171E43]/80">
              Construímos um percurso formativo e de reconhecimento para o sector, alinhado com parceiros públicos e privados.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="space-y-3">
              {objectiveItems.map((objective, index) => (
                <button
                  key={objective.title}
                  type="button"
                  onMouseEnter={() => setObjectiveTab(index)}
                  onFocus={() => setObjectiveTab(index)}
                  onClick={() => setObjectiveTab(index)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    objectiveTab === index
                      ? "border-[#0071C0] bg-white text-[#0071C0] shadow-sm"
                      : "border-transparent bg-white/50 text-[#171E43]/70 hover:border-[#D7E3FF]"
                  }`}
                >
                  {objective.title}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-[#D7E3FF] bg-white p-8 shadow-lg transition hover:-translate-y-1">
              <h3 className="text-2xl font-semibold text-[#0071C0]">
                {objectiveItems[objectiveTab].title}
              </h3>
              <p className="mt-4 text-sm font-normal text-[#171E43]/75">
                {objectiveItems[objectiveTab].description}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F6F9FF] p-4">
                  <Zap className="h-5 w-5 text-[#0071C0]" />
                  <p className="mt-2 text-xs font-normal text-[#171E43]/70">
                    Mentorias, workshops e guias práticos sobre segurança rodoviária.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F6F9FF] p-4">
                  <Target className="h-5 w-5 text-[#0071C0]" />
                  <p className="mt-2 text-xs font-normal text-[#171E43]/70">
                    Indicadores claros para acompanhar a evolução dos participantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 lg:px-0">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center rounded-full bg-[#E6EEFF] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
              Valores PRENTMA
            </span>
            <h2 className="text-3xl font-semibold">O que guia o nosso concurso</h2>
            <p className="mx-auto max-w-3xl text-base font-normal text-[#171E43]/80">
              Reconhecemos comportamentos que inspiram a sociedade, elevam o sector e criam confiança nos serviços de mobilidade.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="border-[#D7E3FF] bg-[#F6F9FF] transition hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071C0]/10 text-[#0071C0]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#0071C0]">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm font-normal text-[#171E43]/70">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F1F6FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 lg:px-0">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
              Rede de parceiros
            </span>
            <h2 className="text-3xl font-semibold">Quem torna o PRENTMA possível</h2>
            <p className="mx-auto max-w-3xl text-base font-normal text-[#171E43]/80">
              Instituições públicas e privadas juntam-se para garantir credibilidade, formação e benefícios concretos para os participantes.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {partnerGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="relative overflow-hidden rounded-3xl border border-[#D7E3FF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,113,192,0.08),_transparent)]"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071C0]/10 text-[#0071C0]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0071C0]">{group.title}</h3>
                    <ul className="space-y-2 text-sm font-normal text-[#171E43]/70">
                      {group.items.map((item) => {
                        // make specific partner items external links
                        const externalLinks = {
                          'Ministério dos Transportes': 'https://www.mintrans.gov.ao/',
                          'Ministério do Interior': 'https://www.minint.gov.ao/',
                          'Ministério das Finanças': 'https://www.minfin.gov.ao/',
                          'Governos Provinciais': 'https://governo.gov.ao/',
                        };
                        const href = externalLinks[item];
                        return (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {item}
                              </a>
                            ) : (
                              <span>{item}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};


