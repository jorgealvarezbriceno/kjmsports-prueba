
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';


const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const Carrito = () => {
   
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    
    const calculateTotal = () => {
        
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
               
                <div className="alert alert-info text-center" role="alert">
                    Tu carrito está vacío. <a href="/productos" className="alert-link">¡Explora nuestros productos!</a>
                </div>
            ) : (
                <div className="row">

                    
                    <div className="col-lg-8">
                        <h4 className="mb-3">Artículos</h4>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="card mb-3 shadow-sm"
                            >
                                <div className="row g-0">
                                    {/* Imagen */}
                                    <div className="col-4 col-md-2 d-flex align-items-center justify-content-center p-2">
                                        <img
                                            src={item.imagen}
                                            alt={item.nombre}
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '100px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    {/* Contenido */}
                                    <div className="col-8 col-md-10">
                                        <div className="card-body p-3">
                                            {/* Nombre del producto */}
                                            <h5 className="card-title mb-2">{item.nombre}</h5>
                                            
                                            {/* Precio */}
                                            <div className="mb-2">
                                                {item.precioOferta ? (
                                                    <>
                                                        <span className="text-decoration-line-through text-muted me-2 small">
                                                            {formatPrice(item.precio)}
                                                        </span>
                                                        <span className="text-danger fw-bold">
                                                            {formatPrice(item.precioOferta)}
                                                        </span>
                                                        <span className="text-muted ms-1 small">c/u</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="fw-bold">{formatPrice(item.precio)}</span>
                                                        <span className="text-muted ms-1 small">c/u</span>
                                                    </>
                                                )}
                                            </div>
                                            
                                            {/* Total */}
                                            <p className="card-text text-muted mb-3">
                                                Total: <strong>{formatPrice((item.precioOferta || item.precio) * item.quantity)}</strong>
                                            </p>

                                            {/* Controles - Responsive */}
                                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                                                {/* Cantidad */}
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-3 fw-bold">{item.quantity}</span>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => increaseQuantity(item.id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Botón eliminar */}
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <i className="fas fa-trash me-1"></i>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    
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
                                <button
                                    className="btn btn-success btn-lg w-100 mt-3"
                                    onClick={() => navigate('/checkout')}
                                >
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