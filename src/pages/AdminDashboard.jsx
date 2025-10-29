import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProductList from '../components/admin/ProductList';
import ProductCategories from '../components/admin/ProductCategories';
import { productosData } from '../data/productos';

const AdminDashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const [activeSection, setActiveSection] = useState('dashboard');

    // Función para convertir datos a CSV
    const convertToCSV = (data, headers) => {
        const csvRows = [];

        // Agregar encabezados
        csvRows.push(headers.join(','));

        // Agregar filas de datos
        for (const row of data) {
            const values = headers.map(header => {
                const value = row[header] || '';
                // Escapar comillas y envolver en comillas si contiene comas
                const escaped = ('' + value).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    // Función para descargar CSV
    const downloadCSV = (csvContent, filename) => {
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Exportar reporte de productos
    const exportarReporteProductos = () => {
        const productosParaExportar = productosData.map(producto => ({
            ID: producto.id,
            Nombre: producto.nombre,
            Precio: producto.precio,
            'Precio Oferta': producto.precioOferta || 'N/A',
            'Descuento %': producto.precioOferta
                ? Math.round(((producto.precio - producto.precioOferta) / producto.precio) * 100)
                : 0,
            Categoria: producto.categoria,
            Moneda: producto.unidad_moneda,
            Descripcion: producto.descripcion
        }));

        const headers = ['ID', 'Nombre', 'Precio', 'Precio Oferta', 'Descuento %', 'Categoria', 'Moneda', 'Descripcion'];
        const csvContent = convertToCSV(productosParaExportar, headers);
        const fecha = new Date().toISOString().split('T')[0];
        downloadCSV(csvContent, `reporte_productos_${fecha}.csv`);
    };

    // Exportar reporte de usuarios
    const exportarReporteUsuarios = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        const usuariosParaExportar = users.map(usuario => ({
            ID: usuario.id,
            Nombre: usuario.nombre,
            Email: usuario.correo,
            Rol: usuario.isAdmin ? 'Administrador' : 'Usuario',
            'Fecha Registro': new Date(usuario.fechaRegistro).toLocaleDateString('es-CL'),
            'Fecha Registro ISO': usuario.fechaRegistro
        }));

        const headers = ['ID', 'Nombre', 'Email', 'Rol', 'Fecha Registro', 'Fecha Registro ISO'];
        const csvContent = convertToCSV(usuariosParaExportar, headers);
        const fecha = new Date().toISOString().split('T')[0];
        downloadCSV(csvContent, `reporte_usuarios_${fecha}.csv`);
    };


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
            case 'reports':
                return <ReportsSection
                    onExportProducts={exportarReporteProductos}
                    onExportUsers={exportarReporteUsuarios}
                />;
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
                            <li className="nav-item">
                                <button
                                    className={`nav-link text-white btn btn-link ${activeSection === 'reports' ? 'active' : ''}`}
                                    onClick={() => setActiveSection('reports')}
                                >
                                    <i className="fas fa-file-download me-2"></i>
                                    Reportes
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

const ReportsSection = ({ onExportProducts, onExportUsers }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Calcular estadísticas
    const totalProductos = productosData.length;
    const productosConOferta = productosData.filter(p => p.precioOferta).length;
    const totalUsuarios = users.length;
    const totalAdmins = users.filter(u => u.isAdmin).length;

    return (
        <div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <h3>Reportes y Estadísticas</h3>
                    <p className="text-muted">Exporta reportes en formato CSV para análisis externo</p>
                </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title text-primary">{totalProductos}</h5>
                            <p className="card-text">Total Productos</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title text-success">{productosConOferta}</h5>
                            <p className="card-text">Con Ofertas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title text-info">{totalUsuarios}</h5>
                            <p className="card-text">Total Usuarios</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title text-warning">{totalAdmins}</h5>
                            <p className="card-text">Administradores</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tarjetas de reportes */}
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                                <i className="fas fa-box me-2"></i>
                                Reporte de Productos
                            </h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                Exporta el listado completo de productos con información detallada:
                            </p>
                            <ul>
                                <li>ID del producto</li>
                                <li>Nombre y descripción</li>
                                <li>Precios (normal y oferta)</li>
                                <li>Porcentaje de descuento</li>
                                <li>Categoría</li>
                                <li>Moneda</li>
                            </ul>
                            <div className="mt-3">
                                <strong>Total de productos:</strong> {totalProductos}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-primary w-100"
                                onClick={onExportProducts}
                            >
                                <i className="fas fa-download me-2"></i>
                                Exportar Productos CSV
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">
                                <i className="fas fa-users me-2"></i>
                                Reporte de Usuarios
                            </h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                Exporta el listado completo de usuarios registrados con:
                            </p>
                            <ul>
                                <li>ID del usuario</li>
                                <li>Nombre completo</li>
                                <li>Correo electrónico</li>
                                <li>Rol (Usuario/Administrador)</li>
                                <li>Fecha de registro</li>
                            </ul>
                            <div className="mt-3">
                                <strong>Total de usuarios:</strong> {totalUsuarios}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-success w-100"
                                onClick={onExportUsers}
                            >
                                <i className="fas fa-download me-2"></i>
                                Exportar Usuarios CSV
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">
                                <i className="fas fa-info-circle me-2"></i>
                                Información sobre los reportes
                            </h6>
                            <p className="card-text mb-0">
                                Los archivos CSV se descargarán automáticamente con la fecha actual en el nombre.
                                Puedes abrirlos con Excel, Google Sheets o cualquier software de hojas de cálculo.
                                El formato incluye encabezados y está optimizado para análisis de datos.
                            </p>
                        </div>
                    </div>
                </div>
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