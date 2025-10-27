import React from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { productosData } from '../data/productos';

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

    const producto = productosData.find(p => p.id === parseInt(id));

    if (!producto) {
        return (
            <div className="container my-5 text-center">
                <h2>Producto no encontrado</h2>
                <a href="/productos" className="btn btn-primary mt-3">Volver a Productos</a>
            </div>
        );
    }

    return (
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

                    {/* Precio con oferta si aplica */}
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
                                alert('¡Producto añadido al carrito!');
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
    );
};

export default DetalleProducto;