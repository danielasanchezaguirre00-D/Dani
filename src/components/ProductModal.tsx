import { useEffect, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { Product, WeightOption, formatARS } from '../data/storeData';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductModalProps {
  product: Product | null;
  initialWeight: WeightOption | null;
  onClose: () => void;
  onAddToCart: (product: Product, weight: WeightOption) => void;
}

export function ProductModal({
  product,
  initialWeight,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(initialWeight);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedWeight(initialWeight || (product ? product.weights[0] : null));
    setAdded(false);
  }, [product, initialWeight]);

  if (!product || !selectedWeight) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedWeight);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-black/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle del producto"
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/90 text-[#181A18] border border-black/10 hover:bg-[#ECEFE9] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          <div className="md:col-span-6 bg-[#ECEFE9] min-h-[260px]">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              fallbackLabel={product.name}
            />
          </div>

          <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <p className="text-xs text-[#5A605A]">
                {product.brand} · {product.species} · {product.category}
              </p>
              <h2
                id="product-modal-title"
                className="font-display text-2xl font-semibold text-[#181A18] mt-1.5 leading-tight"
              >
                {product.name}
              </h2>
              <p className="text-xs font-medium text-[#1B4332] mt-1">
                {product.lifeStage} · {product.nutritionHighlight}
              </p>

              <p className="mt-4 text-sm text-[#464D46] leading-relaxed">
                {product.description}
              </p>

              <div className="mt-4 pt-4 border-t border-black/8">
                <p className="text-xs font-semibold text-[#181A18] mb-1">
                  Ingredientes principales
                </p>
                <p className="text-xs text-[#5A605A] leading-relaxed">{product.ingredients}</p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-[#181A18] mb-2">Elegí presentación</p>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((weight) => {
                    const active = weight.label === selectedWeight.label;
                    return (
                      <button
                        key={weight.label}
                        type="button"
                        onClick={() => setSelectedWeight(weight)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1B4332] text-white'
                            : 'bg-[#F2F4F0] text-[#3F453F] hover:bg-[#E5E9E2]'
                        }`}
                      >
                        {weight.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-black/8 flex items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-[#5A605A]">Precio presentación</span>
                <span className="tabular-nums text-2xl font-semibold text-[#181A18]">
                  {formatARS(selectedWeight.price)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-colors cursor-pointer min-h-[44px] ${
                  added
                    ? 'bg-[#2D6A4F] text-white'
                    : 'bg-[#1B4332] text-white hover:bg-[#143326]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Agregado al pedido</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    <span>Agregar al pedido</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
