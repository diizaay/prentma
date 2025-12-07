import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const footerLinks = [
  {
    title: 'Institucional',
    items: [
      { label: 'Sobre', href: '/sobre' },
      { label: 'Categorias', href: '/categorias' },
      { label: 'Eventos', href: '/eventos' },
      { label: 'Notícias', href: '/noticias' },
    ],
  },
  {
    title: 'Participação',
    items: [
      { label: 'Inscrição', href: '/inscricao' },
      { label: 'Critérios', href: '/criterios' },
      { label: 'Regulamento', href: '/regulamento' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Suporte', href: '/suporte' },
    ],
  },
  {
    title: 'Legais',
    items: [
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Politica de Privacidade', href: '/privacidade' },
    ],
  },
];

const social = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61580930091688' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/prentma_angola/' },
 
];

export const Footer = () => {
  return (
    <footer className="relative mt-20 bg-primary text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(0,80,195,0.05))]"></div>
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <img src="/images/Prentmapngbranco.png" alt="Logotipo PRENTMA" className="h-8 w-auto" />
              </div>
              <div>
                <p className="font-display text-2xl leading-none">PRENTMA</p>
                <p className="text-sm uppercase tracking-[0.26em] text-white/70">Prémio Nacional dos
Taxistas & Mototaxistas</p>
              </div>
            </div>
            <p className="max-w-sm text-sm text-white/80">
              O concurso que reconhece e amplia o impacto dos taxistas e mototaxistas em todo o território angolano.
            </p>

            <div className="grid gap-4 text-sm">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-white" />
                <span>Luanda - Angola</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="h-5 w-5 text-white" />
                <span>+244 900 000 000</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="h-5 w-5 text-white" />
                <span>info@prentma.ao</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"                
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/10"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-5">
                <h4 className="font-display text-lg text-white">{section.title}</h4>
                <ul className="space-y-3 text-sm text-white/75">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link to={item.href} className="inline-flex items-center gap-2 transition hover:text-white">
                        <span>{item.label}</span>
                        <ArrowUpRight className="h-3 w-3 text-white/50" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} PRENTMA - Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>
              Desenvolvido por{' '}
              <a
                href="https://incredible-nightingale-688.convex.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 transition hover:text-white"
              >
                Ponto Criativo
              </a>
            </span>
            <Link to="/privacidade" className="transition hover:text-white">
              Privacidade
            </Link>
            <Link to="/termos" className="transition hover:text-white">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
