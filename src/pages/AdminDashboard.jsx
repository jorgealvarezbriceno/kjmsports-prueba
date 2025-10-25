import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProductList from '../components/admin/ProductList';
import ProductCategories from '../components/admin/ProductCategories';

const AdminDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const [activeSection, setActiveSection] = useState('dashboard');

    // Si no está autenticado o no es admin, redirigir a inicio
    if (!isAuthenticated || !user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'products':
                return <ProductList />;
            case 'categories':
                return <ProductCategories />;
            case 'users':
                return <UsersList />;
            default:
                return (
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title mb-0">Información del Administrador</h3>
                        </div>
                        <div className="card-body">
                            <p><strong>Nombre:</strong> {user.nombre}</p>
                            <p><strong>Email:</strong> {user.correo}</p>
                            <p><strong>Fecha de registro:</strong> {new Date(user.fechaRegistro).toLocaleDateString()}</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse" style={{ minHeight: '100vh' }}>
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button
                                    className={`nav-link text-white btn btn-link ${activeSection === 'dashboard' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('dashboard')}
                                >
                                    <i className="fas fa-tachometer-alt me-2"></i>
                                    Dashboard
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link text-white btn btn-link ${activeSection === 'products' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('products')}
                                >
                                    <i className="fas fa-box me-2"></i>
                                    Productos
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link text-white btn btn-link ${activeSection === 'categories' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('categories')}
                                >
                                    <i className="fas fa-tags me-2"></i>
                                    Categorías
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link text-white btn btn-link ${activeSection === 'users' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('users')}
                                >
                                    <i className="fas fa-users me-2"></i>
                                    Usuarios
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contenido principal */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Panel de Administración</h1>
                    </div>
                    
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

const UsersList = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title mb-0">Lista de Usuarios Registrados</h3>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Fecha de registro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.nombre}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.isAdmin ? 'Administrador' : 'Usuario'}</td>
                                    <td>{new Date(user.fechaRegistro).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;