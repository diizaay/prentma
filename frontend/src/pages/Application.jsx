import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { createApplication } from '../services/api';
import {
  FileText,
  Upload,
  CheckCircle,
  CheckCircle2,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  GraduationCap,
  ClipboardCheck,
  Building2,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  { number: 1, title: 'Identificação' },
  { number: 2, title: 'Informação Profissional' },
  { number: 3, title: 'Documentos' },
  { number: 4, title: 'Revisão' },
];

const categorias = [
  {
    value: 'taxista',
    label: 'Taxista do Ano',
    description: 'Excelência comprovada no serviço de táxi em Angola.',
  },
  {
    value: 'mototaxista',
    label: 'Mototaxista do Ano',
    description: 'Profissional que redefine a mobilidade sobre duas rodas.',
  },
  {
    value: 'exemplo',
    label: 'Exemplo do Ano',
    description: 'História inspiradora que gerou impacto positivo na comunidade.',
  },
  {
    value: 'cooperativa',
    label: 'Cooperativa do Ano',
    description: 'Organização que lidera inovação, gestão e impacto social.',
  },
];

const cities = [
  'Bengo',
  'Benguela',
  'Bié',
  'Cabinda',
  'Cuando',
  'Cubango',
  'Cunene',
  'Huambo',
  'Huíla',
  'Cuanza Norte',
  'Cuanza Sul',
  'Icolo e Bengo',
  'Luanda',
  'Lunda Norte',
  'Lunda Sul',
  'Malanje',
  'Moxico',
  'Moxico Leste',
  'Namibe',
  'Uíge',
  'Zaire',
];

const documents = [
  { key: 'identification', label: 'Bilhete de Identidade', icon: User },
  { key: 'seguro', label: 'Comprovativo de Seguro', icon: ShieldCheck },
  { key: 'licenca', label: 'Licença ou Filiação', icon: FileText },
  { key: 'certificado', label: 'Certificado Escolar (min. 9ª classe)', icon: GraduationCap },
];


const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64 = result.split(',')[1] || '';
        resolve(base64);
      } else {
        reject(new Error('Nao foi possivel ler o ficheiro.'));
      }
    };
    reader.onerror = () => reject(new Error('Nao foi possivel ler o ficheiro.'));
    reader.readAsDataURL(file);
  });


export const Application = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    category: '',
    yearsExperience: '',
    municipality: '',
    identification: null,
    seguro: null,
    licenca: null,
    certificado: null,
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileUpload = (documentType, file) => {
    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('O ficheiro deve ter no maximo 2MB');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [documentType]: file,
    }));

    toast.custom((t) => (
      <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-white p-4 text-[#171E43] shadow-xl shadow-primary/20">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0071C0]/10 text-[#0071C0]">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Documento carregado</p>
          <p className="text-xs text-[#171E43]/70">{file.name}</p>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss(t)}
          className="text-[#171E43]/40 transition hover:text-[#171E43]/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ));
  };

  const handleFileRemove = (documentType) => {
    const removedFile = formData[documentType];

    setFormData((prev) => ({
      ...prev,
      [documentType]: null,
    }));

    if (removedFile) {
      toast.custom((t) => (
        <div className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl bg-white p-4 text-[#171E43] shadow-xl shadow-primary/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0071C0]/10 text-[#0071C0]">
            <X className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Documento removido</p>
            <p className="text-xs text-[#171E43]/70">{removedFile.name}</p>
          </div>
          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-[#171E43]/40 transition hover:text-[#171E43]/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ));
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.city &&
          formData.address
        );
      case 2:
        return formData.category && formData.yearsExperience && formData.municipality;
      case 3:
        return formData.identification && formData.seguro && formData.licenca && formData.certificado;
      case 4:
        return acceptedTerms;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!acceptedTerms) {
      toast.error('Aceite a declaracao antes de submeter.');
      return;
    }

    setIsSubmitting(true);

    try {
      const documentsPayload = [];

      for (const documentDef of documents) {
        const file = formData[documentDef.key];
        if (!file) {
          continue;
        }

        const base64 = await fileToBase64(file);
        documentsPayload.push({
          type: documentDef.key,
          name: file.name,
          content_type: file.type || 'application/octet-stream',
          size: file.size,
          data: base64,
        });
      }

      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        category: formData.category,
        years_experience: formData.yearsExperience,
        municipality: formData.municipality,
        accepted_terms: acceptedTerms,
        documents: documentsPayload,
      };

      const application = await createApplication(payload);

      const handleSubmit = async () => {
  if (isSubmitting) return;

  if (!acceptedTerms) {
    toast.error('Aceite a declaracao antes de submeter.');
    return;
  }

  setIsSubmitting(true);

  try {
    const documentsPayload = [];
    for (const documentDef of documents) {
      const file = formData[documentDef.key];
      if (!file) continue;
      const base64 = await fileToBase64(file);
      documentsPayload.push({
        type: documentDef.key,
        name: file.name,
        content_type: file.type || 'application/octet-stream',
        size: file.size,
        data: base64,
      });
    }

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      category: formData.category,
      years_experience: formData.yearsExperience,
      municipality: formData.municipality,
      accepted_terms: acceptedTerms,
      documents: documentsPayload,
    };

    // 1. Cria candidatura
    const application = await createApplication(payload);

    // 2. Dispara SMS via backend
    await fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone_number: formData.phone,
        message_body: `Olá ${formData.firstName}, sua candidatura foi recebida com sucesso! ID: ${application.id}`,
      }),
    });

    toast.success('Candidatura submetida com sucesso!');

    // 3. Reset do formulário e navegação
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      category: '',
      yearsExperience: '',
      municipality: '',
      identification: null,
      seguro: null,
      licenca: null,
      certificado: null,
    });
    setAcceptedTerms(false);
    setCurrentStep(1);

    navigate('/candidatura-sucesso', { state: { application } });
  } catch (error) {
    console.error(error);
    toast.error(error.message || 'Nao foi possivel submeter a candidatura.');
  } finally {
    setIsSubmitting(false);
  }
};


      toast.success('Candidatura submetida com sucesso!');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        category: '',
        yearsExperience: '',
        municipality: '',
        identification: null,
        seguro: null,
        licenca: null,
        certificado: null,
      });
      setAcceptedTerms(false);
      setCurrentStep(1);
      navigate('/candidatura-sucesso', { state: { application } });
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Nao foi possivel submeter a candidatura.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="mb-10 flex flex-col gap-4">
      <div className="grid gap-4 rounded-3xl border border-white/20 bg-white/10 p-4 text-white sm:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center gap-3">
            <div
              className={[
                'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold',
                currentStep === step.number ? 'border-white bg-white text-[#171E43]' : 'border-white/30 text-white/70',
              ].join(' ')}
            >
              {step.number}
            </div>
            <span
              className={[
                'text-sm font-medium',
                currentStep === step.number ? 'text-white' : 'text-white/70',
              ].join(' ')}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-[#171E43]">Dados pessoais</h3>
            <p className="text-sm text-[#171E43]/70">
              Utilize os mesmos dados presentes nos documentos oficiais. Isso garante uma validação mais rápida pela equipa.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Primeiro nome *
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#171E43]/40" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-11 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                  />
                </div>
              </label>
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Último nome *
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-4 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Email *
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#171E43]/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-11 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                  />
                </div>
              </label>
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Telefone *
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#171E43]/40" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-11 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                  />
                </div>
              </label>
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Cidade *
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#171E43]/40" />
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-11 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                  >
                    <option value="">Selecione a cidade</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Morada completa *
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-4 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                />
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-[#171E43]">Informação profissional</h3>
            <p className="text-sm text-[#171E43]/70">
              Selecione a categoria principal e indique a experiência e zona de atuação. Estes dados ajudam na avaliação inicial.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {categorias.map((categoria) => (
                <label
                  key={categoria.value}
                  className={[
                    'flex cursor-pointer flex-col gap-3 rounded-3xl border p-5 transition',
                    formData.category === categoria.value
                      ? 'border-[#0071C0] bg-[#0071C0]/5 shadow-lg shadow-[#0071C0]/20'
                      : 'border-[#D7E3FF] bg-white shadow-sm hover:border-[#0071C0]/20',
                  ].join(' ')}
                >
                  <div>
                    <span className="font-display text-lg font-semibold text-[#171E43]">{categoria.label}</span>
                  </div>
                  <p className="text-sm text-[#171E43]/70">{categoria.description}</p>
                  <input
                    type="radio"
                    name="category"
                    value={categoria.value}
                    checked={formData.category === categoria.value}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Anos de experiência *
                <select
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-4 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="1-2">1-2 anos</option>
                  <option value="3-5">3-5 anos</option>
                  <option value="6-10">6-10 anos</option>
                  <option value="10+">Mais de 10 anos</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-[#171E43]/70">
                Município de actuação *
                <input
                  type="text"
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleInputChange}
                  placeholder="Ex: Municipio do Cazenga"
                  className="w-full rounded-2xl border border-[#D7E3FF] bg-[#EEF4FF] px-4 py-3 text-[#171E43] focus:border-[#0071C0] focus:outline-none"
                />
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-[#171E43]">Documentação obrigatória</h3>
            <p className="text-sm text-[#171E43]/70">
              Faça upload dos documentos em formato PDF, JPG ou PNG. Tamanho máximo de 2MB por ficheiro.
            </p>
            <div className="grid gap-4">
              {documents.map((doc) => {
                const Icon = doc.icon;
                const file = formData[doc.key];
                return (
                  <div
                    key={doc.key}
                    className="flex flex-col gap-3 rounded-3xl border border-[#D7E3FF] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3 text-[#171E43]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#0071C0]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{doc.label}</p>
                        <p className="text-xs text-[#171E43]/60">Formato PDF, JPG ou PNG · Max. 2MB</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-end">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(event) => {
                          const nextFile = event.target.files?.[0] || null;
                          if (nextFile) {
                            handleFileUpload(doc.key, nextFile);
                          }
                          event.target.value = '';
                        }}
                        className="hidden"
                        id={`file-${doc.key}`}
                      />
                      <label
                        htmlFor={`file-${doc.key}`}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#0071C0]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0071C0] transition hover:bg-[#0071C0]/10"
                      >
                        <Upload className="h-4 w-4" />
                        {file ? 'Substituir ficheiro' : 'Carregar ficheiro'}
                      </label>
                      {file ? (
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#171E43] shadow-sm shadow-[#171E43]/10">
                            <CheckCircle2 className="h-4 w-4 text-[#0071C0]" />
                            <span className="font-medium">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleFileRemove(doc.key)}
                            className="inline-flex items-center gap-1 rounded-full border border-[#0071C0]/25 px-3 py-1 text-xs font-semibold text-[#0071C0] transition hover:bg-[#0071C0]/10"
                          >
                            <X className="h-3.5 w-3.5" />
                            Remover
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-[#171E43]">Revisão da candidatura</h3>
            <p className="text-sm text-[#171E43]/70">
              Verifique se todos os dados estão corretos. Depois da submissão, podera acompanhar o processo no portal do candidato.
            </p>
            <div className="grid gap-4">
              <div className="rounded-3xl border border-[#D7E3FF] bg-white p-5">
                <h4 className="font-semibold text-[#171E43]">Dados pessoais</h4>
                <p className="text-sm text-[#171E43]/70">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-sm text-[#171E43]/70">
                  {formData.email} · {formData.phone}
                </p>
                <p className="text-sm text-[#171E43]/70">
                  {formData.city}, {formData.address}
                </p>
              </div>
              <div className="rounded-3xl border border-[#D7E3FF] bg-white p-5">
                <h4 className="font-semibold text-[#171E43]">Informação profissional</h4>
                <p className="text-sm text-[#171E43]/70">Categoria: {formData.category}</p>
                <p className="text-sm text-[#171E43]/70">Experiência: {formData.yearsExperience}</p>
                <p className="text-sm text-[#171E43]/70">Município: {formData.municipality}</p>
              </div>
              <div className="rounded-3xl border border-[#D7E3FF] bg-white p-5">
                <h4 className="font-semibold text-[#171E43]">Documentação</h4>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  {documents.map((doc) =>
                    formData[doc.key] ? (
                      <Badge key={doc.key} className="rounded-full bg-[#EEF4FF] px-4 py-1 text-xs font-semibold text-[#0071C0]">
                        {doc.label}
                      </Badge>
                    ) : null
                  )}
                </div>
              </div>
              <div className="rounded-3xl border border-[#D7E3FF] bg-white p-5">
                <h4 className="mb-2 font-semibold text-[#171E43]">Declaração</h4>
                <p className="text-sm text-[#171E43]/70">
                  Declaro que todas as informações fornecidas são verdadeiras e aceito os{' '}
                  <a href="/termos" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#171E43]">
                    termos e condições
                  </a>{' '}
                  do PRENTMA.
                </p>
                <label className="mt-4 flex items-center gap-3 text-sm text-[#171E43]">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="h-5 w-5 rounded border border-primary/30"
                    required
                  />
                  Confirmo a declaração acima *
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 pb-20 lg:px-6">
        <div className="mb-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15">
            <ClipboardCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="mt-6 font-semibold text-4xl leading-tight sm:text-6xl">Candidatura PRENTMA 2025</h1>
          <p className="mt-4 text-base text-white/80">
            Preencha o formulario em quatro passos simples e acompanhe todo o processo de forma digital.
          </p>
        </div>

        <StepIndicator />

        {isSubmitting ? (
          <div className="rounded-[32px] border border-white/15 bg-white/10 p-12 text-center backdrop-blur">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-semibold">Candidatura submetida!</h2>
            <p className="mt-3 text-sm text-white/80">
              Estamos a validar os seus dados. Em breve recebera uma confirmação por e-mail.
            </p>
          </div>
        ) : (
          <Card className="rounded-[32px] border-none bg-white p-2 text-[#171E43] shadow-2xl shadow-primary/30">
            <CardHeader className="space-y-1 border-b border-primary/10 pb-6">
              <CardTitle className="font-display text-2xl font-semibold text-[#171E43]">
                {steps[currentStep - 1]?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 lg:p-10">
              {renderStepContent()}

              <div className="mt-10 flex flex-col-reverse gap-4 border-t border-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    className="border-[#0071C0]/20 text-[#171E43] hover:bg-[#EEF4FF]"
                  >
                    Voltar
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-[#0071C0] text-white hover:bg-[#005ea5] disabled:bg-[#0071C0]/40 disabled:text-white/70"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!acceptedTerms}
                    className="bg-[#0071C0] text-white hover:bg-[#005ea5] disabled:bg-[#0071C0]/40 disabled:text-white/70"
                  >
                    Submeter candidatura
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        
      </div>
    </div>
  );
};
