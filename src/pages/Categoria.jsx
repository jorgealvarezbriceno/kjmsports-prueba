import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productosData } from '../data/productos';
import useCart from '../hooks/useCart';


const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const Categoria = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();

  // Filtrar productos por categoría
  const productosFiltrados = productosData.filter(
    (producto) => producto.categoria === slug
  );

  
  const nombreCategoria = {
    running: 'Running',
    futbol: 'Fútbol',
    natacion: 'Natación',
    otros: 'Otros Productos'
  }[slug] || 'Categoría';

  // Manejo del clickksss
  const handleAddToCart = (producto) => {
    addToCart(producto);

  };

  return (
    <div className="container mt-5 mb-5">
      {/* Título y botón volver */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">{nombreCategoria}</h2>
        <Link to="/productos" className="btn btn-outline-secondary">
          ← Todos los productos
        </Link>
      </div>

      {/* Si no hay productos */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-5">
          <div className="alert alert-light">
            <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
            <h4>No hay productos en esta categoría aún</h4>
            <p className="text-muted">¡Vuelve pronto para ver nuevas llegadas!</p>
            <Link to="/productos" className="btn btn-primary mt-3">
              Explorar todos los productos
            </Link>
          </div>
        </div>
      ) : (
        /* productos */
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="col">
              <div className="card h-100 shadow-sm hover-shadow transition">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{producto.nombre}</h5>
                  <p className="card-text text-muted flex-grow-1 small">
                    {producto.descripcion.length > 100
                      ? `${producto.descripcion.substring(0, 100)}...`
                      : producto.descripcion}
                  </p>
                  <div className="mt-auto">
                    <p className="h4 text-primary fw-bold mb-3">
                      {formatPrice(producto.precio)}
                    </p>
                    <button
                      onClick={() => handleAddToCart(producto)}
                      className="btn btn-success w-100"
                    >
                      <i className="fas fa-cart-plus me-2"></i>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categoria;