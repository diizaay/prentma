import React from "react";

export const Privacy = () => {
  const items = [
    {
      title: "Recolha de dados",
      body: "Os dados pessoais submetidos são utilizados para validar a elegibilidade dos participantes e comunicar informações do concurso.",
    },
    {
      title: "Armazenamento",
      body: "As informações são armazenadas em sistemas seguros e acessíveis apenas à equipa autorizada do PRENTMA.",
    },
    {
      title: "Partilha",
      body: "Dados podem ser partilhados com parceiros institucionais apenas para fins de avaliação e auditoria, mediante acordos de confidencialidade.",
    },
    {
      title: "Direitos do participante",
      body: "O candidato pode solicitar a atualização ou eliminação dos seus dados, bem como revogar autorizações concedidas.",
    },
    {
      title: "Contacto",
      body: "Envie questões sobre privacidade para privacidade@prentma.ao.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-20 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-5xl space-y-6 px-4 lg:px-0">
          <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
            Protecção de dados
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Política de Privacidade do PRENTMA
          </h1>
          <p className="max-w-3xl text-base font-normal text-white/85">
            Transparência no uso das suas informações pessoais durante o processo de candidatura ao prémio.
          </p>
        </div>
      </section>

      <section className="-mt-12 rounded-t-[40px] bg-white py-16 text-[#171E43]">
        <div className="mx-auto max-w-4xl space-y-8 px-4 lg:px-0">
          {items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-[#D7E3FF] bg-[#F6F9FF] p-6">
              <h2 className="text-xl font-semibold text-[#0071C0]">{item.title}</h2>
              <p className="mt-3 text-sm font-normal text-[#171E43]/75">{item.body}</p>
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
