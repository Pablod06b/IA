/**
 * Lógica de la Interfaz de Administración (Admin UI)
 */

const AdminUI = {
    init: function () {
        console.log('AdminUI Init'); // Debug
        this.bindEvents();
        // Si estamos en la vista de admin, cargar datos
        if (!document.getElementById('admin-view').classList.contains('hidden')) {
            this.loadDashboard();
        }
    },

    bindEvents: function () {
        // Login Form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login Submit'); // Debug
                const username = loginForm.username.value;
                const password = loginForm.password.value;
                const result = AuthService.login(username, password);

                if (result.success) {
                    document.getElementById('login-error').classList.add('hidden');
                    // Redirigir a admin
                    window.location.hash = '#admin';
                    handleRouting(); // Forzar recarga de ruta
                } else {
                    const errorDiv = document.getElementById('login-error');
                    errorDiv.textContent = result.message;
                    errorDiv.classList.remove('hidden');
                }
            });
        }

        // Article Form
        const articleForm = document.getElementById('article-form');
        if (articleForm) {
            articleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveArticle();
            });
        }

        // User Form
        const userForm = document.getElementById('user-form');
        if (userForm) {
            userForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveUser();
            });
        }
    },

    // --- Navegación Tabs ---
    showTab: function (tabName) {
        document.querySelectorAll('.admin-tab').forEach(el => el.classList.add('hidden'));
        document.getElementById(`admin-tab-${tabName}`).classList.remove('hidden');

        if (tabName === 'dashboard') this.loadDashboard();
        if (tabName === 'articles') this.loadArticlesTable();
        if (tabName === 'users') this.loadUsersTable();
    },

    // --- Carga de Datos ---
    loadDashboard: function () {
        const user = AuthService.getCurrentUser();
        if (user) {
            document.getElementById('admin-welcome-msg').textContent = `Hola, ${user.name} (${user.role})`;
        }

        const articles = StorageService.getArticles();
        const users = StorageService.getUsers();

        document.getElementById('stat-articles-count').textContent = articles.length;
        document.getElementById('stat-users-count').textContent = users.length;
    },

    loadArticlesTable: function () {
        const articles = StorageService.getArticles();
        const tbody = document.getElementById('admin-articles-table');
        tbody.innerHTML = '';

        articles.forEach(article => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${article.title}</div>
                    <div class="text-sm text-gray-500">${article.slug}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(article.id).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="AdminUI.editArticle('${article.id}')" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button onclick="AdminUI.deleteArticle('${article.id}')" class="text-red-600 hover:text-red-900">Borrar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    loadUsersTable: function () {
        const users = StorageService.getUsers();
        const tbody = document.getElementById('admin-users-table');
        tbody.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${user.name}</div>
                    <div class="text-sm text-gray-500">@${user.username}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
                        ${user.role}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="AdminUI.editUser('${user.id}')" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                    <button onclick="AdminUI.deleteUser('${user.id}')" class="text-red-600 hover:text-red-900">Borrar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    // --- Modales y Acciones ---

    // Artículos
    openArticleModal: function (article = null) {
        const modal = document.getElementById('modal-article');
        const form = document.getElementById('article-form');

        if (article) {
            document.getElementById('modal-article-title').textContent = 'Editar Artículo';
            document.getElementById('article-id').value = article.id;
            document.getElementById('article-title').value = article.title;
            document.getElementById('article-slug').value = article.slug;
            document.getElementById('article-summary').value = article.summary || '';
            document.getElementById('article-image').value = article.ogImage || '';
            // Intentar cargar contenido si es string, si es archivo... bueno, simulamos
            document.getElementById('article-content').value = article.content || '';
            document.getElementById('article-isGuide').checked = article.isGuide || false;
        } else {
            document.getElementById('modal-article-title').textContent = 'Nuevo Artículo';
            form.reset();
            document.getElementById('article-id').value = '';
            document.getElementById('article-image').value = '';
        }

        modal.classList.remove('hidden');
    },

    saveArticle: function () {
        const id = document.getElementById('article-id').value;
        const title = document.getElementById('article-title').value;
        let slug = document.getElementById('article-slug').value;
        const summary = document.getElementById('article-summary').value;
        const imageUrl = document.getElementById('article-image').value;
        const content = document.getElementById('article-content').value;
        const isGuide = document.getElementById('article-isGuide').checked;

        // Sanitizar Slug (Bug Fix)
        slug = slug.toLowerCase()
            .replace(/[^a-z0-9-]/g, '-') // Reemplazar caracteres raros por guiones
            .replace(/-+/g, '-')         // Eliminar guiones duplicados
            .replace(/^-|-$/g, '');      // Eliminar guiones al inicio/final

        const article = {
            id: id ? parseInt(id) : Date.now(),
            title,
            slug,
            summary,
            content,
            isGuide,
            metaTitle: title,
            metaDesc: summary,
            ogImage: imageUrl, // Guardamos la imagen aquí
            contentFile: null
        };

        StorageService.saveArticle(article);
        this.closeModal('modal-article');
        this.loadArticlesTable();
        this.loadDashboard(); // Actualizar contadores
    },

    editArticle: function (id) {
        // El ID viene como string del HTML, convertir si es necesario
        // En data.js los ids son numeros, en storage tambien.
        const articles = StorageService.getArticles();
        const article = articles.find(a => a.id == id);
        if (article) {
            this.openArticleModal(article);
        }
    },

    deleteArticle: function (id) {
        if (confirm('¿Estás seguro de eliminar este artículo?')) {
            StorageService.deleteArticle(parseInt(id));
            this.loadArticlesTable();
            this.loadDashboard();
        }
    },

    // Usuarios
    openUserModal: function (user = null) {
        const modal = document.getElementById('modal-user');
        const form = document.getElementById('user-form');

        if (user) {
            document.getElementById('modal-user-title').textContent = 'Editar Usuario';
            document.getElementById('user-id').value = user.id;
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-username').value = user.username;
            document.getElementById('user-password').value = user.password;
            document.getElementById('user-role').value = user.role;
        } else {
            document.getElementById('modal-user-title').textContent = 'Nuevo Usuario';
            form.reset();
            document.getElementById('user-id').value = '';
        }

        modal.classList.remove('hidden');
    },

    saveUser: function () {
        const id = document.getElementById('user-id').value;
        const name = document.getElementById('user-name').value;
        const username = document.getElementById('user-username').value;
        const password = document.getElementById('user-password').value;
        const role = document.getElementById('user-role').value;

        const user = {
            id: id ? parseInt(id) : Date.now(),
            name,
            username,
            password,
            role
        };

        StorageService.saveUser(user);
        this.closeModal('modal-user');
        this.loadUsersTable();
        this.loadDashboard();
    },

    editUser: function (id) {
        const users = StorageService.getUsers();
        const user = users.find(u => u.id == id);
        if (user) {
            this.openUserModal(user);
        }
    },

    deleteUser: function (id) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            StorageService.deleteUser(parseInt(id));
            this.loadUsersTable();
            this.loadDashboard();
        }
    },

    // Utilidades
    closeModal: function (modalId) {
        document.getElementById(modalId).classList.add('hidden');
    },

    // Helper para insertar Markdown
    insertMarkdown: function (syntax) {
        const textarea = document.getElementById('article-content');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);

        textarea.value = before + syntax + after;
        textarea.focus();
        textarea.selectionStart = start + syntax.length;
        textarea.selectionEnd = start + syntax.length;
    },

    resetData: function () {
        if (confirm('⚠️ ¿Estás seguro? Esto borrará todos los cambios y restaurará los artículos originales.')) {
            localStorage.clear();
            location.reload();
        }
    }
};
