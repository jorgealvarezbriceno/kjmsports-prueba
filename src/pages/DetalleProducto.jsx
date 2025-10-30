import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useProducts } from '../context/ProductContext';
import Toast from '../components/Toast';

const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const DetalleProducto = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { getProductById } = useProducts();
    const [showToast, setShowToast] = useState(false);

    const producto = getProductById(id);

    if (!producto) {
        return (
            <div className="container my-5 text-center">
                <h2>Producto no encontrado</h2>
                <a href="/productos" className="btn btn-primary mt-3">Volver a Productos</a>
            </div>
        );
    }

    return (
        <>
            <Toast
                message="¡Producto añadido al carrito!"
                type="success"
                show={showToast}
                onClose={() => setShowToast(false)}
            />

            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-4">{producto.nombre}</h2>
                        <p className="lead mb-4">{producto.descripcion}</p>


                        <div className="mb-4">
                            {producto.precioOferta ? (
                                <>
                                    <div className="d-flex align-items-center gap-3 mb-2">
                                        <span className="badge bg-danger fs-6">
                                            OFERTA -{Math.round(((producto.precio - producto.precioOferta) / producto.precio) * 100)}%
                                        </span>
                                    </div>
                                    <div className="text-decoration-line-through text-muted fs-5">
                                        {formatPrice(producto.precio)}
                                    </div>
                                    <h3 className="text-danger fw-bold mb-0">
                                        {formatPrice(producto.precioOferta)}
                                    </h3>
                                </>
                            ) : (
                                <h3 className="text-primary mb-0">{formatPrice(producto.precio)}</h3>
                            )}
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-success btn-lg"
                                onClick={() => {
                                    addToCart(producto);
                                    setShowToast(true);
                                }}
                            >
                                Añadir al Carrito
                            </button>
                            <a href="/productos" className="btn btn-outline-secondary">
                                Volver a Productos
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetalleProducto;