import React, { useState, useEffect } from 'react';

const ProductCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const savedCategories = JSON.parse(localStorage.getItem('productCategories') || '[]');
        setCategories(savedCategories);
    }, []);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            setError('La categoría no puede estar vacía');
            return;
        }

        const category = {
            id: Date.now(),
            name: newCategory.trim()
        };

        const updatedCategories = [...categories, category];
        setCategories(updatedCategories);
        localStorage.setItem('productCategories', JSON.stringify(updatedCategories));
        setNewCategory('');
        setError('');
    };

    const handleDeeteCategory = (id) => {
        const updatedCategories = categories.filter(cat => cat.id !== id);
        setCategories(updatedCategories);
        localStorage.setItem('productCategories', JSON.stringify(updatedCategories)); l
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title mb-0">Gestión de Categorías</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleAddCategory} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nueva categoría"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Agregar
                        </button>
                    </div>
                    {error && <div className="text-danger mt-2">{error}</div>}
                </form>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
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

export default ProductCategories;