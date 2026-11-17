import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

export type ActiveView = 'home' | 'catalog';

interface NavbarProps {
  activeView: ActiveView;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateLocalSection: () => void;
  onOpenLocation: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export function Navbar({
  activeView,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateLocalSection,
  onOpenLocation,
  onOpenCart,
  cartCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileAction = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F8F6]/95 backdrop-blur-sm border-b border-black/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#181A18] hover:text-[#1B4332] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332] cursor-pointer"
        >
          Bocado Fiel
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#464D46]"
        >
          <button
            type="button"
            onClick={onNavigateHome}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332] ${
              activeView === 'home'
                ? 'text-[#181A18] border-[#1B4332]'
                : 'border-transparent hover:text-[#181A18] hover:border-black/20'
            }`}
          >
            Página principal
          </button>

          <button
            type="button"
            onClick={onNavigateCatalog}
            className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332] ${
              activeView === 'catalog'
                ? 'text-[#181A18] border-[#1B4332]'
                : 'border-transparent hover:text-[#181A18] hover:border-black/20'
            }`}
          >
            Catálogo
          </button>

          <button
            type="button"
            onClick={onOpenLocation}
            className="py-1 border-b-2 border-transparent hover:text-[#181A18] hover:border-black/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332]"
          >
            Dirección y Contacto
          </button>

          <button
            type="button"
            onClick={onNavigateLocalSection}
            className="py-1 border-b-2 border-transparent hover:text-[#181A18] hover:border-black/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B4332]"
          >
            Nuestro Local
          </button>
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#1B4332] rounded-lg hover:bg-[#143326] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Mi Pedido</span>
            {cartCount > 0 && (
              <span className="tabular-nums text-xs font-semibold bg-white/20 px-1.5 py-0.5 rounded">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#181A18] hover:bg-black/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/8 bg-[#F7F8F6] px-4 py-3">
          <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
            <button
              type="button"
              onClick={() => handleMobileAction(onNavigateHome)}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium min-h-[44px] ${
                activeView === 'home' ? 'bg-[#ECEFE9] text-[#1B4332]' : 'text-[#181A18]'
              }`}
            >
              Página principal
            </button>
            <button
              type="button"
              onClick={() => handleMobileAction(onNavigateCatalog)}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium min-h-[44px] ${
                activeView === 'catalog' ? 'bg-[#ECEFE9] text-[#1B4332]' : 'text-[#181A18]'
              }`}
            >
              Catálogo
            </button>
            <button
              type="button"
              onClick={() => handleMobileAction(onOpenLocation)}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#181A18] hover:bg-[#ECEFE9] min-h-[44px]"
            >
              Dirección y Contacto
            </button>
            <button
              type="button"
              onClick={() => handleMobileAction(onNavigateLocalSection)}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#181A18] hover:bg-[#ECEFE9] min-h-[44px]"
            >
              Nuestro Local
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
