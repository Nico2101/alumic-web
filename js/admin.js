/* Admin Panel Logic Refactored */

const ADMIN_PASSWORD = 'alumic2025';
let deleteTargetId = null;

// --- Auth ---
function doLogin() {
    const pwd = document.getElementById('admin-password').value;
    if (pwd === ADMIN_PASSWORD) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        sessionStorage.setItem('alumic_admin', 'true');
        renderAdmin();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
        document.getElementById('admin-password').classList.add('border-red-500');
        setTimeout(() => {
            const err = document.getElementById('login-error');
            const inp = document.getElementById('admin-password');
            if (err) err.classList.add('hidden');
            if (inp) inp.classList.remove('border-red-500');
        }, 3000);
    }
}

function doLogout() {
    sessionStorage.removeItem('alumic_admin');
    document.getElementById('admin-panel').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    const pwdInput = document.getElementById('admin-password');
    if (pwdInput) pwdInput.value = '';
    window.location.href = 'index.html';
}

// --- Render ---
function renderAdmin() {
    if (typeof getProducts !== 'function') return;
    const products = getProducts();
    const grid = document.getElementById('admin-grid');
    const count = document.getElementById('product-count');
    if (count) count.textContent = products.length;

    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20 border border-dashed border-alumic-steel">
                <div class="font-tech text-2xl text-slate-600 uppercase mb-2">Sin Productos</div>
                <p class="text-slate-700 font-mono text-xs">Hacé clic en "Agregar Producto" para comenzar</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = products.map(p => `
        <div class="group bg-alumic-steel/20 border border-alumic-steel overflow-hidden hover:border-alumic-blue/30 transition-all duration-300">
            <div class="relative h-40 overflow-hidden">
                <img src="${p.imagen}" alt="${p.nombre}"
                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    onerror="this.src='https://placehold.co/400x300/27272a/64748b?text=Sin+Imagen'">
                <div class="absolute top-0 left-0 m-2">
                    <span class="font-mono text-[8px] uppercase tracking-widest px-2 py-1 bg-alumic-charcoal/80 text-alumic-blue border border-alumic-steel">
                        ${(typeof CATEGORY_LABELS !== 'undefined' && CATEGORY_LABELS[p.categoria]) || p.categoria}
                    </span>
                </div>
                ${p.destacado ? '<div class="absolute top-0 right-0 m-2"><span class="font-mono text-[8px] uppercase px-2 py-1 bg-alumic-orange text-white">★</span></div>' : ''}
            </div>
            <div class="p-4">
                <h4 class="font-tech text-sm text-white uppercase tracking-tight mb-1 truncate">${p.nombre}</h4>
                <p class="text-slate-600 text-xs line-clamp-2 mb-4">${p.descripcion}</p>
                <div class="flex gap-2">
                    <button onclick="editProduct(${p.id})"
                        class="flex-1 font-mono text-[9px] uppercase tracking-widest border border-alumic-steel py-2 text-slate-500 hover:border-alumic-blue hover:text-alumic-blue transition-all">
                        Editar
                    </button>
                    <button onclick="openDeleteModal(${p.id})"
                        class="font-mono text-[9px] uppercase tracking-widest border border-alumic-steel px-3 py-2 text-slate-500 hover:border-red-500 hover:text-red-500 transition-all">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Modal ---
function openModal(product = null) {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.getElementById('modal-title').textContent = product ? 'Editar Producto' : 'Agregar Producto';
    document.getElementById('product-id').value = product ? product.id : '';
    document.getElementById('product-name').value = product ? product.nombre : '';
    document.getElementById('product-desc').value = product ? product.descripcion : '';
    document.getElementById('product-category').value = product ? product.categoria : '';
    document.getElementById('product-image').value = product ? product.imagen : '';
    document.getElementById('product-featured').checked = product ? product.destacado : false;
    updateImagePreview();
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.classList.add('hidden');
    const form = document.getElementById('product-form');
    if (form) form.reset();
    const previewCont = document.getElementById('image-preview-container');
    if (previewCont) previewCont.classList.add('hidden');
}

function editProduct(id) {
    if (typeof getProductById !== 'function') return;
    const product = getProductById(id);
    if (product) openModal(product);
}

// --- Save ---
function saveProduct(e) {
    e.preventDefault();
    const id = document.getElementById('product-id').value;
    const data = {
        nombre: document.getElementById('product-name').value.trim(),
        descripcion: document.getElementById('product-desc').value.trim(),
        categoria: document.getElementById('product-category').value,
        imagen: document.getElementById('product-image').value.trim() || 'https://placehold.co/400x300/27272a/64748b?text=Sin+Imagen',
        destacado: document.getElementById('product-featured').checked
    };

    if (id) {
        if (typeof updateProduct === 'function') updateProduct(parseInt(id), data);
    } else {
        if (typeof addProduct === 'function') addProduct(data);
    }

    closeModal();
    renderAdmin();
}

// --- Delete ---
function openDeleteModal(id) {
    deleteTargetId = id;
    const modal = document.getElementById('delete-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeDeleteModal() {
    deleteTargetId = null;
    const modal = document.getElementById('delete-modal');
    if (modal) modal.classList.add('hidden');
}

function confirmDelete() {
    if (deleteTargetId && typeof deleteProduct === 'function') {
        deleteProduct(deleteTargetId);
        closeDeleteModal();
        renderAdmin();
    }
}

// --- Reset ---
function resetProducts() {
    if (confirm('¿Resetear todos los productos a los valores por defecto?') && typeof resetToDefaults === 'function') {
        resetToDefaults();
        renderAdmin();
    }
}

// --- Image Preview ---
function updateImagePreview() {
    const urlInput = document.getElementById('product-image');
    if (!urlInput) return;
    const url = urlInput.value;
    const container = document.getElementById('image-preview-container');
    const img = document.getElementById('image-preview');
    if (container && img && url) {
        img.src = url;
        container.classList.remove('hidden');
    } else if (container) {
        container.classList.add('hidden');
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Check session on load
    if (sessionStorage.getItem('alumic_admin') === 'true') {
        const loginScr = document.getElementById('login-screen');
        const adminPan = document.getElementById('admin-panel');
        if (loginScr) loginScr.classList.add('hidden');
        if (adminPan) adminPan.classList.remove('hidden');
        renderAdmin();
    }

    // Bind preview event
    const imgInput = document.getElementById('product-image');
    if (imgInput) imgInput.addEventListener('input', updateImagePreview);
});
