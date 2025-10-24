// src/pages/Productos.jsx

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
      <div className="row">
        {productosData.map((producto) => (
          <div key={producto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{ height: '200px', objectFit: 'contain', width: '100%', padding: '10px' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-primary">{producto.nombre}</h5>
                  <p className="card-text text-muted" style={{ minHeight: '40px' }}>{producto.descripcion}</p>
                </div>
                <div className="mt-3">
                  <h4 className="card-subtitle mb-2 text-dark">
                    <span className="fw-bold">
                      {formatPrice(producto.precio)}
                    </span>
                  </h4>
                  <div className="d-grid gap-2">
                    <button
                      onClick={() => handleComprar(producto)}
                      className="btn btn-success w-100"
                    >
                      Añadir al Carrito
                    </button>
                    <Link
                      to={`/producto/${producto.id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Productos;