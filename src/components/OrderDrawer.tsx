import { FormEvent, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Product, STORE_INFO, WeightOption, formatARS } from '../data/storeData';
import { ImageWithFallback } from './ImageWithFallback';

export interface CartItem {
  product: Product;
  weight: WeightOption;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, weightLabel: string, delta: number) => void;
  onRemoveItem: (productId: string, weightLabel: string) => void;
  onClearCart: () => void;
  onGoToCatalog: () => void;
}

export function OrderDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGoToCatalog,
}: OrderDrawerProps) {
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    mode: 'pickup' | 'delivery';
    customerName: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.weight.price * item.quantity,
    0,
  );
  const freeDeliveryThreshold = 28000;
  const qualifiesFreeDelivery = subtotal >= freeDeliveryThreshold;

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    if (deliveryMode === 'delivery' && !customerAddress.trim()) return;

    const randomNum = Math.floor(1040 + Math.random() * 890);
    setConfirmedOrder({
      orderNumber: `BF-${randomNum}`,
      total: subtotal,
      mode: deliveryMode,
      customerName: customerName.trim(),
    });
    onClearCart();
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-drawer-title"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-[#F7F8F6] h-full flex flex-col border-l border-black/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/8">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#1B4332]" aria-hidden="true" />
            <h2 id="order-drawer-title" className="font-display text-xl font-semibold text-[#181A18]">
              Mi Pedido
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar panel de pedido"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#464D46] hover:text-[#181A18] hover:bg-[#ECEFE9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrder ? (
            <div className="bg-white p-6 rounded-xl border border-black/8 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-[#1B4332] mx-auto" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-[#1B4332] tabular-nums">
                  Pedido #{confirmedOrder.orderNumber} confirmado
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#181A18] mt-1">
                  ¡Gracias, {confirmedOrder.customerName}!
                </h3>
              </div>
              <p className="text-sm text-[#464D46] leading-relaxed">
                {confirmedOrder.mode === 'pickup'
                  ? `Estamos preparando tu bolsa para retirar en ${STORE_INFO.address}.`
                  : 'Nuestro repartidor del barrio coordinará la entrega en el día.'}
              </p>
              <div className="pt-4 border-t border-black/8 flex items-center justify-between text-sm">
                <span className="text-[#5A605A]">Total a abonar al recibir/retirar</span>
                <span className="font-semibold text-[#181A18] tabular-nums">
                  {formatARS(confirmedOrder.total)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors cursor-pointer"
              >
                Seguir recorriendo el local
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-black/8 text-center">
              <p className="font-display text-lg font-semibold text-[#181A18]">
                Tu lista de pedido está vacía
              </p>
              <p className="mt-2 text-sm text-[#5A605A]">
                Explorá el catálogo para sumar alimentos secos, recetas húmedas o snacks naturales.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onGoToCatalog();
                }}
                className="mt-5 px-5 py-2.5 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors cursor-pointer"
              >
                Ir al Catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Items */}
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={`${item.product.id}-${item.weight.label}`}
                    className="bg-white p-4 rounded-xl border border-black/8 flex gap-3.5"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#ECEFE9] shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-[#181A18] truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-[#5A605A] mt-0.5">
                            {item.weight.label} · {formatARS(item.weight.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.weight.label)}
                          aria-label={`Quitar ${item.product.name}`}
                          className="text-[#788078] hover:text-[#9E2A2B] transition-colors cursor-pointer p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-black/12 rounded-md bg-[#F7F8F6]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.weight.label, -1)
                            }
                            aria-label="Restar unidad"
                            className="w-7 h-7 flex items-center justify-center text-[#181A18] hover:bg-[#ECEFE9] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold tabular-nums text-[#181A18]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.product.id, item.weight.label, 1)
                            }
                            aria-label="Sumar unidad"
                            className="w-7 h-7 flex items-center justify-center text-[#181A18] hover:bg-[#ECEFE9] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-[#181A18] tabular-nums">
                          {formatARS(item.weight.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery Mode & Customer Info */}
              <form id="order-checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-black/8 space-y-3">
                  <p className="text-xs font-semibold text-[#181A18]">Modalidad de entrega</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('pickup')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        deliveryMode === 'pickup'
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-[#F7F8F6] text-[#464D46] border-black/10 hover:bg-[#ECEFE9]'
                      }`}
                    >
                      Retiro en el local
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('delivery')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        deliveryMode === 'delivery'
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-[#F7F8F6] text-[#464D46] border-black/10 hover:bg-[#ECEFE9]'
                      }`}
                    >
                      Envío a domicilio
                    </button>
                  </div>

                  {deliveryMode === 'pickup' ? (
                    <p className="text-xs text-[#5A605A]">
                      Retiro sin cargo en {STORE_INFO.address}.
                    </p>
                  ) : (
                    <p className="text-xs text-[#1B4332]">
                      {qualifiesFreeDelivery
                        ? 'Tu compra califica para envío sin cargo en el barrio.'
                        : `Te faltan ${formatARS(freeDeliveryThreshold - subtotal)} para envío sin cargo.`}
                    </p>
                  )}
                </div>

                <div className="bg-white p-4 rounded-xl border border-black/8 space-y-3">
                  <p className="text-xs font-semibold text-[#181A18]">Tus datos para reservar</p>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nombre y apellido"
                    className="w-full px-3 py-2 text-sm bg-[#F7F8F6] border border-black/12 rounded-lg text-[#181A18] focus:outline-none focus:border-[#1B4332]"
                  />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Teléfono o WhatsApp"
                    className="w-full px-3 py-2 text-sm bg-[#F7F8F6] border border-black/12 rounded-lg text-[#181A18] focus:outline-none focus:border-[#1B4332]"
                  />
                  {deliveryMode === 'delivery' && (
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Dirección de entrega y timbre"
                      className="w-full px-3 py-2 text-sm bg-[#F7F8F6] border border-black/12 rounded-lg text-[#181A18] focus:outline-none focus:border-[#1B4332]"
                    />
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer Totals */}
        {items.length > 0 && !confirmedOrder && (
          <div className="p-6 bg-white border-t border-black/8 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5A605A]">Total estimado (pago al retirar/recibir)</span>
              <span className="tabular-nums text-xl font-semibold text-[#181A18]">
                {formatARS(subtotal)}
              </span>
            </div>
            <button
              type="submit"
              form="order-checkout-form"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#1B4332] hover:bg-[#143326] rounded-lg transition-colors cursor-pointer min-h-[44px]"
            >
              Confirmar reserva del pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
