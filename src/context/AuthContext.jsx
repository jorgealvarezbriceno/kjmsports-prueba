import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const syncSavedUser = () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    const parsed = JSON.parse(savedUser);
                    const users = JSON.parse(localStorage.getItem('users') || '[]');
                    const fresh = users.find(u => u.correo === parsed.correo) || parsed;
                    setUser(fresh);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.warn('AuthContext: fallo al parsear user desde localStorage', err);
                }
            }
        };

        syncSavedUser();

       
        const onStorage = (e) => {
            if (e.key === 'user') {
                if (e.newValue) {
                    try { setUser(JSON.parse(e.newValue)); setIsAuthenticated(true); } catch { };
                } else {
                    setUser(null); setIsAuthenticated(false);
                }
            }

            if (e.key === 'users') {
                const current = JSON.parse(localStorage.getItem('user') || 'null');
                if (current) {
                    try {
                        const users = JSON.parse(e.newValue || '[]');
                        const fresh = users.find(u => u.correo === current.correo);
                        if (fresh) setUser(fresh);
                    } catch { }
                }
            }
        };

        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some(u => u.correo === userData.correo)) {
            throw new Error('Este correo ya está registrado');
        }

        const newUser = {
            ...userData,
            id: Date.now(),
            fechaRegistro: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(newUser));

        return newUser;
    };

    const login = (correo, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const found = users.find(u => u.correo === correo && u.password === password);
        if (!found) throw new Error('Credenciales incorrectas');

        setUser(found);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(found));
        return found;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
};

export { AuthProvider, useAuth };
