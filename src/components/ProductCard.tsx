import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product, WeightOption, formatARS } from '../data/storeData';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product, selectedWeight: WeightOption) => void;
  onAddToCart: (product: Product, weight: WeightOption) => void;
}

export function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
}: ProductCardProps) {
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const activeWeight = product.weights[selectedWeightIndex] || product.weights[0];

  const handleAdd = () => {
    onAddToCart(product, activeWeight);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col bg-white border border-black/8 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(24,26,24,0.12)]">
      <button
        type="button"
        onClick={() => onSelectProduct(product, activeWeight)}
        className="relative aspect-[4/3] w-full bg-[#ECEFE9] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1B4332]"
        aria-label={`Ver detalles de ${product.name}`}
      >
        <ImageWithFallback
          src={product.image}
          alt={`${product.name} - ${product.brand}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          fallbackLabel={product.name}
        />
      </button>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-[#5A605A] mb-1.5">
          <span className="truncate">
            {product.brand} · {product.species}
          </span>
          <span
            className={`shrink-0 font-medium ${
              product.stockStatus === 'Disponible' ? 'text-[#1B4332]' : 'text-[#8C4A1C]'
            }`}
          >
            {product.stockStatus}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSelectProduct(product, activeWeight)}
          className="text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
        >
          <h3 className="font-sans text-base font-semibold text-[#181A18] leading-snug group-hover:text-[#1B4332] transition-colors">
            {product.name}
          </h3>
        </button>

        <p className="mt-1.5 text-sm text-[#5A605A] line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Weight Selector */}
        <div className="mt-4 pt-4 border-t border-black/6 flex flex-wrap gap-1.5" role="group" aria-label="Presentación">
          {product.weights.map((weight, idx) => {
            const isSelected = idx === selectedWeightIndex;
            return (
              <button
                key={weight.label}
                type="button"
                onClick={() => setSelectedWeightIndex(idx)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[32px] ${
                  isSelected
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-[#F2F4F0] text-[#3F453F] hover:bg-[#E5E9E2]'
                }`}
              >
                {weight.label}
              </button>
            );
          })}
        </div>

        {/* Price and Add Button */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-[#5A605A]">Precio</span>
            <span className="tabular-nums text-lg font-semibold text-[#181A18]">
              {formatARS(activeWeight.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332] ${
              justAdded
                ? 'bg-[#2D6A4F] text-white'
                : 'bg-[#181A18] text-white hover:bg-[#1B4332]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
