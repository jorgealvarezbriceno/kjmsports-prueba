import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ correo: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo)) {
            setError('Por favor, ingresa un correo válido');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            await login(formData.correo, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const buttonStyle = { background: 'linear-gradient(to right, #2bc0e4, #007bff)', border: 'none', color: 'white', fontWeight: 'bold' };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card p-4 shadow-lg bg-light">
                        <h2 className="text-center mb-4 display-6 fw-bold">Iniciar Sesión</h2>

                        {error && <div className="alert alert-danger mb-3">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label fw-bold">Correo</label>
                                <input type="email" id="correo" name="correo" className="form-control" value={formData.correo} onChange={handleChange} required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                                <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-lg" style={buttonStyle}>Iniciar Sesión</button>
                                <div className="text-end">
                                    <Link to="/registro" className="text-primary text-decoration-none">¿No tienes cuenta? Regístrate</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
