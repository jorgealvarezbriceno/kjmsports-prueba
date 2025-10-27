import React from 'react';
import { Link } from 'react-router-dom';
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

const Productos = () => {
  const { addToCart } = useCart();
  const handleComprar = (producto) => {
    addToCart(producto);
    alert(`¡"${producto.nombre}" añadido al carrito!`);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 display-3 fw-bold">
        Nuestros Productos
      </h2>

      
      <div className="card shadow-lg rounded-4 mb-5 featured-section" style={{ border: 'none' }}>
        <div className="card-body p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="mb-0 text-dark fw-bold">Catálogo KJM</h3>
          </div>

          <div className="row">
            {productosData.map((producto) => (
              <div key={producto.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="card h-100 product-card bg-white">
                  <div className="product-img overflow-hidden">
                    <picture>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="card-img-top"
                        loading="lazy"
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                        style={{ height: '200px', objectFit: 'contain', width: '100%', padding: '10px' }}
                      />
                    </picture>
                  </div>

                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-primary">{producto.nombre}</h5>
                      <p className="card-text text-muted small" style={{ minHeight: '2.2rem' }}>{producto.descripcion}</p>
                    </div>

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <div>
                        {producto.precioOferta ? (
                          <>
                            <div className="text-decoration-line-through text-muted small">
                              {formatPrice(producto.precio)}
                            </div>
                            <div className="fw-bold text-danger fs-5">
                              {formatPrice(producto.precioOferta)}
                            </div>
                          </>
                        ) : (
                          <div className="fw-bold text-dark fs-5">{formatPrice(producto.precio)}</div>
                        )}
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleComprar(producto)}
                          className="btn btn-success btn-sm fw-bold"
                          aria-label={`Añadir ${producto.nombre} al carrito`}
                        >
                          Añadir al Carrito
                        </button>

                        <Link
                          to={`/producto/${producto.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver Descripcion
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="text-center mt-2 mb-5">
        <Link to="/productos" className="btn btn-outline-dark btn-lg">Ver Toda la Colección</Link>
      </div>
    </div>
  );
};

export default Productos;