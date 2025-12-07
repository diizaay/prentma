import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Menu, User, X } from 'lucide-react';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Categorias', href: '/categorias' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Notícias', href: '/noticias' },
];

const logoSrc = '/images/Prentmapngbranco.png';

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClasses = (href, variant) => {
    const isActive = location.pathname === href;

    if (variant === 'desktop') {
      return [
        'group flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5',
        isActive
          ? 'bg-white text-primary font-semibold shadow-lg shadow-white/10'
          : 'text-white/80 hover:text-white hover:bg-white/10',
      ].join(' ');
    }

    return [
      'group flex items-center justify-between rounded-3xl border border-white/15 px-4 py-3 text-base font-semibold text-white transition-all duration-200 sm:px-6',
      isActive
        ? 'bg-white/20 shadow-lg shadow-white/10'
        : 'bg-white/10 hover:bg-white/15 hover:border-white/30',
    ].join(' ');
  };

  const NavLinks = ({ variant }) => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={getLinkClasses(item.href, variant)}
            onClick={() => variant === 'mobile' && setIsMenuOpen(false)}
          >
            <span className="font-semibold">{item.name}</span>
            {variant === 'mobile' ? (
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-200 ${
                  isActive
                    ? 'translate-x-1 text-white'
                    : 'text-white/70 group-hover:translate-x-1 group-hover:text-white'
                }`}
              />
            ) : null}
          </Link>
        );
      })}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 ${
        isMenuOpen ? 'bg-[#0071C0]' : 'bg-primary/70 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <img src={logoSrc} alt="Logotipo PRENTMA" className="h-8 w-auto" />
          </div>
          <div className="space-y-1">
            <span className="block font-display text-lg leading-none tracking-tight">PRENTMA</span>
            <span className="block text-xs uppercase tracking-[0.24em] text-white/70">Premio Nacional dos Taxistas & Mototaxistas</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <NavLinks variant="desktop" />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          
          <Link to="/inscricao">
            <Button size="sm" className="bg-white text-primary hover:bg-white/80">
              Candidatar-se
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/15 text-white lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#0071C0] pb-10 pt-6 text-white lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5">
            <Link to="/" className="flex items-center gap-3 text-white" onClick={() => setIsMenuOpen(false)}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <img src={logoSrc} alt="Logotipo PRENTMA" className="h-8 w-auto" />
              </div>
              <div className="space-y-1">
                <span className="block font-display text-lg leading-none tracking-tight">PRENTMA</span>
                <span className="block text-xs uppercase tracking-[0.24em] text-white/70">Premio Nacional dos Taxistas & Mototaxistas</span>
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/15 text-white"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-auto mt-8 w-full max-w-7xl px-5">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-lg shadow-white/5">
              <nav className="flex flex-col gap-3">
                <NavLinks variant="mobile" />
              </nav>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/inscricao" onClick={() => setIsMenuOpen(false)} className="sm:flex-1">
                <Button className="w-full justify-center bg-white text-primary hover:bg-white/85">
                  Participar agora
                </Button>
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="sm:flex-1">
                <Button
                  variant="ghost"
                  className="w-full justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

