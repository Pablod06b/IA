const fs = require('fs');
const path = require('path');

// Cargar data.js (usa require, por eso data.js debe ser CommonJS compatible)
const data = require(path.join(__dirname, '..', 'data.js'));

// data.js exports a variable `articlesData` — si tu data.js no exporta, intentamos leerlo eval
let articles = [];
if (Array.isArray(data.articlesData)) {
    articles = data.articlesData;
} else if (Array.isArray(global.articlesData)) {
    articles = global.articlesData;
} else if (Array.isArray(data)) {
    articles = data;
} else {
    // Intenta cargar el file como texto y evaluar la variable
    const raw = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
    const m = raw.match(/const\s+articlesData\s*=\s*(\[([\s\S]*)\]);?/);
    if (m) {
        try {
            // No es seguro ejecutar eval en general, pero en este entorno local intentamos una extracción simple
            const jsonPart = m[1];
            // WARNING: esto puede fallar si hay comentarios o funciones
            articles = eval(jsonPart);
        } catch (e) {
            console.error('No se pudo extraer articlesData automáticamente. Asegúrate de exportar articlesData en data.js');
            process.exit(1);
        }
    } else {
        console.error('No se encontró articlesData en data.js');
        process.exit(1);
    }
}

const base = process.env.SITE_ORIGIN || 'http://localhost:8000';

const urls = articles.map(a => `${base}/article/${a.slug}`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n')}\n</urlset>`;

fs.writeFileSync(path.join(__dirname, '..', 'sitemap.xml'), sitemap, 'utf8');
console.log('sitemap.xml generado con', urls.length, 'URLs');
