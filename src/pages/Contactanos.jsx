import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { validateNombre, validateCorreo, validateMensaje, validateAll } from '../utils/contactanosValidation';

const Contactanos = () => {
  const [formData, setFormData] = useState({ nombre: '', correo: '', mensaje: '' });
  const [errors, setErrors] = useState({ nombre: '', correo: '', mensaje: '' });
  const [statusMessage, setStatusMessage] = useState(null);

  const nombreRef = useRef(null);
  const correoRef = useRef(null);
  const mensajeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));

    
    if (name === 'nombre') setErrors((p) => ({ ...p, nombre: validateNombre(value) }));
    if (name === 'correo') setErrors((p) => ({ ...p, correo: validateCorreo(value) }));
    if (name === 'mensaje') setErrors((p) => ({ ...p, mensaje: validateMensaje(value) }));
  };

    const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';
    if (name === 'nombre') error = validateNombre(value);
    if (name === 'correo') error = validateCorreo(value);
    if (name === 'mensaje') error = validateMensaje(value);

    setErrors((p) => ({ ...p, [name]: error }));
   
    };


  const validateForm = () => {
    const { errors: newErrors, isValid } = validateAll(formData);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage(null);
    if (!validateForm()) {
      setStatusMessage({ type: 'error', text: 'Corrige los errores antes de enviar.' });
      return;
    }
    const mensajes = JSON.parse(localStorage.getItem('mensajes') || '[]');
    const nuevo = { ...formData, id: Date.now(), fecha: new Date().toISOString() };
    mensajes.push(nuevo);
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    setStatusMessage({ type: 'success', text: '¡Mensaje enviado con éxito! Te responderemos pronto.' });
    setFormData({ nombre: '', correo: '', mensaje: '' });
    setErrors({ nombre: '', correo: '', mensaje: '' });
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
        <div className="col-lg-8 col-md-10">
          <div className="card p-4 shadow-lg bg-light">
            <h2 className="text-center mb-4 display-6 fw-bold">Contáctanos</h2>

            {statusMessage && (
              <div className={`alert alert-${statusMessage.type === 'success' ? 'success' : 'danger'} mb-3`}>
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                <input
                  ref={nombreRef}
                  id="nombre"
                  name="nombre"
                  type="text"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: Jorge Alvarado"
                  aria-describedby="nombreHelp nombreError"
                  required
                />
                <div id="nombreHelp" className="form-text">
                  Ej: Jorge Alvarado — debe tener mínimo 10 caracteres y al menos dos palabras.
                </div>
                {errors.nombre && <div id="nombreError" className="invalid-feedback d-block">{errors.nombre}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-bold">Correo</label>
                <input
                  ref={correoRef}
                  id="correo"
                  name="correo"
                  type="email"
                  className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                  value={formData.correo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: usuario@gmail.com"
                  aria-describedby="correoHelp correoError"
                  required
                />
                <div id="correoHelp" className="form-text">
                  Ej:Los correos deben terminar en @gmail.com, @duocuc.cl, @profesor.cl 
                </div>
                {errors.correo && <div id="correoError" className="invalid-feedback d-block">{errors.correo}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="mensaje" className="form-label fw-bold">Mensaje</label>
                <textarea
                  ref={mensajeRef}
                  id="mensaje"
                  name="mensaje"
                  rows="8"
                  className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                  value={formData.mensaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Escribe tu mensaje aquí (mínimo 100 caracteres)..."
                  aria-describedby="mensajeHelp mensajeError"
                  required
                />
                <div id="mensajeHelp" className="form-text">
                  Ejemplo: Describe tu consulta con detalles. Mínimo 100 caracteres.
                </div>
                <div className="form-text text-muted">Caracteres: {formData.mensaje.length}</div>
                {errors.mensaje && <div id="mensajeError" className="invalid-feedback d-block">{errors.mensaje}</div>}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-lg" style={buttonStyle}>
                  Enviar Mensaje
                </button>

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