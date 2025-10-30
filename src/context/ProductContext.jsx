import React, { createContext, useContext, useState, useEffect } from 'react';
import { productosData } from '../data/productos';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // Cargar productos al iniciar - SOLO UNA VEZ
    useEffect(() => {
        const saved = localStorage.getItem('productos');
        const initialized = localStorage.getItem('productos_initialized');


        if (!initialized || initialized !== 'true') {
            setProducts(productosData);
            localStorage.setItem('productos', JSON.stringify(productosData));
            localStorage.setItem('productos_initialized', 'true');
        } else {

            try {
                const parsed = JSON.parse(saved || '[]');
                setProducts(Array.isArray(parsed) ? parsed : productosData);
            } catch (error) {
                console.error('Error al cargar productos, usando estáticos:', error);
                setProducts(productosData);
                localStorage.setItem('productos', JSON.stringify(productosData));
            }
        }
    }, []);

    // Agregar un nuevo producto
    const addProduct = (product) => {
        const newProduct = {
            id: Date.now(),
            nombre: product.nombre || 'Nuevo producto',
            precio: Number(product.precio) || 0,
            precioOferta: product.precioOferta ? Number(product.precioOferta) : null,
            imagen: product.imagen || '',
            descripcion: product.descripcion || '',
            unidad_moneda: product.unidad_moneda || 'CLP',
            categoria: product.categoria || 'otros'
        };

        const updatedProducts = [newProduct, ...products];
        setProducts(updatedProducts);
        localStorage.setItem('productos', JSON.stringify(updatedProducts));
        return newProduct;
    };

    // Actualizar un producto existente
    const updateProduct = (id, updatedData) => {
        const updatedProducts = products.map(p =>
            p.id === id
                ? {
                    ...p,
                    ...updatedData,
                    precio: updatedData.precio ? Number(updatedData.precio) : p.precio,
                    precioOferta: updatedData.precioOferta ? Number(updatedData.precioOferta) : p.precioOferta
                }
                : p
        );
        setProducts(updatedProducts);
        localStorage.setItem('productos', JSON.stringify(updatedProducts));
    };

    // Eliminar un producto
    const deleteProduct = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('productos', JSON.stringify(updatedProducts));
    };

    // Obtener un producto por ID
    const getProductById = (id) => {
        return products.find(p => p.id === Number(id));
    };

    // Obtener productos por categoría
    const getProductsByCategory = (categoria) => {
        return products.filter(p => p.categoria === categoria);
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            getProductById,
            getProductsByCategory
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
