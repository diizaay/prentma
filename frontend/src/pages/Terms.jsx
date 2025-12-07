import React from "react";

export const Terms = () => {
  const sections = [
    {
      title: "Finalidade do PRENTMA",
      body: "O concurso visa reconhecer e valorizar taxistas, mototaxistas e cooperativas angolanas que demonstram excelência, ética e responsabilidade social.",
    },
    {
      title: "Condições de participação",
      body: "Os candidatos devem cumprir os critérios oficiais de elegibilidade, apresentar documentação válida e aceitar o regulamento completo.",
    },
    {
      title: "Uso das informações",
      body: "Os dados fornecidos são utilizados exclusivamente para avaliação e comunicação do concurso, seguindo as regras de confidencialidade do PRENTMA.",
    },
    {
      title: "Direitos de imagem",
      body: "Ao participar, o candidato autoriza o uso de imagem e depoimentos em campanhas institucionais do PRENTMA.",
    },
    {
      title: "Atualizações",
      body: "O PRENTMA pode atualizar estes termos a qualquer momento. A versão mais recente estará sempre disponível nesta página.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-20 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-5xl space-y-6 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Documentação legal
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Termos de Uso do PRENTMA
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85">
            Leia com atenção as regras gerais de participação, direitos e responsabilidades ao submeter a candidatura ao Prémio Nacional de Taxistas e Mototaxistas de Angola.
          </p>
        </div>
      </section>

      <section className="-mt-12 rounded-t-[40px] bg-white py-16 text-[#171E43]">
        <div className="mx-auto max-w-4xl space-y-8 px-4 lg:px-0">
          {sections.map((section) => (
            <div key={section.title} className="rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-6">
              <h2 className="text-xl font-semibold text-[#0071C0]">{section.title}</h2>
              <p className="mt-3 text-sm font-normal text-[#171E43]/75">{section.body}</p>
            </div>
          ))}
          <p className="text-sm font-normal text-[#171E43]/60">
            Última atualização: Setembro de 2025
          </p>
        </div>
      </section>
    </div>
  );
};
