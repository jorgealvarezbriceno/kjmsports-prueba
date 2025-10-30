import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProductProvider, useProducts } from '../context/ProductContext';

// Wrapper para proveer el contexto
const wrapper = ({ children }) => <ProductProvider>{children}</ProductProvider>;

describe('ProductContext', () => {
    beforeEach(() => {
        // Limpiar localStorage antes de cada test
        localStorage.clear();
        localStorage.removeItem('productos_initialized');
    });

    it('debe cargar productos iniciales', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        expect(result.current.products).toBeDefined();
        expect(Array.isArray(result.current.products)).toBe(true);
        expect(result.current.products.length).toBeGreaterThan(0);
    });

    it('debe agregar un nuevo producto', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        const initialLength = result.current.products.length;

        act(() => {
            result.current.addProduct({
                nombre: 'Producto Test',
                precio: 10000,
                categoria: 'test'
            });
        });

        expect(result.current.products.length).toBe(initialLength + 1);
        expect(result.current.products[0].nombre).toBe('Producto Test');
        expect(result.current.products[0].precio).toBe(10000);
    });

    it('debe actualizar un producto existente', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        const productId = result.current.products[0].id;

        act(() => {
            result.current.updateProduct(productId, {
                nombre: 'Producto Actualizado',
                precio: 20000
            });
        });

        const updatedProduct = result.current.products.find(p => p.id === productId);
        expect(updatedProduct.nombre).toBe('Producto Actualizado');
        expect(updatedProduct.precio).toBe(20000);
    });

    it('debe eliminar un producto', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        const initialLength = result.current.products.length;
        const productId = result.current.products[0].id;

        act(() => {
            result.current.deleteProduct(productId);
        });

        expect(result.current.products.length).toBe(initialLength - 1);
        expect(result.current.products.find(p => p.id === productId)).toBeUndefined();
    });

    it('debe obtener un producto por ID', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        const productId = result.current.products[0].id;
        const product = result.current.getProductById(productId);

        expect(product).toBeDefined();
        expect(product.id).toBe(productId);
    });

    it('debe filtrar productos por categoría', () => {
        const { result } = renderHook(() => useProducts(), { wrapper });

        const categoria = result.current.products[0].categoria;
        const filteredProducts = result.current.getProductsByCategory(categoria);

        expect(Array.isArray(filteredProducts)).toBe(true);
        filteredProducts.forEach(product => {
            expect(product.categoria).toBe(categoria);
        });
    });
});
