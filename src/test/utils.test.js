import { describe, it, expect } from 'vitest';

// Función de formateo de precio
const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

describe('formatPrice utility', () => {
    it('debe formatear precios correctamente', () => {
        expect(formatPrice(10000)).toBe('$10.000');
        expect(formatPrice(1000)).toBe('$1.000');
        expect(formatPrice(100000)).toBe('$100.000');
    });

    it('debe manejar precio 0', () => {
        expect(formatPrice(0)).toBe('$0');
    });

    it('debe manejar números decimales redondeando', () => {
        const result = formatPrice(10500.99);
        expect(result).toContain('10.501');
    });
});
