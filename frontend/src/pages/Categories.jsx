import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  Award,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";

const categoryData = [
  {
    id: "taxi",
    title: "Taxista do Ano",
    description: "Reconhecimento máximo para quem entrega um serviço exemplar no táxi urbano.",
    prize: "15.000.000 KZ + placa de distinção + serviços gratuitos",
    criteria: [
      "Mínimo 1 ano de experiência comprovada",
      "Documentação legal e seguro obrigatórios válidos",
      "Sem infrações graves nos últimos 12 meses",
      "Mínimo 9ª classe",
      "Reputação comunitária positiva",
    ],
  },
  {
    id: "moto",
    title: "Mototaxista do Ano",
    description: "Premiação para quem alia agilidade, segurança e impacto social.",
    prize: "10.000.000 KZ + placa de distinção + serviços gratuitos",
    criteria: [
      "Experiência mínima de 1 ano",
      "Documentos da moto e do condutor atualizados",
      "Seguro obrigatório pago",
      "Formação em condução defensiva",
      "Contribuição comunitária comprovada",
    ],
  },
  {
    id: "exemplo",
    title: "Exemplo do Ano",
    description: "Celebra atos de bravura e solidariedade realizados no exercício da profissão.",
    prize: "5.000.000 KZ",
    criteria: [
      "História de impacto comprovada",
      "Conduta ética exemplar",
      "Reconhecimento público",
      "Documentação em dia",
      "Carta de recomendação comunitária",
    ],
  },
  {
    id: "cooperativa",
    title: "Cooperativa do Ano",
    description: "Valorização da gestão eficiente, inovação e suporte aos membros.",
    prize: "8.000.000 KZ + placa de distinção + serviços para todos os membros",
    criteria: [
      "Constituição formal",
      "Membros regularizados",
      "Registo de segurança exemplar",
      "Participação em formações",
      "Plano de desenvolvimento activo",
    ],
  },
];

const processSteps = [
  {
    title: "Inscrição digital",
    description: "Preencha o formulário oficial e submeta toda a documentação exigida.",
  },
  {
    title: "Seleção provincial",
    description: "Cada província identifica vencedores nas categorias principais.",
  },
  {
    title: "Avaliação nacional",
    description: "Júri analisa finalistas, mentorias e evidências apresentadas.",
  },
  {
    title: "Gala de premiação",
    description: "Cerimónia oficial com entrega de prémios e certificações.",
  },
];

export const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
          <Badge className="w-fit rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Categorias PRENTMA
          </Badge>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            As distinções que reconhecem quem move Angola
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85 sm:text-lg">
            Conheça as categorias oficiais do concurso e descubra como participar na seleção dos melhores profissionais e cooperativas do transporte angolano.
          </p>
        </div>
      </section>

      <section className="-mt-16 rounded-t-[48px] bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 lg:px-0">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-[#E6EEFF] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
                Categorias disponíveis
              </span>
              <h2 className="text-3xl font-semibold">
                Selecione uma categoria para ver detalhes e critérios
              </h2>
              <p className="text-base font-normal text-[#171E43]/80">
                Todas as categorias seguem regulamentos específicos e garantem benefícios concretos aos vencedores, com foco em segurança, ética e impacto social.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {categoryData.map((category, index) => (
                  <button
                    key={category.id}
                    type="button"
                    onMouseEnter={() => setActiveCategory(index)}
                    onFocus={() => setActiveCategory(index)}
                    onClick={() => setActiveCategory(index)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      activeCategory === index
                        ? "border-[#0071C0] bg-[#F6F9FF] text-[#0071C0] shadow-sm"
                        : "border-transparent bg-[#F6F9FF]/50 text-[#171E43]/80 hover:border-[#D7E3FF]"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>

            <Card className="border-[#D7E3FF] bg-[#F6F9FF] shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl font-semibold text-[#0071C0]">
                  {categoryData[activeCategory].title}
                </CardTitle>
                <CardDescription className="text-sm font-normal text-[#171E43]/75">
                  {categoryData[activeCategory].description}
                </CardDescription>
                <Badge className="w-fit rounded-full bg-[#0071C0]/10 px-3 py-1 text-xs font-semibold text-[#0071C0]">
                  Prémio: {categoryData[activeCategory].prize}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0071C0]">Critérios de elegibilidade</h3>
                <ul className="space-y-3 text-sm font-normal text-[#171E43]/75">
                  {categoryData[activeCategory].criteria.map((criterion) => (
                    <li key={criterion} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/inscricao" className="block">
                  <Button className="w-full bg-[#0071C0] text-white hover:bg-[#005ea5]">
                    Candidatar-se nesta categoria
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F9FF] py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 lg:px-0">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
              Como funciona
            </span>
            <h2 className="text-3xl font-semibold">Fases do concurso</h2>
            <p className="mx-auto max-w-3xl text-base font-normal text-[#171E43]/80">
              Um processo transparente que combina avaliação local e reconhecimento nacional.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-[#D7E3FF] bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071C0]/10 text-[#0071C0]">
                  <span className="text-sm font-semibold">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0071C0]">{step.title}</h3>
                <p className="mt-2 text-sm font-normal text-[#171E43]/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 lg:px-0">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-[#EEF4FF] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071C0]/10 text-[#0071C0]">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Mentorias e feedback</h3>
              <p className="mt-2 text-sm font-normal text-[#171E43]/70">
                Finalistas recebem acompanhamento personalizado antes da gala nacional.
              </p>
            </div>
            <div className="rounded-3xl bg-[#EEF4FF] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071C0]/10 text-[#0071C0]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Auditoria de documentos</h3>
              <p className="mt-2 text-sm font-normal text-[#171E43]/70">
                Equipa especializada verifica seguros, cartas e registos de cada participante.
              </p>
            </div>
            <div className="rounded-3xl bg-[#EEF4FF] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071C0]/10 text-[#0071C0]">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#0071C0]">Agenda oficial</h3>
              <p className="mt-2 text-sm font-normal text-[#171E43]/70">
                As etapas têm datas publicadas e acompanhamento através do portal PRENTMA.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-[#EEF4FF] p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-[#0071C0]">
                  Pronto para representar a sua categoria?
                </h2>
                <p className="text-base font-normal text-[#171E43]/75">
                  Reúna a documentação, prepare a sua história e submeta a candidatura em poucos minutos. A equipa PRENTMA acompanha todo o processo com proximidade e transparência.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/inscricao">
                  <Button className="w-full bg-[#0071C0] text-white hover:bg-[#005ea5]">
                    Iniciar inscrição
                  </Button>
                </Link>
                <Link to="/criterios">
                  <Button
                    variant="outline"
                    className="w-full border-[#0071C0]/40 bg-white text-[#0071C0] hover:bg-white/80"
                  >
                    Ver regulamento
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
