import React from 'react';
import { productosData } from '../../data/productos';

const ProductList = () => {
    // Preferir los productos guardados en localStorage si existen, si no usar los productos por defecto
    const saved = JSON.parse(localStorage.getItem('productos') || 'null');
    const products = Array.isArray(saved) && saved.length ? saved : productosData;

    const formatPrice = (price) => {
        return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title mb-0">Lista de Productos</h3>
                <button className="btn btn-primary btn-sm">
                    Agregar Producto
                </button>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.nombre}</td>
                                    <td>{formatPrice(product.precio)}</td>
                                    <td>{product.categoria || '-'}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2">
                                            Editar
                                        </button>
                                        <button className="btn btn-danger btn-sm">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;