// src/pages/Carrito.jsx
import React from 'react';
import useCart from '../hooks/useCart';

// 🟢 Función de formato CLP
const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const Carrito = () => {
    // Obtenemos las nuevas funciones
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    // 🟢 Función para calcular el total
    const calculateTotal = () => {
        // Sumamos el precio * la cantidad de cada ítem (usando precio de oferta si existe)
        return cart.reduce((sum, item) => {
            const precioFinal = item.precioOferta || item.precio;
            return sum + parseFloat(precioFinal * item.quantity);
        }, 0);
    };

    const totalCompra = calculateTotal();

    return (
        <div className="container my-5">
            <h2 className="text-center mb-5 display-5 fw-bold">Tu Carrito de Compras 🛍️</h2>

            {cart.length === 0 ? (
                // Carrito Vacío
                <div className="alert alert-info text-center" role="alert">
                    Tu carrito está vacío. <a href="/productos" className="alert-link">¡Explora nuestros productos!</a>
                </div>
            ) : (
                <div className="row">

                    {/* Columna Izquierda: Lista de Ítems (Ancho 8) */}
                    <div className="col-lg-8">
                        <h4 className="mb-3">Artículos</h4>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="card mb-3 shadow-sm d-flex flex-row align-items-center"
                            >
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '15px' }}
                                    className="rounded"
                                />

                                <div className="card-body d-flex justify-content-between align-items-center p-3 w-100">
                                    <div style={{ flexGrow: 1 }}>
                                        <h5 className="card-title mb-1">{item.nombre}</h5>
                                        {/* Precio unitario y total del ítem */}
                                        <div className="mb-1">
                                            {item.precioOferta ? (
                                                <>
                                                    <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '0.9em' }}>
                                                        {formatPrice(item.precio)}
                                                    </span>
                                                    <span className="text-danger fw-bold">
                                                        {formatPrice(item.precioOferta)}
                                                    </span>
                                                    <span className="text-muted ms-1" style={{ fontSize: '0.85em' }}>c/u</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="fw-bold">{formatPrice(item.precio)}</span>
                                                    <span className="text-muted ms-1" style={{ fontSize: '0.85em' }}>c/u</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="card-text text-muted mb-0">
                                            Total: <strong>{formatPrice((item.precioOferta || item.precio) * item.quantity)}</strong>
                                        </p>
                                    </div>

                                    <div className="d-flex align-items-center me-3">
                                        {/* 🟢 CONTROLES DE CANTIDAD */}
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2 fw-bold">{item.quantity}</span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => increaseQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Columna Derecha: Resumen del Pedido (Ancho 4) */}
                    <div className="col-lg-4">
                        <div className="card shadow-lg sticky-top" style={{ top: '20px' }}>
                            <div className="card-body">
                                <h4 className="card-title mb-4">Resumen del Pedido</h4>
                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Subtotal ({cart.length} productos):
                                        <span>{formatPrice(totalCompra)}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fw-bold text-success">
                                        Total:
                                        <span>{formatPrice(totalCompra)}</span>
                                    </li>
                                </ul>
                                <button className="btn btn-success btn-lg w-100 mt-3" onClick={() => alert('Simulando proceso de pago...')}>
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;