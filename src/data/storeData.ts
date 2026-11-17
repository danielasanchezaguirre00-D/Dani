export type PetSpecies = 'Perros' | 'Gatos' | 'Perros y Gatos';

export type ProductCategory =
  | 'Alimento Seco'
  | 'Alimento Húmedo'
  | 'Snacks Naturales'
  | 'Suplementos';

export interface WeightOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  species: PetSpecies;
  category: ProductCategory;
  lifeStage: string;
  description: string;
  ingredients: string;
  nutritionHighlight: string;
  stockStatus: 'Disponible' | 'Últimas unidades';
  featured: boolean;
  image: string;
  weights: WeightOption[];
}

export interface StoreSectionSpace {
  id: string;
  index: string;
  title: string;
  speciesFilter: 'Todos' | 'Perros' | 'Gatos' | 'Snacks';
  categoryFilter?: ProductCategory;
  subtitle: string;
  description: string;
  itemCountLabel: string;
  image: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_pets_portrait_1794917603992.jpg';
export const STORE_INTERIOR_IMAGE = '/src/assets/images/store_interior_boutique_1794917606157.jpg';

export const STORE_INFO = {
  name: 'Bocado Fiel',
  tagline: 'Nutrición natural para perros y gatos',
  address: 'Av. del Libertador 1480, Local 4',
  neighborhood: 'Barrio Las Flores · CP 1425',
  reference: 'A dos cuadras de Plaza Las Flores, frente al paseo arbolado.',
  phoneDisplay: '+54 11 4823-7910',
  phoneHref: 'tel:+541148237910',
  whatsappDisplay: '+54 9 11 5940-3320',
  email: 'hola@bocadofiel.com',
  hours: [
    { days: 'Lunes a Viernes', time: '09:00 – 20:00 hs' },
    { days: 'Sábados', time: '09:30 – 19:00 hs' },
    { days: 'Domingos y Feriados', time: '10:00 – 14:00 hs' },
  ],
  deliveryNote: 'Envíos en el día dentro del barrio sin cargo en compras desde $28.000.',
};

export const HOME_SPACES: StoreSectionSpace[] = [
  {
    id: 'espacio-perros',
    index: '01',
    title: 'Nutrición para Perros',
    speciesFilter: 'Perros',
    subtitle: 'Cachorros, adultos y senior',
    description:
      'Recetas balanceadas con proteínas reales de salmón, cordero o pollo, granos integrales y fórmulas sin cereales para digestión sensible.',
    itemCountLabel: '5 fórmulas disponibles',
    image: '/src/assets/images/product_dog_kibble_1794917604786.jpg',
  },
  {
    id: 'espacio-gatos',
    index: '02',
    title: 'Nutrición para Gatos',
    speciesFilter: 'Gatos',
    subtitle: 'Interior, esterilizados y gatitos',
    description:
      'Alimentos secos de alta palatabilidad y sobres húmedos ricos en taurina y humedad natural para cuidar la salud urinaria y el pelaje.',
    itemCountLabel: '4 fórmulas disponibles',
    image: '/src/assets/images/product_cat_food_1794917604720.jpg',
  },
  {
    id: 'espacio-snacks',
    index: '03',
    title: 'Snacks y Premios Naturales',
    speciesFilter: 'Snacks',
    subtitle: 'Deshidratados artesanales',
    description:
      'Trozos de carne vacuna, pollo y batata horneados a baja temperatura sin conservantes, ideales para entrenamiento o mimo diario.',
    itemCountLabel: '3 variedades frescas',
    image: '/src/assets/images/product_pet_snacks_1794917605773.jpg',
  },
];

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 'dog-salmon-rice',
    name: 'Salmón del Sur y Arroz Integral',
    brand: 'Wild Harvest',
    species: 'Perros',
    category: 'Alimento Seco',
    lifeStage: 'Adultos · Todas las razas',
    description:
      'Croqueta prensada en lotes pequeños con salmón fresco como primer ingrediente, aceite de chía y prebióticos naturales para una piel sana.',
    ingredients: 'Salmón deshuesado (34%), arroz integral, avena arrollada, zapallo, aceite de pescado, raíz de achicoria.',
    nutritionHighlight: '27% Proteína bruta · Sin colorantes',
    stockStatus: 'Disponible',
    featured: true,
    image: '/src/assets/images/product_dog_kibble_1794917604786.jpg',
    weights: [
      { label: '2.5 kg', price: 18900 },
      { label: '7.5 kg', price: 48500 },
      { label: '15 kg', price: 86000 },
    ],
  },
  {
    id: 'cat-chicken-pumpkin',
    name: 'Pollo Tierno y Calabaza en Salsa',
    brand: 'Feline Harmony',
    species: 'Gatos',
    category: 'Alimento Húmedo',
    lifeStage: 'Adultos y esterilizados',
    description:
      'Receta húmeda sin cereales elaborada con pechuga de pollo desmenuzada y calabaza cocida al vapor en caldo nutritivo.',
    ingredients: 'Pechuga de pollo (52%), caldo natural de ave, calabaza, aceite de girasol, taurina, vitaminas y minerales.',
    nutritionHighlight: 'Alta hidratación · Libre de granos',
    stockStatus: 'Disponible',
    featured: true,
    image: '/src/assets/images/product_cat_food_1794917604720.jpg',
    weights: [
      { label: 'Pack x 6 (150 g)', price: 12400 },
      { label: 'Pack x 12 (150 g)', price: 23200 },
    ],
  },
  {
    id: 'snack-beef-sweetpotato',
    name: 'Bocaditos de Carne y Batata Deshidratada',
    brand: 'Pradera Noble',
    species: 'Perros y Gatos',
    category: 'Snacks Naturales',
    lifeStage: 'Todas las edades',
    description:
      'Snacks horneados lentamente a baja temperatura para conservar nutrientes y aroma natural, cortados en cubos fáciles de masticar.',
    ingredients: 'Carne vacuna magra (70%), batata dulce (30%). Sin sal agregada ni conservantes artificiales.',
    nutritionHighlight: '100% ingredientes reales · Sin harinas',
    stockStatus: 'Disponible',
    featured: true,
    image: '/src/assets/images/product_pet_snacks_1794917605773.jpg',
    weights: [
      { label: '180 g', price: 6800 },
      { label: '400 g', price: 13500 },
    ],
  },
  {
    id: 'dog-puppy-lamb',
    name: 'Cordero Patagónico y Avena Cachorros',
    brand: 'Wild Harvest',
    species: 'Perros',
    category: 'Alimento Seco',
    lifeStage: 'Cachorros hasta 12 meses',
    description:
      'Croqueta de tamaño reducido rica en DHA marino y calcio equilibrado para acompañar el desarrollo óseo y cognitivo.',
    ingredients: 'Cordero fresco, harina de cordero, avena, huevo entero, aceite de salmón, arándanos y manzanilla.',
    nutritionHighlight: '30% Proteína · Con DHA natural',
    stockStatus: 'Disponible',
    featured: false,
    image: '/src/assets/images/product_dog_kibble_1794917604786.jpg',
    weights: [
      { label: '2.5 kg', price: 20400 },
      { label: '7.5 kg', price: 52900 },
    ],
  },
  {
    id: 'dog-senior-mobility',
    name: 'Pavo y Cúrcuma Cuidado Articular',
    brand: 'Bocado Fiel Selección',
    species: 'Perros',
    category: 'Alimento Seco',
    lifeStage: 'Senior +7 años',
    description:
      'Fórmula ligera de fácil masticación enriquecida con glucosamina, condroitina y L-carnitina para mantener la movilidad y el peso ideal.',
    ingredients: 'Pavo deshidratado, cebada perlada, arvejas, linaza, cúrcuma, glucosamina vegetal.',
    nutritionHighlight: 'Bajo en grasas · Soporte articular',
    stockStatus: 'Disponible',
    featured: false,
    image: '/src/assets/images/product_dog_kibble_1794917604786.jpg',
    weights: [
      { label: '3 kg', price: 21500 },
      { label: '10 kg', price: 61800 },
    ],
  },
  {
    id: 'cat-indoor-salmon',
    name: 'Salmón y Fibra Control Bolas de Pelo',
    brand: 'Feline Harmony',
    species: 'Gatos',
    category: 'Alimento Seco',
    lifeStage: 'Gatos de interior',
    description:
      'Mezcla equilibrada de proteínas marinas y fibras suaves de celulosa y remolacha que favorecen el tránsito intestinal.',
    ingredients: 'Salmón fresco, harina de pescado blanco, arroz, pulpa de remolacha, taurina, extracto de yuca.',
    nutritionHighlight: '34% Proteína · Control pH urinario',
    stockStatus: 'Disponible',
    featured: false,
    image: '/src/assets/images/product_cat_food_1794917604720.jpg',
    weights: [
      { label: '1.5 kg', price: 15900 },
      { label: '4 kg', price: 37400 },
      { label: '7.5 kg', price: 64900 },
    ],
  },
  {
    id: 'cat-kitten-milk',
    name: 'Pollo y Calostro Primeros Pasos',
    brand: 'Feline Harmony',
    species: 'Gatos',
    category: 'Alimento Seco',
    lifeStage: 'Gatitos 2 a 12 meses',
    description:
      'Microcroquetas de alta densidad energética pensadas para el destete y el crecimiento saludable de gatitos.',
    ingredients: 'Pollo fresco, huevo deshidratado, grasa de ave, aceite de pescado, calostro bovino, vitaminas.',
    nutritionHighlight: '36% Proteína · Defensa inmune',
    stockStatus: 'Últimas unidades',
    featured: false,
    image: '/src/assets/images/product_cat_food_1794917604720.jpg',
    weights: [
      { label: '1.5 kg', price: 16800 },
      { label: '3 kg', price: 31200 },
    ],
  },
  {
    id: 'dog-wet-stew',
    name: 'Estofado Casero de Res y Vegetales',
    brand: 'Pradera Noble',
    species: 'Perros',
    category: 'Alimento Húmedo',
    lifeStage: 'Todas las edades',
    description:
      'Comida húmeda cocida al baño María en envase hermético, ideal para servir sola o mezclar con el alimento seco diario.',
    ingredients: 'Carne vacuna (55%), zanahoria, batata, espinaca, caldo de huesos natural, romero.',
    nutritionHighlight: 'Sin subproductos · Cocción lenta',
    stockStatus: 'Disponible',
    featured: false,
    image: '/src/assets/images/product_dog_kibble_1794917604786.jpg',
    weights: [
      { label: 'Pack x 4 (300 g)', price: 14900 },
      { label: 'Pack x 8 (300 g)', price: 27800 },
    ],
  },
  {
    id: 'snack-chicken-strips',
    name: 'Tiritas de Pechuga de Pollo Secadas al Aire',
    brand: 'Pradera Noble',
    species: 'Perros y Gatos',
    category: 'Snacks Naturales',
    lifeStage: 'Todas las edades',
    description:
      'Láminas finas de pechuga pura secadas lentamente para mantener su textura tierna y facilitar el corte en premios pequeños.',
    ingredients: '100% pechuga de pollo de granja sin aditivos.',
    nutritionHighlight: 'Monoproteico · Bajo en calorías',
    stockStatus: 'Disponible',
    featured: false,
    image: '/src/assets/images/product_pet_snacks_1794917605773.jpg',
    weights: [
      { label: '120 g', price: 6200 },
      { label: '250 g', price: 11800 },
    ],
  },
  {
    id: 'supplement-omega-oil',
    name: 'Aceite Puro de Salmón Prensado en Frío',
    brand: 'Bocado Fiel Selección',
    species: 'Perros y Gatos',
    category: 'Suplementos',
    lifeStage: 'Todas las edades',
    description:
      'Suplemento líquido rico en Omega 3 y 6 para reforzar el sistema cardiovascular, reducir la caída de pelo y dar brillo al manto.',
    ingredients: 'Aceite de salmón 100% puro con tocoferoles naturales como antioxidante.',
    nutritionHighlight: 'Dosificador incluido · Alta pureza',
    stockStatus: 'Disponible',
    featured: false,
    image: '/src/assets/images/product_pet_snacks_1794917605773.jpg',
    weights: [
      { label: '250 ml', price: 11900 },
      { label: '500 ml', price: 21400 },
    ],
  },
  {
    id: 'cat-tuna-mousse',
    name: 'Mousse Suave de Atún y Merluza',
    brand: 'Feline Harmony',
    species: 'Gatos',
    category: 'Alimento Húmedo',
    lifeStage: 'Todas las edades',
    description:
      'Textura aterciopelada pensada para gatos exigentes o con dentadura sensible, con aporte balanceado de electrolitos.',
    ingredients: 'Atún blanco, filete de merluza, caldo de pescado, aceite de linaza, taurina.',
    nutritionHighlight: 'Textura mousse · Sin azúcares',
    stockStatus: 'Disponible',
    featured: false,
    image: '/src/assets/images/product_cat_food_1794917604720.jpg',
    weights: [
      { label: 'Pack x 6 (85 g)', price: 10900 },
      { label: 'Pack x 12 (85 g)', price: 20400 },
    ],
  },
  {
    id: 'dog-grainfree-venison',
    name: 'Ciervo, Lentejas y Manzana Sin Cereales',
    brand: 'Wild Harvest',
    species: 'Perros',
    category: 'Alimento Seco',
    lifeStage: 'Adultos · Piel sensible',
    description:
      'Proteína alternativa hipoalergénica diseñada para perros con intolerancias alimentarias al pollo o al trigo.',
    ingredients: 'Ciervo deshidratado, lentejas rojas, garbanzos, manzana deshidratada, aceite de canola, algas marinas.',
    nutritionHighlight: '0% cereales · Hipoalergénico',
    stockStatus: 'Últimas unidades',
    featured: false,
    image: '/src/assets/images/product_dog_kibble_1794917604786.jpg',
    weights: [
      { label: '2.5 kg', price: 22900 },
      { label: '7.5 kg', price: 58900 },
    ],
  },
];

export function formatARS(amount: number): string {
  return `$${amount.toLocaleString('es-AR')}`;
}
