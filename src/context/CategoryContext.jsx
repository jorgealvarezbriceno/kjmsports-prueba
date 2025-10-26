import React, { createContext, useContext, useState, useEffect } from 'react';
import { productosData } from '../data/productos';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        const savedCategories = JSON.parse(localStorage.getItem('productCategories') || '[]');

        const productCategories = [...new Set(productosData.map(product => product.categoria))];
        const initialCategories = productCategories.map(name => ({
            id: Date.now() + Math.random(),
            name: name
        }));

        const combinedCategories = [...savedCategories];
        initialCategories.forEach(category => {
            if (!combinedCategories.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
                combinedCategories.push(category);
            }
        });

        setCategories(combinedCategories);
        localStorage.setItem('productCategories', JSON.stringify(combinedCategories));
    };

    const addCategory = (categoryName) => {
        const newCategory = {
            id: Date.now(),
            name: categoryName.trim()
        };

        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        localStorage.setItem('productCategories', JSON.stringify(updatedCategories));
    };

    const deleteCategory = (id) => {
        const updatedCategories = categories.filter(cat => cat.id !== id);
        setCategories(updatedCategories);
        localStorage.setItem('productCategories', JSON.stringify(updatedCategories));
    };

    return (
        <CategoryContext.Provider value={{ categories, addCategory, deleteCategory, loadCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
};