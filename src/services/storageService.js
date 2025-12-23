import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'snapchef_users';
const CURRENT_USER_KEY = 'snapchef_current_user';
const HISTORY_KEY = 'snapchef_history';
const FAVORITES_KEY = 'snapchef_favorites';

export const storageService = {
    // Auth Helpers
    getUsers: () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),

    register: (email, password, name) => {
        const users = storageService.getUsers();
        if (users.find(u => u.email === email)) {
            throw new Error("User already exists");
        }
        const newUser = { id: uuidv4(), email, password, name };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    },

    login: (email, password) => {
        const users = storageService.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error("Invalid credentials");
        return user;
    },

    // History
    addToHistory: (userId, recipe, nutrition) => {
        const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        const newItem = {
            id: uuidv4(),
            userId,
            recipe,
            nutrition,
            timestamp: new Date().toISOString(),
            rating: 0
        };
        history.unshift(newItem); // Add to top
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        return newItem;
    },

    getUserHistory: (userId) => {
        const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        return history.filter(h => h.userId === userId);
    },

    updateRating: (itemId, rating) => {
        const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        const idx = history.findIndex(h => h.id === itemId);
        if (idx !== -1) {
            history[idx].rating = rating;
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
    },

    // Favorites
    toggleFavorite: (userId, recipeItem) => {
        let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        const existingIdx = favorites.findIndex(f => f.recipe.name === recipeItem.recipe.name && f.userId === userId);

        if (existingIdx !== -1) {
            favorites.splice(existingIdx, 1); // Remove
        } else {
            favorites.push({
                id: uuidv4(),
                userId,
                ...recipeItem,
                savedAt: new Date().toISOString()
            });
        }
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        return favorites.filter(f => f.userId === userId);
    },

    getUserFavorites: (userId) => {
        const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        return favorites.filter(f => f.userId === userId);
    }
};
