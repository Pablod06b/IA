/**
 * Servicio de Almacenamiento (Storage Service)
 * Maneja la persistencia de datos en LocalStorage para simular una base de datos.
 */

const STORAGE_KEYS = {
    ARTICLES: 'ia_creativa_articles',
    USERS: 'ia_creativa_users',
    CURRENT_USER: 'ia_creativa_current_user'
};

const StorageService = {
    // --- ARTÍCULOS ---

    /**
     * Obtiene todos los artículos. Si no hay en storage, usa los datos iniciales (seed).
     */
    getArticles: function () {
        let storedArticles = [];
        const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
        if (stored) {
            storedArticles = JSON.parse(stored);
        }

        // Sincronizar con data.js si existe (prioridad al código en desarrollo)
        if (typeof articlesData !== 'undefined') {
            let hasChanges = false;
            articlesData.forEach(seedArticle => {
                const index = storedArticles.findIndex(a => a.id === seedArticle.id);
                if (index >= 0) {
                    // Si el artículo existe, actualizamos su contenido para reflejar cambios en data.js
                    // Comparamos para evitar escrituras innecesarias, pero forzamos la actualización de campos clave
                    if (JSON.stringify(storedArticles[index]) !== JSON.stringify(seedArticle)) {
                        storedArticles[index] = seedArticle;
                        hasChanges = true;
                    }
                } else {
                    // Si es nuevo en data.js, lo agregamos
                    storedArticles.push(seedArticle);
                    hasChanges = true;
                }
            });

            // Si hubo cambios o no había nada almacenado, guardamos
            if (hasChanges || !stored) {
                this.saveArticles(storedArticles);
            }
            return storedArticles;
        }

        return storedArticles;
    },

    /**
     * Guarda la lista completa de artículos.
     */
    saveArticles: function (articles) {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    },

    /**
     * Agrega o actualiza un artículo.
     */
    saveArticle: function (article) {
        const articles = this.getArticles();
        const index = articles.findIndex(a => a.id === article.id || a.slug === article.slug);

        if (index >= 0) {
            // Actualizar existente
            articles[index] = { ...articles[index], ...article };
        } else {
            // Crear nuevo
            // Generar ID simple si no tiene
            if (!article.id) {
                article.id = Date.now();
            }
            articles.unshift(article); // Agregar al principio
        }
        this.saveArticles(articles);
    },

    /**
     * Elimina un artículo por ID.
     */
    deleteArticle: function (id) {
        const articles = this.getArticles();
        const filtered = articles.filter(a => a.id !== id);
        this.saveArticles(filtered);
    },

    // --- USUARIOS ---

    /**
     * Obtiene usuarios. Seed inicial si está vacío.
     */
    getUsers: function () {
        const stored = localStorage.getItem(STORAGE_KEYS.USERS);
        if (stored) {
            return JSON.parse(stored);
        }
        // Seed inicial de usuarios
        const initialUsers = [
            { id: 1, username: 'admin', password: '123', role: 'admin', name: 'Administrador' },
            { id: 2, username: 'editor', password: '123', role: 'editor', name: 'Editor de Contenido' }
        ];
        this.saveUsers(initialUsers);
        return initialUsers;
    },

    saveUsers: function (users) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    },

    saveUser: function (user) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index >= 0) {
            users[index] = user;
        } else {
            if (!user.id) user.id = Date.now();
            users.push(user);
        }
        this.saveUsers(users);
    },

    deleteUser: function (id) {
        const users = this.getUsers();
        const filtered = users.filter(u => u.id !== id);
        this.saveUsers(filtered);
    }
};
