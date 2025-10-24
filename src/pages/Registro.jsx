import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Registro = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!formData.nombre.trim()) {
            setError('Por favor, ingresa tu nombre');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo)) {
            setError('Por favor, ingresa un correo electrónico válido');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await register({
                nombre: formData.nombre,
                correo: formData.correo,
                password: formData.password
            });
            navigate('/'); // Redirigir al inicio después del registro exitoso
        } catch (error) {
            setError(error.message);
        }
    };

    const buttonStyle = {
        background: 'linear-gradient(to right, #2bc0e4, #007bff)',
        border: 'none',
        color: 'white',
        fontWeight: 'bold'
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card p-4 shadow-lg bg-light">
                        <h2 className="text-center mb-4 display-6 fw-bold">Crear Cuenta</h2>

                        {error && (
                            <div className="alert alert-danger mb-3">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label fw-bold">Correo</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="correo"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <small className="text-muted">La contraseña debe tener al menos 6 caracteres</small>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="form-label fw-bold">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-lg" style={buttonStyle}>
                                    Registrarse
                                </button>

                                <div className="text-end">
                                    <Link to="/login" className="text-primary text-decoration-none">
                                        ¿Ya tienes cuenta? Inicia sesión
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;