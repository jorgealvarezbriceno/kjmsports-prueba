import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Perfil = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="container my-5 text-center">
                <h2>No has iniciado sesión</h2>
                <p>Por favor, <Link to="/login">inicia sesión</Link> o <Link to="/registro">regístrate</Link>.</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4 shadow-lg">
                        <h2 className="mb-3">Mi Perfil</h2>
                        <p><strong>Nombre:</strong> {user.nombre || '—'}</p>
                        <p><strong>Correo:</strong> {user.correo}</p>
                        {user.fechaRegistro && (
                            <p><strong>Registrado:</strong> {new Date(user.fechaRegistro).toLocaleString()}</p>
                        )}

                        <div className="mt-4 d-flex gap-2">
                            <button className="btn btn-outline-danger" onClick={() => { logout(); window.location.href = '/'; }}>
                                Cerrar sesión
                            </button>
                            <Link to="/" className="btn btn-primary">Volver a Inicio</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
