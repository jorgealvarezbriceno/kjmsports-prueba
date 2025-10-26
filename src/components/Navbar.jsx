import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../context/CategoryContext';
import { useNavigate } from 'react-router-dom';
import kjmsportsLogo from '../assets/images/logo1.jpg';
// Recuerda que necesitas Font Awesome en index.html para el ícono del carrito

// FUNCIÓN DE FORMATO CLP (La misma que usamos en Productos.jsx)
const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const Navbar = () => {
    const { cart, removeFromCart } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const { categories } = useCategories();
    const navigate = useNavigate();

    const calculateSubtotal = () => {
        const total = cart.reduce((sum, item) => sum + parseFloat(item.precio), 0);
        return formatPrice(total);
    };

    const handleRemove = (e, id) => {
        e.stopPropagation();
        removeFromCart(id);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                {/* Logo y Marca: Alineado a la izquierda por defecto */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img
                        src={kjmsportsLogo}
                        alt="Logo KJM SPORTS"
                        style={{ height: '50px', width: 'auto', marginRight: '10px' }}
                    />
                    KJM SPORTS
                </Link>

                {/* Botón Hamburguesa... */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menú de Navegación y Carrito */}
                <div className="collapse navbar-collapse" id="navbarNav">

                    {/* 🟢 Menú de Enlaces: Usamos 'me-auto' para empujar el carrito a la derecha */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
                        <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
                        <li className="nav-item"><Link to="/productos" className="nav-link">Productos</Link></li>
                        <li className="nav-item"><Link to="/nosotros" className="nav-link">Nosotros</Link></li>
                        <li className="nav-item"><Link to="/blog" className="nav-link">Blog</Link></li>
                        <li className="nav-item"><Link to="/contactanos" className="nav-link">Contáctanos</Link></li>
                        <li className="nav-item">
                            <Link to="/ofertas" className="nav-link text-danger fw-bold">
                            <i className="fas fa-fire me-1"></i> Ofertas
                            </Link>
                            </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                Categorías
                            </a>
                            <ul className="dropdown-menu">
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <Link
                                            to={`/categoria/${category.name.toLowerCase()}`}
                                            className="dropdown-item"
                                        >
                                            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                    </ul>

                    {/* 🛒 Botón del carrito: Ahora está a la derecha del menú gracias a 'me-auto' 🛒 */}
                    <ul className="navbar-nav align-items-lg-center">
                        <li className="nav-item dropdown">
                            <button
                                className="btn btn-warning dropdown-toggle"
                                type="button"
                                id="cartDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-shopping-cart"></i>
                                <span className="badge bg-danger text-light ms-1">{cart.length}</span>
                            </button>

                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cartDropdown"
                                style={{ minWidth: '320px' }}
                            >
                                {cart.length === 0 ? (
                                    <li className="dropdown-item text-muted text-center">Tu carrito está vacío</li>
                                ) : (
                                    <>
                                        {cart.map((item) => (
                                            <li key={item.id}>
                                                <div className="dropdown-item d-flex justify-content-between align-items-center">
                                                    <span>{item.nombre.substring(0, 20)}... - {formatPrice(item.precio)}</span>

                                                    <button
                                                        className="btn btn-sm btn-danger ms-2"
                                                        onClick={(e) => handleRemove(e, item.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                        <li><hr className="dropdown-divider" /></li>

                                        <li className="px-3 py-1">
                                            <div className="d-flex justify-content-between fw-bold mb-2">
                                                <span>Subtotal:</span>
                                                <span>{calculateSubtotal()}</span>
                                            </div>
                                            <Link to="/carrito" className="btn btn-primary w-100">
                                                Ver Carrito ({cart.length})
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </li>
                    </ul>

                    {/* Panel de usuario: aparece a la derecha del carrito */}
                    <ul className="navbar-nav align-items-lg-center ms-2">
                        {isAuthenticated ? (
                            <li className="nav-item dropdown">
                                <button
                                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    id="userDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user-circle fa-lg me-2"></i>
                                    <span className="d-none d-lg-inline">{user?.nombre || user?.correo}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <li className="dropdown-item-text">Hola, <strong>{user?.nombre || user?.correo}</strong></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => navigate('/perfil')}>Mi Perfil</button>
                                    </li>
                                    {user?.isAdmin && (
                                        <li>
                                            <button className="dropdown-item" onClick={() => navigate('/admin')}>Panel Admin</button>
                                        </li>
                                    )}
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar sesión</button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registro" className="nav-link">Registro</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;