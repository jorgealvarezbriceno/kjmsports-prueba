import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        // 1. Validación de campos obligatorios
        if (!formData.nombre || !formData.correo || !formData.password || !formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Por favor, completa todos los campos.' });
            return;
        }

        // 2. Validación de contraseña
        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            return;
        }

        // Simulación de envío
        console.log('Datos de registro:', formData);
        setMessage({ type: 'success', text: '¡Registro exitoso! Ya puedes iniciar sesión.' });
        
        // Limpiar formulario
        setFormData({ nombre: '', correo: '', password: '', confirmPassword: '' });
    };

    // Estilo para el botón (simulando el degradado de tu formulario de Contacto)
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
                    
                    {/* Tarjeta Centrada: bg-light para el contraste sutil */}
                    <div className="card p-4 shadow-lg bg-light"> 
                        
                        <h2 className="text-center mb-4 display-6 fw-bold">Crear Cuenta</h2>
                        
                        {message && (
                            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-3`}>
                                {message.text}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            
                            {/* Campo Nombre */}
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

                            {/* Campo Correo */}
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
                            
                            {/* Campo Contraseña */}
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
                            </div>

                            {/* Campo Confirmar Contraseña */}
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

                            {/* Botón y Enlaces Inferiores */}
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-lg" style={buttonStyle}>
                                    Registrarse
                                </button>
                                
                                {/* Enlace de Inicio de Sesión */}
                                <div className="text-end">
                                    <Link to="/login" className="text-primary text-decoration-none">¿Ya tienes cuenta? Inicia sesión</Link> 
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
