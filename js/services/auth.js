/**
 * Servicio de Autenticación (Auth Service)
 * Maneja el login, logout y permisos.
 */

const AuthService = {
    login: function (username, password) {
        const users = StorageService.getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Guardar sesión (sin password por seguridad básica)
            const sessionUser = { ...user };
            delete sessionUser.password;
            sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
        }
        return { success: false, message: 'Usuario o contraseña incorrectos' };
    },

    logout: function () {
        sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        window.location.reload(); // Recargar para limpiar estado
    },

    getCurrentUser: function () {
        const stored = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return stored ? JSON.parse(stored) : null;
    },

    isAdmin: function () {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    isEditor: function () {
        const user = this.getCurrentUser();
        return user && (user.role === 'admin' || user.role === 'editor');
    }
};
