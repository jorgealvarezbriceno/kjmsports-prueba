import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contactanos = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
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

        // Validación simple
        if (!formData.nombre || !formData.correo || !formData.mensaje) {
            setMessage({ type: 'error', text: 'Por favor, completa todos los campos.' });
            return;
        }
        // Validaciones detalladas
        if (!formData.nombre.trim()) {
            setMessage({ type: 'error', text: 'Por favor, ingresa tu nombre.' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo)) {
            setMessage({ type: 'error', text: 'Por favor, ingresa un correo electrónico válido.' });
            return;
        }

        if (formData.mensaje.trim().length < 10) {
            setMessage({ type: 'error', text: 'El mensaje debe tener al menos 10 caracteres.' });
            return;
        }

        // Guardar mensaje en localStorage
        const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
        const nuevoMensaje = {
            ...formData,
            id: Date.now(),
            fecha: new Date().toISOString()
        };
        mensajes.push(nuevoMensaje);
        localStorage.setItem('mensajes', JSON.stringify(mensajes));

        // Mostrar mensaje de éxito
        setMessage({ type: 'success', text: '¡Mensaje enviado con éxito! Te responderemos pronto.' });
        setMessage({ type: 'success', text: '¡Mensaje enviado con éxito! Te responderemos pronto.' });

        // Limpiar formulario
        setFormData({ nombre: '', correo: '', mensaje: '' });
    };

    // Estilo personalizado para el botón (simulando el degradado de tu imagen)
    const buttonStyle = {
        background: 'linear-gradient(to right, #2bc0e4, #007bff)', // Azul-Claro a Azul
        border: 'none',
        color: 'white',
        fontWeight: 'bold'
    };


    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">

                    {/* 🟢 CORRECCIÓN AQUÍ: Usamos bg-light para un gris muy claro */}
                    <div className="card p-4 shadow-lg bg-light">

                        {/* El texto del título es oscuro por defecto, pero si necesitas forzarlo: text-dark */}
                        <h2 className="text-center mb-4 display-6 fw-bold">Contactanos</h2>

                        {message && (
                            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-3`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Campo Nombre */}
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                {/* Inputs con fondo blanco por defecto, se ven bien con card bg-light */}
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

                            {/* Campo Mensaje */}
                            <div className="mb-4">
                                <label htmlFor="mensaje" className="form-label fw-bold">Mensaje</label>
                                <textarea
                                    className="form-control"
                                    id="mensaje"
                                    name="mensaje"
                                    rows="4"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            {/* Botón y Enlaces Inferiores */}
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-lg" style={buttonStyle}>
                                    Enviar Mensaje
                                </button>

                                {/* Enlaces de Registro/Inicio de Sesión, con color primario por defecto de Bootstrap */}
                                <div className="text-end">
                                    <Link to="/login" className="text-primary text-decoration-none me-3">Inicia sesión</Link>
                                    <span className="text-muted">·</span>
                                    <Link to="/registro" className="text-primary text-decoration-none ms-3">Registro</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactanos;