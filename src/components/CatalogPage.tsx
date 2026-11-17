import { useMemo, useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  Product,
  ProductCategory,
  WeightOption,
} from '../data/storeData';
import { ProductCard } from './ProductCard';

export type SpeciesFilter = 'Todos' | 'Perros' | 'Gatos' | 'Snacks';
type SortOption = 'featured' | 'price-asc' | 'price-desc';

interface CatalogPageProps {
  initialSpeciesFilter: SpeciesFilter;
  onBackHome: () => void;
  onSelectProduct: (product: Product, weight: WeightOption) => void;
  onAddToCart: (product: Product, weight: WeightOption) => void;
}

const SPECIES_TABS: { id: SpeciesFilter; label: string }[] = [
  { id: 'Todos', label: 'Todo el catálogo' },
  { id: 'Perros', label: 'Perros' },
  { id: 'Gatos', label: 'Gatos' },
  { id: 'Snacks', label: 'Snacks y Suplementos' },
];

const CATEGORIES: ('Todas' | ProductCategory)[] = [
  'Todas',
  'Alimento Seco',
  'Alimento Húmedo',
  'Snacks Naturales',
  'Suplementos',
];

export function CatalogPage({
  initialSpeciesFilter,
  onBackHome,
  onSelectProduct,
  onAddToCart,
}: CatalogPageProps) {
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>(initialSpeciesFilter);
  const [categoryFilter, setCategoryFilter] = useState<'Todas' | ProductCategory>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = CATALOG_PRODUCTS.filter((product) => {
      // Species filter
      if (speciesFilter === 'Perros' && product.species === 'Gatos') return false;
      if (speciesFilter === 'Gatos' && product.species === 'Perros') return false;
      if (
        speciesFilter === 'Snacks' &&
        product.category !== 'Snacks Naturales' &&
        product.category !== 'Suplementos'
      ) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'Todas' && product.category !== categoryFilter) {
        return false;
      }

      // Search query
      if (query.length > 0) {
        const haystack =
          `${product.name} ${product.brand} ${product.description} ${product.ingredients} ${product.category}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.weights[0].price - b.weights[0].price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.weights[0].price - a.weights[0].price);
    }
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [speciesFilter, categoryFilter, searchQuery, sortBy]);

  const resetFilters = () => {
    setSpeciesFilter('Todos');
    setCategoryFilter('Todas');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Header & Back link */}
      <div className="pb-8 border-b border-black/8">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#464D46] hover:text-[#181A18] transition-colors cursor-pointer mb-4"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Volver a la Página principal</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1
              className="font-display text-3xl sm:text-4xl font-semibold text-[#181A18] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Catálogo completo del local
            </h1>
            <p className="mt-2 text-base text-[#464D46] max-w-2xl">
              Todos los alimentos secos, sobres húmedos, snacks deshidratados y suplementos que
              ofrecemos en nuestra tienda.
            </p>
          </div>
          <p className="text-sm text-[#5A605A] tabular-nums shrink-0">
            Mostrando <span className="font-semibold text-[#181A18]">{filteredProducts.length}</span>{' '}
            de {CATALOG_PRODUCTS.length} productos
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="py-6 flex flex-col gap-4 border-b border-black/8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Species Segmented Control */}
          <div
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#ECEFE9] rounded-lg self-start"
            role="tablist"
            aria-label="Filtrar por tipo de mascota"
          >
            {SPECIES_TABS.map((tab) => {
              const active = speciesFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSpeciesFilter(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                    active
                      ? 'bg-white text-[#181A18] shadow-xs'
                      : 'text-[#464D46] hover:text-[#181A18]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#5A605A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar sabor, marca o ingrediente..."
                aria-label="Buscar productos en el catálogo"
                className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-black/15 rounded-lg text-[#181A18] placeholder:text-[#788078] focus:outline-none focus:border-[#1B4332]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A605A] hover:text-[#181A18] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              className="px-3 py-2 text-sm bg-white border border-black/15 rounded-lg text-[#181A18] focus:outline-none focus:border-[#1B4332] cursor-pointer min-h-[38px]"
            >
              <option value="featured">Orden: Destacados</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Secondary Category Filter */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#5A605A] font-medium mr-1">Línea:</span>
          {CATEGORIES.map((category) => {
            const active = categoryFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-white border border-black/10 text-[#464D46] hover:bg-[#ECEFE9]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white border border-black/8 rounded-xl mt-8 px-6">
          <p className="font-display text-xl font-semibold text-[#181A18]">
            No encontramos productos con esa combinación
          </p>
          <p className="mt-2 text-sm text-[#5A605A]">
            Probá quitando alguno de los filtros o buscando otro ingrediente.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 px-5 py-2.5 text-sm font-medium text-white bg-[#1B4332] rounded-lg hover:bg-[#143326] transition-colors cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
