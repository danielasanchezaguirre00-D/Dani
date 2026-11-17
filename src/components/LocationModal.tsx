import { useState } from 'react';
import { Check, Clock, Copy, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [copiedField, setCopiedField] = useState<'address' | 'phone' | null>(null);

  if (!isOpen) return null;

  const copyText = async (value: string, field: 'address' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F7F8F6] rounded-2xl border border-black/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-white border-b border-black/8">
          <div>
            <p className="text-xs font-medium text-[#1B4332]">Información del local</p>
            <h2
              id="location-modal-title"
              className="font-display text-2xl font-semibold text-[#181A18] mt-0.5"
            >
              Dirección y Contacto
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de dirección y contacto"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#464D46] hover:text-[#181A18] hover:bg-[#ECEFE9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Address & Phone grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Address Block */}
            <div className="bg-white p-5 rounded-xl border border-black/8 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B4332] mb-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Dirección del local</span>
                </div>
                <p className="text-base font-semibold text-[#181A18]">{STORE_INFO.address}</p>
                <p className="text-sm text-[#464D46] mt-0.5">{STORE_INFO.neighborhood}</p>
                <p className="text-xs text-[#5A605A] mt-2 leading-relaxed">
                  {STORE_INFO.reference}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  copyText(`${STORE_INFO.address}, ${STORE_INFO.neighborhood}`, 'address')
                }
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#181A18] bg-[#F2F4F0] hover:bg-[#E5E9E2] rounded-lg transition-colors cursor-pointer self-start"
              >
                {copiedField === 'address' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1B4332]" aria-hidden="true" />
                    <span>Dirección copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copiar dirección</span>
                  </>
                )}
              </button>
            </div>

            {/* Contact Numbers Block */}
            <div className="bg-white p-5 rounded-xl border border-black/8 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1B4332]">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Números de contacto</span>
                </div>

                <div>
                  <p className="text-xs text-[#5A605A]">Teléfono fijo del local</p>
                  <p className="text-lg font-semibold text-[#181A18] tabular-nums">
                    {STORE_INFO.phoneDisplay}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/6">
                  <p className="text-xs text-[#5A605A] flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#1B4332]" aria-hidden="true" />
                    <span>WhatsApp consultas y pedidos</span>
                  </p>
                  <p className="text-sm font-semibold text-[#181A18] tabular-nums mt-0.5">
                    {STORE_INFO.whatsappDisplay}
                  </p>
                </div>

                <div className="pt-2 border-t border-black/6 flex items-center gap-2 text-xs text-[#464D46]">
                  <Mail className="w-3.5 h-3.5 text-[#5A605A]" aria-hidden="true" />
                  <span>{STORE_INFO.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={STORE_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Llamar ahora</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyText(STORE_INFO.phoneDisplay, 'phone')}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#181A18] bg-[#F2F4F0] hover:bg-[#E5E9E2] rounded-lg transition-colors cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1B4332]" aria-hidden="true" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copiar número</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Opening Hours & Neighborhood Reference Map */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-black/8">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1B4332] mb-3">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Horarios de atención</span>
              </div>
              <dl className="divide-y divide-black/6 text-sm">
                {STORE_INFO.hours.map((row) => (
                  <div key={row.days} className="py-2.5 flex items-center justify-between gap-3">
                    <dt className="text-[#464D46]">{row.days}</dt>
                    <dd className="font-semibold text-[#181A18] tabular-nums">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 pt-3 border-t border-black/6 text-xs text-[#5A605A] leading-relaxed">
                {STORE_INFO.deliveryNote}
              </p>
            </div>

            {/* Clean schematic neighborhood locator */}
            <div className="bg-white p-5 rounded-xl border border-black/8 flex flex-col justify-between">
              <p className="text-xs font-semibold text-[#1B4332] mb-2">Plano de ubicación</p>
              <div className="relative rounded-lg overflow-hidden bg-[#ECEFE9] border border-black/8 h-40 flex items-center justify-center">
                <svg
                  viewBox="0 0 320 160"
                  className="w-full h-full"
                  role="img"
                  aria-label="Plano esquemático de ubicación de Bocado Fiel en Av. del Libertador 1480"
                >
                  <rect width="320" height="160" fill="#ECEFE9" />
                  {/* Park Plaza Las Flores */}
                  <rect x="20" y="18" width="76" height="52" rx="6" fill="#D8E2D4" />
                  <text x="58" y="47" textAnchor="middle" fontSize="9" fill="#2D4A36" fontWeight="600">
                    Plaza Las Flores
                  </text>
                  {/* Streets */}
                  <line x1="0" y1="95" x2="320" y2="95" stroke="#FFFFFF" strokeWidth="12" />
                  <line x1="115" y1="0" x2="115" y2="160" stroke="#FFFFFF" strokeWidth="8" />
                  <line x1="230" y1="0" x2="230" y2="160" stroke="#FFFFFF" strokeWidth="8" />
                  <line x1="0" y1="140" x2="320" y2="140" stroke="#FFFFFF" strokeWidth="6" />
                  {/* Street labels */}
                  <text x="172" y="98" textAnchor="middle" fontSize="8" fill="#5A605A" fontWeight="600">
                    Av. del Libertador 1480
                  </text>
                  <text
                    x="112"
                    y="45"
                    textAnchor="middle"
                    fontSize="7.5"
                    fill="#6C736C"
                    transform="rotate(-90 112 45)"
                  >
                    Los Aromos
                  </text>
                  {/* Store Marker */}
                  <circle cx="195" cy="78" r="14" fill="#1B4332" fillOpacity="0.16" />
                  <circle cx="195" cy="78" r="7" fill="#1B4332" />
                  <circle cx="195" cy="78" r="2.5" fill="#FFFFFF" />
                  <rect x="150" y="42" width="90" height="22" rx="5" fill="#181A18" />
                  <text x="195" y="56" textAnchor="middle" fontSize="9" fill="#FFFFFF" fontWeight="600">
                    Bocado Fiel · Local 4
                  </text>
                </svg>
              </div>
              <p className="mt-2.5 text-xs text-[#5A605A]">
                Estacionamiento libre sobre Av. del Libertador frente al local.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
