import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  HERO_IMAGE,
  HOME_SPACES,
  Product,
  STORE_INFO,
  STORE_INTERIOR_IMAGE,
  WeightOption,
} from '../data/storeData';
import { ImageWithFallback } from './ImageWithFallback';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  onOpenCatalog: (initialSpeciesFilter?: 'Todos' | 'Perros' | 'Gatos' | 'Snacks') => void;
  onOpenLocation: () => void;
  onSelectProduct: (product: Product, weight: WeightOption) => void;
  onAddToCart: (product: Product, weight: WeightOption) => void;
}

export function HomePage({
  onOpenCatalog,
  onOpenLocation,
  onSelectProduct,
  onAddToCart,
}: HomePageProps) {
  const featuredProducts = CATALOG_PRODUCTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* Espacio 1: Portada principal con imagen de mascotas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-center py-2 lg:py-8">
            <p className="text-xs font-medium text-[#1B4332] tracking-wide mb-3">
              {STORE_INFO.name} · {STORE_INFO.neighborhood}
            </p>
            <h1
              className="font-display font-semibold text-[#181A18] leading-[1.1] tracking-tight"
              style={{
                fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)',
                textWrap: 'balance',
              }}
            >
              Nutrición real para quienes te acompañan cada día
            </h1>
            <p className="mt-5 text-base text-[#464D46] leading-relaxed max-w-xl">
              En nuestro local seleccionamos alimentos balanceados, recetas húmedas y snacks
              naturales para perros y gatos, con asesoramiento cercano según la edad y necesidad
              de tu mascota.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenCatalog('Todos')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1B4332] rounded-lg hover:bg-[#143326] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenLocation}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#181A18] bg-white border border-black/15 rounded-lg hover:bg-[#ECEFE9] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
              >
                <MapPin className="w-4 h-4 text-[#1B4332]" aria-hidden="true" />
                <span>Dirección y Contacto</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden bg-[#ECEFE9] border border-black/8">
              <ImageWithFallback
                src={HERO_IMAGE}
                alt="Perro Golden Retriever y gato atigrado descansando juntos en un hogar luminoso"
                className="w-full h-full lg:h-full object-cover"
                fallbackLabel="Bocado Fiel — Alimentos Naturales para Mascotas"
              />
            </div>
          </div>
        </div>

        {/* Full-width store pillars row below hero split */}
        <div className="mt-10 pt-8 border-t border-black/8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-semibold text-[#1B4332]">01. Ingredientes claros</p>
            <p className="mt-1 text-sm text-[#464D46]">
              Proteínas de origen real sin colorantes ni rellenos artificiales.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B4332]">02. Lotes siempre frescos</p>
            <p className="mt-1 text-sm text-[#464D46]">
              Reposición semanal directa de marcas especializadas y productores locales.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B4332]">03. Asesoría en mostrador</p>
            <p className="mt-1 text-sm text-[#464D46]">
              Te ayudamos a elegir la fórmula justa según peso, etapa y sensibilidad.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1B4332]">04. Retiro o envío en el día</p>
            <p className="mt-1 text-sm text-[#464D46]">
              Reservá tu pedido en línea y retiralo al paso o recibilo en tu domicilio.
            </p>
          </div>
        </div>
      </section>

      {/* Espacio 2: Espacios por especie y tipo de alimento */}
      <section className="border-t border-black/8 bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-medium text-[#1B4332] mb-2">Espacios de la tienda</p>
              <h2
                className="font-display text-2xl sm:text-3xl font-semibold text-[#181A18] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Elegí el espacio según tu mascota
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenCatalog('Todos')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B4332] hover:underline whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Explorar todos los productos</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOME_SPACES.map((space) => (
              <article
                key={space.id}
                className="group flex flex-col border border-black/8 rounded-xl overflow-hidden bg-[#F7F8F6] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(24,26,24,0.12)]"
              >
                <button
                  type="button"
                  onClick={() => onOpenCatalog(space.speciesFilter)}
                  className="aspect-[4/3] w-full overflow-hidden bg-[#ECEFE9] cursor-pointer"
                  aria-label={`Ver ${space.title} en el catálogo`}
                >
                  <ImageWithFallback
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    fallbackLabel={space.title}
                  />
                </button>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-[#5A605A] mb-1.5">
                    {space.index}. {space.subtitle} · {space.itemCountLabel}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-[#181A18]">
                    {space.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#464D46] leading-relaxed flex-1">
                    {space.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-black/6">
                    <button
                      type="button"
                      onClick={() => onOpenCatalog(space.speciesFilter)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B4332] hover:text-[#143326] cursor-pointer"
                    >
                      <span>Ver en el catálogo</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Espacio 3: Selección destacada del catálogo */}
      <section className="border-t border-black/8 bg-[#F7F8F6] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-medium text-[#1B4332] mb-2">Favoritos del barrio</p>
              <h2
                className="font-display text-2xl sm:text-3xl font-semibold text-[#181A18] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Productos destacados en góndola
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenCatalog('Todos')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#181A18] bg-white border border-black/15 rounded-lg hover:bg-[#ECEFE9] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <span>Ver catálogo completo ({CATALOG_PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Espacio 4: Nuestro local, dirección y contacto */}
      <section
        id="nuestro-local"
        className="border-t border-black/8 bg-white py-14 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6">
              <div className="h-full min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden bg-[#ECEFE9] border border-black/8">
                <ImageWithFallback
                  src={STORE_INTERIOR_IMAGE}
                  alt="Interior luminoso de la tienda Bocado Fiel con estanterías de madera y alimentos para mascotas"
                  className="w-full h-full lg:h-full object-cover"
                  fallbackLabel="Nuestro local en Barrio Las Flores"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center py-2">
              <p className="text-xs font-medium text-[#1B4332] mb-2">Visitanos en el local</p>
              <h2
                className="font-display text-2xl sm:text-3xl font-semibold text-[#181A18] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Te esperamos junto a tu mascota en Barrio Las Flores
              </h2>
              <p className="mt-4 text-base text-[#464D46] leading-relaxed">
                Podés pasar a conocer las texturas de cada croqueta, pedir asesoramiento nutricional
                sin compromiso o retirar tu compra preparada. Las mascotas son bienvenidas en todo
                el salón.
              </p>

              <div className="mt-8 space-y-5 border-t border-black/8 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#181A18]">{STORE_INFO.address}</p>
                    <p className="text-sm text-[#5A605A]">
                      {STORE_INFO.neighborhood} · {STORE_INFO.reference}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-[#181A18] tabular-nums">
                      Teléfono del local: {STORE_INFO.phoneDisplay}
                    </p>
                    <p className="text-sm text-[#5A605A] tabular-nums">
                      WhatsApp pedidos: {STORE_INFO.whatsappDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-sm text-[#464D46] space-y-0.5">
                    {STORE_INFO.hours.map((item) => (
                      <p key={item.days} className="tabular-nums">
                        <span className="font-medium text-[#181A18]">{item.days}:</span> {item.time}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenLocation}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1B4332] rounded-lg hover:bg-[#143326] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                >
                  <span>Ver dirección completa y contacto</span>
                </button>
                <a
                  href={STORE_INFO.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#181A18] bg-[#F2F4F0] rounded-lg hover:bg-[#E5E9E2] transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <span>Llamar al local</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
