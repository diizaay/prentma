import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  User,
} from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0071C0] text-white">
      <section className="relative overflow-hidden pb-24 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]"></div>
        <div className="relative mx-auto max-w-4xl space-y-8 px-4 text-center lg:px-0">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Área exclusiva para candidatos e cooperativas
          </h1>
          <p className="text-base font-normal text-white/85 sm:text-lg">
            Aceda ao painel para acompanhar inscrições, validar documentos e receber notificações do PRENTMA.
          </p>
        </div>
      </section>

      <section className="-mt-16 flex items-center justify-center bg-white py-20 text-[#171E43]">
        <Card className="w-full max-w-md rounded-[32px] border-none bg-white p-2 text-[#171E43] shadow-2xl shadow-primary/30">
          <CardHeader className="space-y-2 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0071C0]">Acesso seguro</span>
            <CardTitle className="font-display text-2xl font-semibold text-[#171E43]">Entrar no painel</CardTitle>
            <CardDescription className="text-sm font-normal text-[#171E43]/70">
              Utilize o email registado para gerir a sua candidatura.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm font-normal text-[#171E43]/75">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0071C0]">Email</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0071C0]" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu.email@exemplo.com"
                    required
                    className="w-full rounded-2xl border border-[#D7E3FF] bg-white/90 py-3 pl-12 pr-4 text-[#171E43] focus:border-[#0071C0] focus:outline-none focus:ring-2 focus:ring-[#0071C0]/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0071C0]">Palavra-passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0071C0]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="********"
                    required
                    className="w-full rounded-2xl border border-[#D7E3FF] bg-white/90 py-3 pl-12 pr-12 text-[#171E43] focus:border-[#0071C0] focus:outline-none focus:ring-2 focus:ring-[#0071C0]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0071C0]/70 transition hover:text-[#0071C0]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[#171E43]/60">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-[#D7E3FF] text-[#0071C0] focus:ring-[#0071C0]" />
                  <span>Lembrar sessão</span>
                </label>
                <Link to="/recuperar-senha" className="text-[#0071C0] transition hover:text-[#005ea5]">
                  Recuperar palavra-passe
                </Link>
              </div>

              <Button type="submit" disabled={loading} className="w-full rounded-full bg-[#0071C0] text-white hover:bg-[#005ea5] disabled:bg-[#0071C0]/50">
                {loading ? 'A entrar…' : 'Entrar na plataforma'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-6 space-y-4 text-center text-sm">
              <p className="text-[#171E43]/60">
                Não tem conta?
                <Link to="/registro" className="ml-1 font-semibold text-[#0071C0] hover:text-[#005ea5]">
                  Criar registo
                </Link>
              </p>
              <Button
                variant="outline"
                className="w-full rounded-full border-[#0071C0]/40 text-[#0071C0] hover:bg-white/80"
                onClick={() => (window.location.href = '/inscricao')}
              >
                Fazer candidatura
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
