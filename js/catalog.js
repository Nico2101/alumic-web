/* Refactored catalog and rendering logic */

function renderCatalog(category) {
    const products = getProductsByCategory(category);
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20">
                <div class="font-tech text-2xl text-slate-600 uppercase">No hay productos en esta categoría</div>
                <p class="text-slate-700 mt-2 font-mono text-xs">Pronto agregaremos más productos</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(p => `
        <div class="group bg-alumic-steel/20 border border-alumic-steel overflow-hidden hover:border-alumic-blue/30 transition-all duration-500">
            <div class="relative overflow-hidden h-52">
                <img src="${p.imagen}" alt="${p.nombre}"
                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    onerror="this.src='https://placehold.co/400x300/27272a/64748b?text=Sin+Imagen'">
                <div class="absolute top-0 left-0 m-3">
                    <span class="font-mono text-[9px] uppercase tracking-widest px-3 py-1 bg-alumic-charcoal/80 text-alumic-blue border border-alumic-steel">
                        ${CATEGORY_LABELS[p.categoria] || p.categoria}
                    </span>
                </div>
                ${p.destacado ? '<div class="absolute top-0 right-0 m-3"><span class="font-mono text-[9px] uppercase tracking-widest px-3 py-1 bg-alumic-orange text-white">Destacado</span></div>' : ''}
            </div>
            <div class="p-6">
                <h3 class="font-tech text-lg text-white uppercase tracking-tight mb-2 group-hover:text-alumic-blue transition-colors">${p.nombre}</h3>
                <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6">${p.descripcion}</p>
                <div class="flex gap-2">
                    <button onclick="openQuoteModal('${p.nombre}')"
                        class="btn-glow-blue flex-1 font-mono text-[9px] uppercase tracking-widest bg-alumic-blue py-3 rounded-full text-white hover:bg-blue-700 transition-all font-bold">
                        Cotizar
                    </button>
                    <a href="https://wa.me/5492614542257?text=Hola%20Alumic%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(p.nombre)}"
                        target="_blank"
                        class="font-mono text-[9px] uppercase tracking-widest border border-alumic-steel px-3 py-3 rounded-full text-slate-500 hover:border-alumic-blue hover:text-alumic-blue transition-all">
                        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCatalog(category) {
    // Update active button
    document.querySelectorAll('.catalog-filter').forEach(btn => {
        btn.classList.remove('bg-alumic-blue', 'text-white');
        btn.classList.add('bg-alumic-steel/20', 'text-slate-400');
    });
    const activeBtn = document.getElementById('filter-' + category);
    if (activeBtn) {
        activeBtn.classList.remove('bg-alumic-steel/20', 'text-slate-400');
        activeBtn.classList.add('bg-alumic-blue', 'text-white');
    }
    renderCatalog(category);
}

// --- Quote Modal ---
function openQuoteModal(productName = null) {
    const modal = document.getElementById('quote-modal');
    if (!modal) return;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; 

    const textarea = modal.querySelector('textarea[name="mensaje"]');
    if (productName && textarea) {
        textarea.value = `Hola Alumic, me interesa recibir más información sobre: ${productName}`;
    } else if (textarea) {
        textarea.value = '';
    }
}

function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (menu) {
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
            menu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    if (typeof getProductsByCategory === 'function') {
        renderCatalog('todos');
    }
    updateThemeIcons();
});

// Theme Toggle Functionality
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons();
}

function updateThemeIcons() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    if (currentTheme === 'light') {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    } else {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    }
}
