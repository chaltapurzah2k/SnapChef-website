import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('snapchef_session');
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const user = storageService.login(email, password);
        setUser(user);
        localStorage.setItem('snapchef_session', JSON.stringify(user));
        return user;
    };

    const register = (email, password, name) => {
        const user = storageService.register(email, password, name);
        setUser(user);
        localStorage.setItem('snapchef_session', JSON.stringify(user));
        return user;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('snapchef_session');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
