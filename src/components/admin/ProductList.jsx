import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCategories } from '../../context/CategoryContext';

const ProductList = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const { categories } = useCategories();

    const [editingId, setEditingId] = React.useState(null);
    const [editValues, setEditValues] = React.useState({
        nombre: '',
        precio: '',
        precioOferta: '',
        descripcion: '',
        categoria: '',
        imagen: ''
    });
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [productToDelete, setProductToDelete] = React.useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const formatPrice = (price) => {
        return Number(price).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
    };

    const handleDelete = (id) => {
        setProductToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteProduct(productToDelete);
        setShowDeleteModal(false);
        setProductToDelete(null);
        showSuccess('Producto eliminado correctamente');
    };

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditValues({
            nombre: product.nombre,
            precio: product.precio,
            precioOferta: product.precioOferta || '',
            descripcion: product.descripcion || '',
            categoria: product.categoria || '',
            imagen: product.imagen || ''
        });
        setShowAddForm(false);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setShowAddForm(false);
        setEditValues({
            nombre: '',
            precio: '',
            precioOferta: '',
            descripcion: '',
            categoria: '',
            imagen: ''
        });
    };

    const saveEdit = (id) => {
        updateProduct(id, editValues);
        cancelEdit();
        showSuccess('Producto actualizado correctamente');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValues(v => ({ ...v, [name]: value }));
    };

    const handleAddProduct = () => {
        if (!editValues.nombre || !editValues.precio) {
            showError('Por favor completa al menos el nombre y precio del producto');
            return;
        }
        addProduct(editValues);
        cancelEdit();
        showSuccess('Producto agregado correctamente');
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 4000);
    };

    return (
        <>
            {/* Mensajes de éxito y error */}
            {showSuccessMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    {successMessage}
                    <button type="button" className="btn-close" onClick={() => setShowSuccessMessage(false)}></button>
                </div>
            )}

            {showErrorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {errorMessage}
                    <button type="button" className="btn-close" onClick={() => setShowErrorMessage(false)}></button>
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">
                                    <i className="fas fa-exclamation-triangle me-2"></i>
                                    Confirmar Eliminación
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p className="mb-0">¿Estás seguro de que deseas eliminar este producto?</p>
                                <p className="text-muted small mb-0">Esta acción no se puede deshacer.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                    <i className="fas fa-trash me-2"></i>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="card-title mb-0">Lista de Productos ({products.length})</h3>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                            setShowAddForm(true);
                            setEditingId(null);
                            setEditValues({
                                nombre: '',
                                precio: '',
                                precioOferta: '',
                                descripcion: '',
                                categoria: categories.length > 0 ? categories[0].name : 'otros',
                                imagen: ''
                            });
                        }}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Agregar Producto
                    </button>
                </div>
                <div className="card-body">

                    {/* Formulario para agregar nuevo producto */}
                    {showAddForm && (
                        <div className="card mb-4 border-primary">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Nuevo Producto</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nombre del Producto *</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className="form-control"
                                            value={editValues.nombre}
                                            onChange={handleChange}
                                            placeholder="Ej: Zapatillas Nike"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Precio *</label>
                                        <input
                                            type="number"
                                            name="precio"
                                            className="form-control"
                                            value={editValues.precio}
                                            onChange={handleChange}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label className="form-label">Precio Oferta</label>
                                        <input
                                            type="number"
                                            name="precioOferta"
                                            className="form-control"
                                            value={editValues.precioOferta}
                                            onChange={handleChange}
                                            placeholder="Opcional"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Categoría</label>
                                        <select
                                            name="categoria"
                                            className="form-select"
                                            value={editValues.categoria}
                                            onChange={handleChange}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">URL de Imagen</label>
                                        <input
                                            type="text"
                                            name="imagen"
                                            className="form-control"
                                            value={editValues.imagen}
                                            onChange={handleChange}
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Descripción</label>
                                        <textarea
                                            name="descripcion"
                                            className="form-control"
                                            rows="3"
                                            value={editValues.descripcion}
                                            onChange={handleChange}
                                            placeholder="Descripción del producto"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success" onClick={handleAddProduct}>
                                        <i className="fas fa-check me-2"></i>
                                        Guardar Producto
                                    </button>
                                    <button className="btn btn-secondary" onClick={cancelEdit}>
                                        <i className="fas fa-times me-2"></i>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tabla de productos */}
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: '30%' }}>Nombre</th>
                                    <th style={{ width: '15%' }}>Precio</th>
                                    <th style={{ width: '15%' }}>Precio Oferta</th>
                                    <th style={{ width: '15%' }}>Categoría</th>
                                    <th style={{ width: '25%' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            {editingId === product.id ? (
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    className="form-control form-control-sm"
                                                    value={editValues.nombre}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                <div>
                                                    <div className="fw-bold">{product.nombre}</div>
                                                    {product.descripcion && (
                                                        <small className="text-muted">{product.descripcion.substring(0, 50)}...</small>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {editingId === product.id ? (
                                                <input
                                                    type="number"
                                                    name="precio"
                                                    className="form-control form-control-sm"
                                                    value={editValues.precio}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                formatPrice(product.precio)
                                            )}
                                        </td>
                                        <td>
                                            {editingId === product.id ? (
                                                <input
                                                    type="number"
                                                    name="precioOferta"
                                                    className="form-control form-control-sm"
                                                    value={editValues.precioOferta}
                                                    onChange={handleChange}
                                                    placeholder="Opcional"
                                                />
                                            ) : (
                                                product.precioOferta ? (
                                                    <span className="text-danger fw-bold">{formatPrice(product.precioOferta)}</span>
                                                ) : (
                                                    <span className="text-muted">-</span>
                                                )
                                            )}
                                        </td>
                                        <td>
                                            {editingId === product.id ? (
                                                <select
                                                    name="categoria"
                                                    className="form-select form-select-sm"
                                                    value={editValues.categoria}
                                                    onChange={handleChange}
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="badge bg-secondary">{product.categoria || 'Sin categoría'}</span>
                                            )}
                                        </td>
                                        <td>
                                            {editingId === product.id ? (
                                                <div className="d-flex gap-1">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => saveEdit(product.id)}
                                                        title="Guardar cambios"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={cancelEdit}
                                                        title="Cancelar"
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="d-flex gap-1">
                                                    <button
                                                        className="btn btn-warning btn-sm"
                                                        onClick={() => startEdit(product)}
                                                        title="Editar producto"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(product.id)}
                                                        title="Eliminar producto"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-5">
                            <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                            <p className="text-muted">No hay productos registrados. Haz clic en "Agregar Producto" para comenzar.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductList;