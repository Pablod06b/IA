// --- Funciones de Renderizado y Navegación (ROUTING & RENDERING) ---

/**
 * Maneja la navegación basada en History API (URLs limpias) y hace fallback a hash.
 */
function handleRouting() {
    // Cierra el menú móvil si está abierto al navegar
    closeMobileMenu();

    // Ocultar todas las vistas
    document.querySelectorAll('.view-content').forEach(el => el.classList.add('hidden'));

    // Preferimos path-based routing (ej: /article/slug)
    const path = window.location.pathname;
    const articlePathMatch = path.match(/^\/article\/(?<slug>[^\/]+)\/?$/);

    if (articlePathMatch && articlePathMatch.groups && articlePathMatch.groups.slug) {
        const slug = articlePathMatch.groups.slug;
        renderArticle(slug);
        showView('article-view');
        return;
    }

    // Fallback: soportar hash routing antiguo (#article/slug)
    const hash = window.location.hash.slice(1);
    const articleHashMatch = hash.match(/^article\/(.+)$/);
    if (articleHashMatch) {
        const slug = articleHashMatch[1];
        renderArticle(slug);
        showView('article-view');
        return;
    }

    // Rutas de páginas simples
    if (path === '/' || path === '/home' || hash === '' ) {
        showView('home-view');
    } else if (path === '/about' || hash === 'about') {
        showView('about-view');
    } else if (path === '/contact' || hash === 'contact') {
        showView('contact-view');
    } else if (path === '/blog' || hash === 'blog') {
        showView('home-view');
    } else {
        // Si no reconocemos la ruta, mostramos home
        showView('home-view');
    }
}

/**
 * Muestra una vista específica.
 */
function showView(viewId) {
    document.querySelectorAll('.view-content').forEach(el => el.classList.add('hidden'));
    const view = document.getElementById(viewId);
    if (view) {
        view.classList.remove('hidden');
    }

    if (viewId === 'home-view') {
        renderHome();
    }
    window.scrollTo(0, 0); // Scroll al inicio
}

/**
 * Actualiza meta tags y JSON-LD para mejorar SEO/OG cuando se muestra un artículo.
 * También actúa como fallback cuando la app corre en modo dinámico (no SSG).
 */
function updateMetaForArticle(article) {
    // Title & description
    if (article.metaTitle) document.title = article.metaTitle;
    if (article.metaDesc) {
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', article.metaDesc);
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogTitle) ogTitle.setAttribute('content', article.metaTitle || article.title);
    if (ogDesc) ogDesc.setAttribute('content', article.metaDesc || article.summary || '');
    // Preferimos una imagen por artículo si existe, sino una por defecto
    const imageUrl = article.ogImage || (`${location.origin}/assets/og/${article.slug}.jpg`);
    if (ogImage) ogImage.setAttribute('content', imageUrl);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.href = `${location.origin}/article/${article.slug}`;

    // JSON-LD Schema.org Article
    const existingJsonLd = document.getElementById('json-ld-article');
    if (existingJsonLd) existingJsonLd.remove();
    const jsonLd = document.createElement('script');
    jsonLd.id = 'json-ld-article';
    jsonLd.type = 'application/ld+json';
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.metaDesc || article.summary || '',
        "author": { "@type": "Person", "name": article.author || "Pablo Domínguez Barbero" },
        "url": `${location.origin}/article/${article.slug}`,
        "mainEntityOfPage": `${location.origin}/article/${article.slug}`
    };
    if (article.datePublished) schema.datePublished = article.datePublished;
    jsonLd.text = JSON.stringify(schema);
    document.head.appendChild(jsonLd);
}

/**
 * Genera el HTML de una tarjeta de artículo.
 */
function renderArticleCard(article) {
    // (Esta función se mantiene igual que la tuya)
    return `
        <a href="/article/${article.slug}" class="article-card bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 block border border-gray-100">
            <img src="https://placehold.co/600x400/f3f4f6/6366f1?text=[Image+of+AI+Tool]" 
                alt="Imagen destacada: ${article.title}" class="w-full h-48 object-cover rounded-lg mb-4">
            
            <h3 class="text-xl font-bold mb-2 text-gray-800 hover:accent-color">${article.title}</h3>
            <p class="text-gray-500 text-sm line-clamp-3">${article.summary}</p>
            
            <div class="mt-3 flex items-center justify-between">
                <span class="text-xs font-semibold ${article.isGuide ? 'accent-color' : 'text-gray-400'}">
                    ${article.isGuide ? 'GUÍA DESTACADA' : 'ARTÍCULO'}
                </span>
                <span class="text-sm text-gray-500">Leer más →</span>
            </div>
        </a>
    `;
}

/**
 * Renderiza la página de inicio (Home).
 */
function renderHome() {
    // (Esta función se mantiene igual que la tuya)
    const latestArticlesContainer = document.getElementById('latest-articles');
    if (latestArticlesContainer) {
        const latestArticles = articlesData.slice(0, 6);
        latestArticlesContainer.innerHTML = latestArticles.map(renderArticleCard).join('');
    }

    const recommendedGuidesContainer = document.getElementById('recommended-guides');
    if (recommendedGuidesContainer) {
        const recommendedGuides = articlesData.filter(a => a.isGuide).slice(0, 3);
        recommendedGuidesContainer.innerHTML = recommendedGuides.map(renderArticleCard).join('');
    }
}

/**
 * MEJORA: Renderiza el artículo cargando el contenido desde un archivo Markdown.
 */
async function renderArticle(slug) {
    const article = articlesData.find(a => a.slug === slug);
    const articleMain = document.getElementById('article-main');
    
    // Limpiar contenido anterior y mostrar un 'cargando'
    articleMain.innerHTML = `<p class="text-center text-gray-500">Cargando artículo...</p>`;

    if (!article) {
        articleMain.innerHTML = `
            <h1 class="text-3xl font-bold text-red-500">Error 404: Artículo no encontrado.</h1>
            <p class="mt-4"><a href="#home" class="accent-color">Volver a la Home</a></p>
        `;
        return;
    }

    let contentHtml = '';
    // Mejor manejo: primero usa contenido inline si existe, si no intenta fetch.
    try {
        let markdown = '';

        if (article.content) {
            // Si en `data.js` incluyes una propiedad `content` con Markdown, úsala.
            markdown = article.content;
        } else if (article.contentFile) {
            // Intentamos cargar el archivo .md desde `contentFile`.
            // Usa ruta absoluta desde la raíz del servidor (/articles/opus-clip-vs-descript.md)
            const contentPath = article.contentFile.startsWith('/') 
                ? article.contentFile 
                : '/' + article.contentFile;
            const response = await fetch(contentPath);
            if (!response.ok) {
                throw new Error(`Error: El archivo ${contentPath} no se encontró (HTTP ${response.status}). Verifica que exista en la raíz del servidor.`);
            }
            markdown = await response.text();
        } else {
            throw new Error('No existe propiedad "content" ni "contentFile" para este artículo en data.js.');
        }

        // Convertir Markdown a HTML usando Marked.js
        contentHtml = marked.parse(markdown);

    } catch (error) {
        console.error('Error cargando artículo:', error);
        // Mensaje al usuario + fallback a summary
        contentHtml = `
            <p class="text-red-500 text-center font-semibold">Error al cargar el contenido del artículo.</p>
            <p class="text-center text-gray-600 mt-2">Asegúrate de que el archivo "<span class="font-mono">${article.contentFile || 'N/A'}</span>" existe o añade una propiedad <span class="font-mono">content</span> en <span class="font-mono">data.js</span>.</p>
            <div class="mt-4 text-center text-gray-700">${article.summary || ''}</div>
        `;
    }

    // 3. Renderizar el HTML final
    articleMain.innerHTML = `
        <p class="text-sm text-gray-500 mb-2">Home / Blog / ${article.title}</p>
        
        <h1 class="text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">${article.title}</h1>
        
        <p class="text-xl text-gray-600 mb-8 border-b pb-4">${article.metaDesc}</p>
        
        <img src="https://placehold.co/1200x600/1f2937/9ca3af?text=[Image+of+${article.slug}]" 
            alt="Imagen principal del artículo: ${article.title}" class="w-full h-auto object-cover rounded-xl shadow-xl mb-10">

        <!-- El contenido de Markdown se inyecta aquí -->
        <div class="article-content">
            ${contentHtml}
        </div>
        
        <!-- Bloque de Autor y Comentarios (se mantienen igual) -->
        <div class="mt-12 pt-6 border-t border-gray-200 flex items-center">
            <img src="https://placehold.co/64x64/d1d5db/4b5563?text=PD" alt="Avatar del autor" class="w-16 h-16 rounded-full mr-4 border-2 border-indigo-400">
            <div>
                <p class="text-sm font-semibold text-gray-500">Escrito por</p>
                <p class="text-lg font-bold text-gray-800">Pablo Domínguez Barbero</p>
                <p class="text-sm text-gray-600">Apasionado por la IA y la creación digital. <a href="#about" class="accent-color hover:underline">Saber más.</a></p>
            </div>
        </div>
        <div class="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 class="text-xl font-bold mb-3">Comentarios (Integración Disqus)</h3>
            <p class="text-gray-600">Este espacio se reservaría para la integración de un sistema de comentarios como Disqus o nativo.</p>
        </div>
    `;
    
    // Actualizar Meta Títulos y Descripción
    // Actualiza metadatos y JSON-LD con helper (mejora SEO/social previews)
    updateMetaForArticle(article);
    // Si quieres, también podemos actualizar la imagen principal in-page si `ogImage` está definido
    // (la etiqueta <img> superior podría usar article.ogImage en vez del placeholder)
}

// --- MEJORA: Lógica del Menú Móvil ---

const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');

function toggleMobileMenu() {
    mainNav.classList.toggle('hidden');
    iconMenu.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
}

function closeMobileMenu() {
    if (!mainNav.classList.contains('hidden')) {
        toggleMobileMenu();
    }
}

// Listener para el botón de hamburguesa
menuButton.addEventListener('click', toggleMobileMenu);

// --- Inicialización y Event Listeners ---

// Intercepta clicks en enlaces internos para usar History API y navegación SPA
document.addEventListener('click', function (e) {
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    // Ignora enlaces externos y anclas normales
    if (!href) return;
    const isInternal = href.startsWith('/') && !href.startsWith('//');
    if (isInternal) {
        // Evita comportamiento por defecto y usa pushState
        e.preventDefault();
        const url = new URL(href, location.origin);
        history.pushState({}, '', url.pathname + url.search + url.hash);
        handleRouting();
    }
});

// Maneja el botón atrás/adelante del navegador
window.addEventListener('popstate', handleRouting);

window.addEventListener('load', () => {
    // Si la ruta es la raíz sin path, mantenemos la home
    handleRouting();
});