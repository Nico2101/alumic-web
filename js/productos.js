// ============================================
// Alumic SRL - Product Catalog Manager
// Uses localStorage for persistence
// ============================================

const STORAGE_KEY = 'alumic_productos';

// Default sample products
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        nombre: 'Disco de Corte 115mm',
        descripcion: 'Disco de corte para metal y acero inoxidable. Alta velocidad de corte y larga duración.',
        categoria: 'abrasivos',
        imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
        destacado: true
    },
    {
        id: 2,
        nombre: 'Banda de Lija Grano 80',
        descripcion: 'Banda de lija para madera y metal. Ideal para desbaste y preparación de superficies.',
        categoria: 'abrasivos',
        imagen: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
        destacado: false
    },
    {
        id: 3,
        nombre: 'Disco Flap Zirconio 115mm',
        descripcion: 'Disco flap de zirconio para desbaste agresivo en acero y acero inoxidable.',
        categoria: 'abrasivos',
        imagen: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
        destacado: false
    },
    {
        id: 4,
        nombre: 'Adhesivo Estructural 3M DP810',
        descripcion: 'Adhesivo epoxi estructural de 3M para uniones de alta resistencia en metal y plástico.',
        categoria: 'adhesivos',
        imagen: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=300&fit=crop',
        destacado: true
    },
    {
        id: 5,
        nombre: 'Cinta VHB 3M 4911',
        descripcion: 'Cinta de doble cara de muy alta adherencia. Reemplaza tornillos y remaches.',
        categoria: 'adhesivos',
        imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
        destacado: false
    },
    {
        id: 6,
        nombre: 'Sellador de Poliuretano',
        descripcion: 'Sellador flexible de poliuretano para juntas industriales. Resistente a químicos y UV.',
        categoria: 'adhesivos',
        imagen: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop',
        destacado: false
    },
    {
        id: 7,
        nombre: 'Amoladora Neumática 4"',
        descripcion: 'Amoladora angular neumática de 4 pulgadas. Potente y liviana para uso industrial intensivo.',
        categoria: 'maquinaria',
        imagen: 'https://images.unsplash.com/photo-1530124566582-a45a7c0a8316?w=400&h=300&fit=crop',
        destacado: true
    },
    {
        id: 8,
        nombre: 'Lijadora Orbital 150mm',
        descripcion: 'Lijadora orbital para terminación fina en madera y pintura. Incluye sistema de aspiración.',
        categoria: 'maquinaria',
        imagen: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
        destacado: false
    },
    {
        id: 9,
        nombre: 'Kit EPP Industrial',
        descripcion: 'Kit completo de protección personal: gafas, guantes, protección auditiva y respiratoria.',
        categoria: 'maquinaria',
        imagen: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop',
        destacado: false
    }
];

// ---- CRUD Functions ----

function getProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        // First time: load defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        return [...DEFAULT_PRODUCTS];
    }
    return JSON.parse(data);
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

function addProduct(product) {
    const products = getProducts();
    product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(product);
    saveProducts(products);
    return product;
}

function updateProduct(id, updatedData) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData, id };
        saveProducts(products);
        return products[index];
    }
    return null;
}

function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
    return filtered;
}

function getProductsByCategory(category) {
    const products = getProducts();
    if (!category || category === 'todos') return products;
    return products.filter(p => p.categoria === category);
}

function resetToDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
}

// Category labels
const CATEGORY_LABELS = {
    'abrasivos': 'Abrasivos',
    'adhesivos': 'Adhesivos & Cintas',
    'maquinaria': 'Maquinaria & Equipos'
};
