'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FavoriteItem = {
    id: string;
    type: 'bookmaker' | 'prediction';
    title: string;
    url: string;
    addedAt: number;
};

interface FavoritesContextType {
    favorites: FavoriteItem[];
    addFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('bslsports_favorites');
            if (saved) {
                setFavorites(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Could not load favorites:", e);
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage when changed
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('bslsports_favorites', JSON.stringify(favorites));
        }
    }, [favorites, isInitialized]);

    const addFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
        setFavorites(prev => {
            if (prev.some(f => f.id === item.id)) return prev;
            return [...prev, { ...item, addedAt: Date.now() }];
        });
    };

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    };

    const isFavorite = (id: string) => {
        return favorites.some(f => f.id === id);
    };

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, isDrawerOpen, toggleDrawer }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
