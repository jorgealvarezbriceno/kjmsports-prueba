import React from 'react';
import { productosData } from '../../data/productos';

const ProductList = () => {
    // Preferir los productos guardados en localStorage si existen, si no usar los productos por defecto
    const saved = JSON.parse(localStorage.getItem('productos') || 'null');
    const initial = Array.isArray(saved) && saved.length ? saved : productosData;

    const [products, setProducts] = React.useState(initial);
    const [editingId, setEditingId] = React.useState(null);
    const [editValues, setEditValues] = React.useState({ nombre: '', precio: '' });

    const persist = (next) => {
        localStorage.setItem('productos', JSON.stringify(next));
        setProducts(next);
    };

    const formatPrice = (price) => {
        return Number(price).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    };

    const handleDelete = (id) => {
        if (!window.confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return;
        const next = products.filter(p => p.id !== id);
        persist(next);
    };

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditValues({ nombre: product.nombre, precio: product.precio });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues({ nombre: '', precio: '' });
    };

    const saveEdit = (id) => {
        const next = products.map(p => p.id === id ? { ...p, nombre: editValues.nombre, precio: Number(editValues.precio) } : p);
        persist(next);
        cancelEdit();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValues(v => ({ ...v, [name]: value }));
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title mb-0">Lista de Productos</h3>
                <button className="btn btn-primary btn-sm" onClick={() => {
                    // Crear un nuevo producto mínimo y entrar en modo edición
                    const nuevo = {
                        id: Date.now(),
                        nombre: 'Nuevo producto',
                        precio: 0,
                        unidad_moneda: 'CLP',
                        categoria: 'otros'
                    };
                    const next = [nuevo, ...products];
                    persist(next);
                    startEdit(nuevo);
                }}>
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
                                    <td>
                                        {editingId === product.id ? (
                                            <input type="text" name="nombre" className="form-control" value={editValues.nombre} onChange={handleChange} />
                                        ) : (
                                            product.nombre
                                        )}
                                    </td>
                                    <td>
                                        {editingId === product.id ? (
                                            <input type="number" name="precio" className="form-control" value={editValues.precio} onChange={handleChange} />
                                        ) : (
                                            formatPrice(product.precio)
                                        )}
                                    </td>
                                    <td>{product.categoria || '-'}</td>
                                    <td>
                                        {editingId === product.id ? (
                                            <>
                                                <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(product.id)}>Guardar</button>
                                                <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancelar</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(product)}>
                                                    Editar
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
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