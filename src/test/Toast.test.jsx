import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Toast from '../components/Toast';

describe('Toast Component', () => {
    it('debe renderizar el mensaje cuando show es true', () => {
        render(
            <Toast
                message="Test message"
                show={true}
                onClose={() => { }}
            />
        );

        expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('no debe renderizar cuando show es false', () => {
        render(
            <Toast
                message="Test message"
                show={false}
                onClose={() => { }}
            />
        );

        expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });

    it('debe aplicar el tipo correcto (success)', () => {
        const { container } = render(
            <Toast
                message="Success message"
                type="success"
                show={true}
                onClose={() => { }}
            />
        );

        expect(container.querySelector('.bg-success')).toBeInTheDocument();
    });

    it('debe aplicar el tipo correcto (error)', () => {
        const { container } = render(
            <Toast
                message="Error message"
                type="error"
                show={true}
                onClose={() => { }}
            />
        );

        expect(container.querySelector('.bg-danger')).toBeInTheDocument();
    });
});
