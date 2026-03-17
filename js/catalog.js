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
                <p class="text-slate-500 text-sm leading-relaxed line-clamp-2">${p.descripcion}</p>
                <a href="https://wa.me/5492614542257?text=Hola%20Alumic%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(p.nombre)}"
                    target="_blank"
                    class="inline-flex items-center gap-2 mt-4 font-mono text-[10px] uppercase tracking-widest text-alumic-orange hover:text-orange-400 transition-colors">
                    Consultar
                    <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </a>
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

// Init catalog
document.addEventListener('DOMContentLoaded', () => {
    if (typeof getProductsByCategory === 'function') {
        renderCatalog('todos');
    }
});
