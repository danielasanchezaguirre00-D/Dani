import { STORE_INFO } from '../data/storeData';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onOpenLocation: () => void;
}

export function Footer({
  onNavigateHome,
  onNavigateCatalog,
  onOpenLocation,
}: FooterProps) {
  return (
    <footer className="border-t border-black/8 bg-[#ECEFE9] text-[#181A18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-black/8">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-semibold tracking-tight">{STORE_INFO.name}</p>
            <p className="mt-2 text-sm text-[#464D46] max-w-sm leading-relaxed">
              {STORE_INFO.tagline}. Alimentos seleccionados con ingredientes transparentes y
              atención cercana en nuestro local.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-semibold text-[#1B4332]">Navegación</p>
            <ul className="space-y-2 text-[#464D46]">
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="hover:text-[#181A18] hover:underline cursor-pointer"
                >
                  Página principal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateCatalog}
                  className="hover:text-[#181A18] hover:underline cursor-pointer"
                >
                  Catálogo de productos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenLocation}
                  className="hover:text-[#181A18] hover:underline cursor-pointer"
                >
                  Dirección y Contacto
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2 text-sm text-[#464D46]">
            <p className="text-xs font-semibold text-[#1B4332]">Local y Contacto</p>
            <p className="font-medium text-[#181A18]">{STORE_INFO.address}</p>
            <p>{STORE_INFO.neighborhood}</p>
            <p className="tabular-nums pt-1">Tel: {STORE_INFO.phoneDisplay}</p>
            <p className="tabular-nums">WhatsApp: {STORE_INFO.whatsappDisplay}</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5A605A]">
          <p>© {new Date().getFullYear()} {STORE_INFO.name}. Todos los derechos reservados.</p>
          <p>Lunes a Sábado de 09:00 a 20:00 hs · Domingos de 10:00 a 14:00 hs</p>
        </div>
      </div>
    </footer>
  );
}
