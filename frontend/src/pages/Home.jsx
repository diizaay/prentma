import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useStatusChecks } from "../hooks/useStatusChecks";
import { formatDateTime } from "../lib/utils";
import {
  ArrowRight,
  Award,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Heart,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const heroBackgrounds = [
  `linear-gradient(115deg, rgba(0, 72, 155, 0.85), rgba(0, 113, 192, 0.72)), url('/Prentma1.jpg')`,
  `linear-gradient(115deg, rgba(0, 61, 136, 0.85), rgba(0, 113, 192, 0.72)), url('/Prentma5.jpg')`,
  `linear-gradient(115deg, rgba(0, 49, 101, 0.88), rgba(0, 113, 192, 0.65)), url('/Prentma3.jpg')`,
  `linear-gradient(115deg, rgba(0, 72, 155, 0.85), rgba(0, 113, 192, 0.72)), url('/Prentma4.jpg')`,
  
];

const stats = [
  { value: "1.000+", label: "Profissionais registados", icon: Users },
  { value: "30+", label: "Cooperativas apoiadas", icon: Building2 },
  { value: "21", label: "Províncias presentes", icon: MapPin },
  { value: "2025", label: "Edição em curso", icon: CalendarCheck },
];

const featureHighlights = [
  {
    icon: ShieldCheck,
    title: "Concurso transparente",
    description:
      "Regulamento público, critérios claros e acompanhamento em todas as etapas.",
  },
  {
    icon: TrendingUp,
    title: "Visibilidade nacional",
    description:
      "Finalistas participam em mentorias, campanhas de comunicação e eventos oficiais.",
  },
  {
    icon: Award,
    title: "Reconhecimento real",
    description:
      "Premiações, certificações e oportunidades exclusivas para expandir a sua carreira.",
  },
];

const categories = [
  {
    name: "Taxista do Ano",
    description:
      "Excelência na condução, atendimento e segurança diária no transporte urbano.",
    bullets: [
      "Histórico profissional validado",
      "Documentação e seguro em dia",
      "Avaliações de passageiros"
    ],
  },
  {
    name: "Mototaxista do Ano",
    description:
      "Responsabilidade, agilidade e impacto social nas comunidades onde atua.",
    bullets: [
      "Experiência comprovada",
      "Compromisso com segurança",
      "Atuação em projetos sociais"
    ],
  },
  {
    name: "Exemplo do Ano",
    description:
      "Histórias inspiradoras que elevam o transporte com atitudes heroicas.",
    bullets: [
      "Ação reconhecida pela comunidade",
      "Contribuição para cidadania",
      "Recomendações oficiais"
    ],
  },
  {
    name: "Cooperativa do Ano",
    description:
      "Gestão eficiente, inovação e suporte aos membros em toda a jornada.",
    bullets: [
      "Plano de desenvolvimento",
      "Formação contínua",
      "Resultados mensuráveis"
    ],
  },
];

const journey = [
  {
    title: "Inscreva-se",
    description: "Preencha o formulário digital com todos os dados necessários.",
  },
  {
    title: "Envie documentos",
    description: "Upload seguro e acompanhamento do estado de validação.",
  },
  {
    title: "Passe pelas avaliações",
    description: "Etapas técnicas, mentorias e participação em encontros regionais.",
  },
  {
    title: "Celebre o reconhecimento",
    description: "Finalistas recebem prémios, certificações e ampla divulgação.",
  },
];

const testimonials = [
  {
    quote:
      "Esse concurso abre portas para parcerias e novas oportunidades. Hoje inspiro outros profissionais a regularizar a sua atividade.",
    author: "Pedro António",
    role: "Mototaxista",
  },
  {
    quote:
      "O PRENTMA pode impulsionar a nossa cooperativa. A mentoria ajuda a estruturar projetos e profissionalizar os associados.",
    author: "Cooperativa Nova Geração",
    role: "Taxista",
  },
  {
    quote:
      "É uma boa oportunidade para receber reconhecimento nacional e apoio para continuar a prestar um serviço exemplar em Angola.",
    author: "Joaquim Manuel",
    role: "Taxista",
  },
];

export const Home = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeStat, setActiveStat] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [statusName, setStatusName] = useState("");
  const {
    recentStatusChecks,
    loading: statusLoading,
    error: statusError,
    submitting: statusSubmitting,
    submitStatusCheck,
  } = useStatusChecks({ limit: 5 });

  const handleStatusSubmit = async (event) => {
    event.preventDefault();
    const value = statusName.trim();
    if (!value) {
      return;
    }

    try {
      await submitStatusCheck(value);
      setStatusName("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const heroStyle = useMemo(
    () => ({
      backgroundImage: heroBackgrounds[heroIndex],
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [heroIndex]
  );

  return (
    <div className="min-h-screen bg-[#0071C0] text-white font-sans">
      <section className="relative overflow-hidden" style={heroStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 pt-24 lg:px-0">
          <div className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] uppercase tracking-[0.32em]">
            Edição 2025
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Prémio Nacional dos Taxistas & Mototaxistas de Angola
          </h1>
          <p className="max-w-2xl text-base font-normal text-white/85 sm:text-lg">
            Reconhecemos quem move Angola com dedicação, segurança e bom serviço. Participe do concurso oficial que destaca histórias inspiradoras do transporte nacional.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/inscricao">
              <Button size="pill" className="bg-white text-[#0071C0] hover:bg-white/90">
                Inscrever-se agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/criterios">
              <Button
                variant="outline"
                size="pill"
                className="border-white/40 bg-white/10 text-white hover:bg-white/15"
              >
                Ver critérios
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = activeStat === index;
              return (
                <div
                  key={stat.label}
                  onMouseEnter={() => setActiveStat(index)}
                  className={`relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 transition-all duration-300 ${
                    isActive ? "shadow-xl shadow-white/20" : "hover:shadow-lg hover:shadow-white/10"
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent)]"></div>
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-3xl font-semibold">{stat.value}</p>
                    <p className="text-sm font-normal text-white/75">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

     

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl px-4 lg:px-0">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-[#E6EEFF] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
                Porque participar?
              </span>
              <h2 className="text-3xl font-semibold">Uma jornada pensada para valorizar o seu percurso</h2>
              <p className="text-base font-normal text-[#171E43]/80">
                Desde a inscrição até a cerimónia final, o PRENTMA oferece suporte, mentoria e reconhecimento para os profissionais que mantêm a mobilidade angolana em movimento.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {featureHighlights.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071C0]/10 text-[#0071C0]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm font-normal text-[#171E43]/70">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-[#D7E3FF] bg-[#F1F6FF] p-8 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0071C0]">
                    Categorias do concurso
                  </span>
                  <span className="text-xs font-semibold text-[#0071C0]/70">
                    
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-[#0071C0]">
                      {categories[activeCategory].name}
                    </h3>
                    <p className="text-sm font-normal text-[#171E43]/80">
                      {categories[activeCategory].description}
                    </p>
                    <ul className="space-y-2 text-sm font-normal text-[#171E43]/70">
                      {categories[activeCategory].bullets.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#0071C0]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {categories.map((category, index) => (
                      <button
                        key={category.name}
                        type="button"
                        onMouseEnter={() => setActiveCategory(index)}
                        onFocus={() => setActiveCategory(index)}
                        onClick={() => setActiveCategory(index)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          activeCategory === index
                            ? "border-[#0071C0] bg-white text-[#0071C0] shadow-sm"
                            : "border-[#D7E3FF] bg-transparent text-[#171E43]/80 hover:bg-white"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0056A3] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 lg:px-0">
          <div className="space-y-6 text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em]">
              Linha do concurso
            </span>
            <h2 className="text-3xl font-semibold">Etapas transparentes do PRENTMA</h2>
            <p className="mx-auto max-w-3xl text-base font-normal text-white/80">
              Acompanhamos cada candidato com informação clara e suporte dedicado em todo o processo.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {journey.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/20 bg-white/10 p-6 text-left transition hover:-translate-y-1 hover:bg-white/15"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
                  <span className="text-sm font-semibold">{index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm font-normal text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl px-4 lg:px-0">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-[#E6EEFF] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">
                Resultados reais
              </span>
              <h2 className="text-3xl font-semibold">Testemunhos da comunidade PRENTMA</h2>
              <p className="text-base font-normal text-[#171E43]/80">
                Histórias inspiradoras mostram como o reconhecimento transforma carreiras e reforça o papel do transporte seguro em Angola.
              </p>
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 w-8 rounded-full transition ${
                      activeTestimonial === index ? "bg-[#0071C0]" : "bg-[#C7D6FF]"
                    }`}
                    aria-label={`Selecionar testemunho ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-8 shadow-lg transition hover:-translate-y-1">
                <Quote className="mb-6 h-10 w-10 text-[#0071C0]" />
                <p className="text-lg font-normal text-[#171E43]">
                  “{testimonials[activeTestimonial].quote}”
                </p>
                <div className="mt-6">
                  <p className="text-base font-semibold text-[#0071C0]">
                    {testimonials[activeTestimonial].author}
                  </p>
                  <p className="text-sm font-normal text-[#171E43]/70">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-[#171E43]">
        <div className="mx-auto max-w-6xl px-4 lg:px-0">
          <div className="rounded-3xl bg-[#EEF4FF] p-10 text-center lg:text-left">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-[#0071C0]">
                  Preparado para elevar a sua carreira no transporte?
                </h2>
                <p className="text-base font-normal text-[#171E43]/80">
                  Inscreva-se gratuitamente, organize os documentos e acompanhe o status em tempo real. A equipa PRENTMA está pronta para apoiar cada etapa da sua jornada.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/inscricao">
                    <Button size="pill" className="bg-[#0071C0] text-white hover:bg-[#005ea5]">
                      Fazer inscrição
                    </Button>
                  </Link>
                  <Link to="/suporte">
                    <Button
                      variant="outline"
                      size="pill"
                      className="border-[#0071C0]/40 bg-white text-[#0071C0] hover:bg-white/70"
                    >
                      Falar com o suporte
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-[#D7E3FF] bg-white p-6 text-left">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 text-[#0071C0]" />
                  <div>
                    <p className="text-sm font-semibold text-[#0071C0]">Mentorias dedicadas</p>
                    <p className="text-sm font-normal text-[#171E43]/70">
                      Sessões personalizadas para preparar entrevistas e apresentações.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="mt-1 h-5 w-5 text-[#0071C0]" />
                  <div>
                    <p className="text-sm font-semibold text-[#0071C0]">Suporte omnicanal</p>
                    <p className="text-sm font-normal text-[#171E43]/70">
                      Atendimento rápido via portal, telefone e centros presenciais.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="mt-1 h-5 w-5 text-[#0071C0]" />
                  <div>
                    <p className="text-sm font-semibold text-[#0071C0]">Reconhecimento contínuo</p>
                    <p className="text-sm font-normal text-[#171E43]/70">
                      Benefícios e certificações que permanecem após o concurso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
