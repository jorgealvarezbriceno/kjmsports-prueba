import React, { useState } from 'react';
import { useCategories } from '../../context/CategoryContext';

const ProductCategories = () => {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategory.trim()) {
            setError('La categoría no puede estar vacía');
            return;
        }

        addCategory(newCategory);
        setNewCategory('');
        setError('');
    };

    const handleDeleteCategory = (id) => {
        deleteCategory(id);
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