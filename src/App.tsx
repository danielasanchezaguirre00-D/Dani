import { useEffect, useState } from 'react';
import { CatalogPage, SpeciesFilter } from './components/CatalogPage';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { LocationModal } from './components/LocationModal';
import { ActiveView, Navbar } from './components/Navbar';
import { CartItem, OrderDrawer } from './components/OrderDrawer';
import { ProductModal } from './components/ProductModal';
import { Product, WeightOption } from './data/storeData';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [catalogSpeciesFilter, setCatalogSpeciesFilter] = useState<SpeciesFilter>('Todos');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    weight: WeightOption;
  } | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLocationModalOpen(false);
        setCartDrawerOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCatalog = (initialFilter: SpeciesFilter = 'Todos') => {
    setCatalogSpeciesFilter(initialFilter);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLocalSection = () => {
    if (activeView !== 'home') {
      setActiveView('home');
      window.setTimeout(() => {
        document.getElementById('nuestro-local')?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      document.getElementById('nuestro-local')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: Product, weight: WeightOption) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.weight.label === weight.label,
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { product, weight, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    weightLabel: string,
    delta: number,
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.weight.label === weightLabel
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (productId: string, weightLabel: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.weight.label === weightLabel),
      ),
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F6] text-[#181A18]">
      <Navbar
        activeView={activeView}
        onNavigateHome={navigateToHome}
        onNavigateCatalog={() => navigateToCatalog('Todos')}
        onNavigateLocalSection={navigateToLocalSection}
        onOpenLocation={() => setLocationModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={totalCartCount}
      />

      <main className="flex-1">
        {activeView === 'home' ? (
          <HomePage
            onOpenCatalog={(species) => navigateToCatalog(species || 'Todos')}
            onOpenLocation={() => setLocationModalOpen(true)}
            onSelectProduct={(product, weight) => setSelectedProduct({ product, weight })}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <CatalogPage
            key={catalogSpeciesFilter}
            initialSpeciesFilter={catalogSpeciesFilter}
            onBackHome={navigateToHome}
            onSelectProduct={(product, weight) => setSelectedProduct({ product, weight })}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      <Footer
        onNavigateHome={navigateToHome}
        onNavigateCatalog={() => navigateToCatalog('Todos')}
        onOpenLocation={() => setLocationModalOpen(true)}
      />

      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      <ProductModal
        product={selectedProduct?.product || null}
        initialWeight={selectedProduct?.weight || null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <OrderDrawer
        isOpen={cartDrawerOpen}
        items={cartItems}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onGoToCatalog={() => navigateToCatalog('Todos')}
      />
    </div>
  );
}
