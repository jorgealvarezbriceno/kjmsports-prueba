import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import useCart from '../hooks/useCart';
import Toast from '../components/Toast';

const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });
};

const Ofertas = () => {
  const { addToCart } = useCart() || {};
  const { products } = useProducts();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleComprar = (producto) => {
    addToCart(producto);
    setToastMessage(`¡"${producto.nombre}" añadido al carrito!`);
    setShowToast(true);
  };

  const productosOferta = products.filter(p => p.precioOferta);

  return (
    <>
      <Toast
        message={toastMessage}
        type="success"
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-danger">
            Ofertas Especiales
          </h2>
          <Link to="/productos" className="btn btn-outline-secondary">
            ← Todos los productos
          </Link>
        </div>

        {productosOferta.length === 0 ? (
          <div className="text-center py-5">
            <div className="alert alert-warning">
              <h4>No hay ofertas activas</h4>
              <p className="text-muted">¡Vuelve pronto!</p>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {productosOferta.map(producto => (
              <div key={producto.id} className="col">
                <div className="card h-100 border-0 shadow-sm position-relative">
                  <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 rounded-start">
                    <small className="fw-bold">
                      -{Math.round(((producto.precio - producto.precioOferta) / producto.precio) * 100)}%
                    </small>
                  </div>

                  <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold small">{producto.nombre}</h5>
                    <p className="text-muted small flex-grow-1">
                      {producto.descripcion && producto.descripcion.substring(0, 80)}...
                    </p>

                    <div className="mt-auto">
                      <p className="mb-1">
                        <span className="text-muted text-decoration-line-through small">
                          {formatPrice(producto.precio)}
                        </span>
                      </p>
                      <p className="h4 text-danger fw-bold mb-3">
                        {formatPrice(producto.precioOferta)}
                      </p>

                      <div className="d-grid gap-2">
                        <button
                          onClick={() => handleComprar(producto)}
                          className="btn btn-danger"
                        >
                          Agregar al carrito
                        </button>
                        <Link
                          to={`/producto/${producto.id}`}
                          className="btn btn-outline-dark btn-sm"
                        >
                          Ver detalle
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}; export default Ofertas; 