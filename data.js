// Definición de los 10 artículos base (SOLO METADATA)
// El contenido ahora vive en archivos .md separados
const articlesData = [
    {
        id: 1,
        title: "Cómo Crear Videos Virales con IA (Guía 2025)",
        slug: "videos-virales-ia-guia",
        metaTitle: "Guía 2025: Cómo Crear Videos Virales Rápido con Herramientas de IA",
        metaDesc: "Descubre las mejores herramientas y estrategias de IA para generar ideas, guiones, edición y viralización de videos en 2025. ¡Ahorra horas de trabajo!",
        summary: "Guía completa para creadores: usa IA para generar guiones, editar automáticamente con subtítulos y optimizar tu contenido para que se haga viral en cualquier plataforma.",
        isFeatured: true,
        isGuide: true,
        contentFile: "articles/videos-virales-ia-guia.md" // Ruta al archivo de contenido
    },
    {
        id: 2,
        title: "Marketing Sin Rostro: Cómo Ganar Dinero Siendo Anónimo",
        slug: "marketing-sin-rostro-anonimo",
        metaTitle: "Estrategia 2025: Marketing Sin Rostro y Generación de Ingresos Anónimos con IA",
        metaDesc: "Descubre el poder del marketing sin rostro. Aprende a crear un negocio digital rentable utilizando voces, avatares y contenido generado 100% con IA sin revelar tu identidad.",
        summary: "Una mirada profunda a la estrategia de monetización sin rostro. Desde canales de YouTube automatizados hasta blogs nicho, todo es posible con las herramientas de IA adecuadas.",
        isFeatured: false,
        isGuide: false,
        contentFile: "articles/marketing-sin-rostro-anonimo.md"
    },
    {
        id: 3,
        title: "ChatGPT vs Gemini vs Claude 3: Comparativa Definitiva",
        slug: "chatgpt-vs-gemini-vs-claude",
        metaTitle: "Duelo de Gigantes: ChatGPT, Gemini y Claude 3. ¿Cuál es el Mejor Asistente de IA?",
        metaDesc: "Análisis exhaustivo de los tres modelos de lenguaje más potentes del mercado: OpenAI, Google y Anthropic. Veredictos basados en creatividad, razonamiento y código.",
        summary: "La comparativa que estabas esperando. Desgranamos las fortalezas y debilidades de los modelos de OpenAI, Google y Anthropic para ayudarte a elegir la IA que mejor se adapta a tus proyectos.",
        isFeatured: true,
        isGuide: true,
        contentFile: "articles/chatgpt-vs-gemini-vs-claude.md"
    },
    {
        id: 4,
        title: "Top 5 IA para Clonar tu Voz en Español (Resultados Reales)",
        slug: "clonar-voz-ia-espanol",
        metaTitle: "Análisis de 5 IAs para Clonar Voz en Español: Calidad, Precio y Velocidad",
        metaDesc: "Si buscas una voz idéntica para tus podcasts o videos, analizamos las 5 mejores herramientas de IA que ofrecen resultados indistinguibles en español. Incluye pruebas de audio.",
        summary: "La clonación de voz es la nueva frontera. Te mostramos las 5 plataformas que están revolucionando la locución, permitiéndote crear contenido con tu voz (o una nueva) con solo escribir.",
        isFeatured: false,
        isGuide: false,
        contentFile: "articles/clonar-voz-ia-espanol.md"
    },
    {
        id: 5,
        title: "5 Formas de Ganar Dinero con IA (Siendo Creador)",
        slug: "5-formas-ganar-dinero-ia",
        metaTitle: "De Creador a Emprendedor: 5 Modelos de Negocio para Monetizar la IA",
        metaDesc: "Descubre cómo un creador de contenido puede capitalizar el boom de la IA a través de servicios, productos digitales, afiliación y monetización de nicho.",
        summary: "La IA no es solo una herramienta, es un modelo de negocio. Explicamos 5 vías probadas para que cualquier creador digital empiece a generar ingresos pasivos y activos hoy mismo.",
        isFeatured: false,
        isGuide: false,
        contentFile: "articles/5-formas-ganar-dinero-ia.md"
    },
    {
        id: 6,
        title: "Opus Clip vs Descript: ¿Cuál es Mejor para Clips Virales?",
        slug: "opus-clip-vs-descript",
        ogImage: "/assets/og/opus-clip-vs-descript.svg",
        metaTitle: "Comparativa de Edición IA: Opus Clip vs Descript para Contenido Corto Viral",
        metaDesc: "Comparamos dos gigantes en la generación de clips cortos para TikTok e Instagram. Analizamos su precisión, velocidad y capacidades de subtitulado automático.",
        summary: "Si conviertes videos largos en clips cortos, necesitas una de estas. Analizamos cuál es más eficiente en identificar los 'momentos virales' y en producir el clip final con la mejor calidad.",
        isFeatured: false,
        isGuide: false,
        contentFile: "articles/opus-clip-vs-descript.md"
    },
    {
        id: 7,
        title: "7 Herramientas de IA para YouTubers (Ahorra 10h/semana)",
        slug: "7-herramientas-youtubers-ia",
        metaTitle: "Top 7 IAs Esenciales para YouTubers: Automatiza Tareas tediosas y Escala tu Canal",
        metaDesc: "Desde la ideación de videos hasta la optimización de SEO del canal, estas 7 herramientas de IA son imprescindibles para que todo YouTuber profesional ahorre más de 10 horas semanales.",
        summary: "Reduce el tiempo de edición, investigación y optimización. Estas 7 herramientas son el kit de supervivencia para el YouTuber moderno que busca escala sin sacrificar calidad.",
        isFeatured: false,
        isGuide: true,
        contentFile: "articles/7-herramientas-youtubers-ia.md"
    },
    {
        id: 8,
        title: "Jasper AI: Análisis y Opiniones 2025 ¿Vale la Pena?",
        slug: "jasper-ai-analisis-opiniones",
        metaTitle: "Jasper AI Review 2025: ¿Es la Mejor Herramienta de Escritura para SEO y Marketing?",
        metaDesc: "Revisión completa de Jasper AI, líder en la generación de contenido de formato largo. Analizamos sus plantillas, su integración con SEO (Surfer SEO) y su precio/rendimiento en 2025.",
        summary: "Una de las IAs de escritura pioneras. ¿Sigue siendo relevante frente a los nuevos modelos? Hacemos una reseña honesta y comprobamos si su plan de precios se justifica para un blog rentable.",
        isFeatured: true,
        isGuide: false,
        contentFile: "articles/jasper-ai-analisis-opiniones.md"
    },
    {
        id: 9,
        title: "Cómo Automatizar un Blog con IA: Guía Completa 2025",
        slug: "automatizar-blog-ia-guia",
        metaTitle: "Guía Paso a Paso: Automatiza tu Blog y Genera Cientos de Artículos con IA",
        metaDesc: "Aprende el flujo de trabajo completo para automatizar la ideación, redacción, publicación y promoción de tu blog. La IA como tu editor y escritor 24/7.",
        summary: "Si buscas escalar un blog nicho a cientos de artículos al mes, esta es tu hoja de ruta. De la idea al post en 15 minutos, usando herramientas de orquestación de IA.",
        isFeatured: false,
        isGuide: true,
        contentFile: "articles/automatizar-blog-ia-guia.md"
    },
    {
        id: 10,
        title: "Kling AI: Probamos la Nueva IA de Video (Análisis y Ejemplos)",
        slug: "kling-ai-analisis-ejemplos",
        metaTitle: "Kling AI: El Nuevo Competidor de Sora. Análisis, Ejemplos y Disponibilidad",
        metaDesc: "Análisis completo de Kling AI, la nueva IA de generación de video que promete rivalizar con Sora y Pika. Vemos su calidad, límites y cómo usarla de forma efectiva.",
        summary: "El mundo de la IA de video avanza a una velocidad de vértigo. Ponemos a prueba a Kling AI y te mostramos si realmente ofrece la calidad y la coherencia de movimiento que los creadadores de contenido necesitan.",
        isFeatured: false,
        isGuide: false,
        contentFile: "articles/kling-ai-analisis-ejemplos.md"
    }
    // Para el artículo de tu captura de pantalla, simplemente añade una entrada:
    /*
    ,
    {
        id: 11,
        title: "Herramientas IA para Diseñadores Gráficos",
        slug: "herramientas-ia-disenadores-graficos-2025",
        metaTitle: "Herramientas de IA para Diseño Gráfico 2025 | Análisis",
        metaDesc: "Descubre las mejores IA para diseño gráfico...",
        summary: "Análisis de las IA que están cambiando el diseño gráfico...",
        isFeatured: false,
        isGuide: false,
        contentFile: "articles/herramientas-ia-disenadores-graficos-2025.md"
    }
    */
];