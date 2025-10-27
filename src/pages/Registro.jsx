import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  validateNombre,
  validateCorreo,
  validatePassword,
  validateConfirmPassword,
  validateAllRegister
} from '../utils/registroValidation';

const Registro = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: ''
  });

  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = { ...formData, [name]: type === 'checkbox' ? checked : value };
    setFormData(next);

    if (name === 'nombre') setErrors(prev => ({ ...prev, nombre: validateNombre(value) }));
    if (name === 'correo') setErrors(prev => ({ ...prev, correo: validateCorreo(value) }));
    if (name === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
      
      if (formData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value, formData.confirmPassword) }));
      }
    }
    if (name === 'confirmPassword') setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(next.password, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre') setErrors(prev => ({ ...prev, nombre: validateNombre(value) }));
    if (name === 'correo') setErrors(prev => ({ ...prev, correo: validateCorreo(value) }));
    if (name === 'password') setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    if (name === 'confirmPassword') setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(formData.password, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const { errors: newErrors, isValid } = validateAllRegister(formData);
    setErrors(newErrors);

    if (!isValid) {
      setStatusMessage({ type: 'error', text: 'Corrige los errores antes de continuar.' });
      return;
    }

    setSubmitting(true);
    try {
      await register({
        nombre: formData.nombre,
        correo: formData.correo,
        password: formData.password,
        isAdmin: formData.isAdmin
      });
      setStatusMessage({ type: 'success', text: 'Registro correcto. Redirigiendo...' });
      navigate('/');
    } catch (err) {
      console.error('register error:', err);
      setStatusMessage({ type: 'error', text: err.message || 'Error al registrar.' });
    } finally {
      setSubmitting(false);
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

            {statusMessage && (
              <div className={`alert alert-${statusMessage.type === 'success' ? 'success' : 'danger'} mb-3`}>
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: Juan Pérez"
                  aria-describedby="nombreHelp nombreError"
                  required
                />
                <div id="nombreHelp" className="form-text">Ej: Juan Pérez </div>
                {errors.nombre && <div id="nombreError" className="invalid-feedback d-block">{errors.nombre}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-bold">Correo</label>
                <input
                  type="email"
                  className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ej: usuario@gmail.com"
                  aria-describedby="correoHelp correoError"
                  required
                />
                <div id="correoHelp" className="form-text">
                  Ejemplo: usuario@gmail.com
                </div>
                {errors.correo && <div id="correoError" className="invalid-feedback d-block">{errors.correo}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Mínimo 6 caracteres, un número y un símbolo"
                  aria-describedby="passwordHelp passwordError"
                  required
                />
                <div id="passwordHelp" className="form-text">Ejemplo: @Password2 </div>
                {errors.password && <div id="passwordError" className="invalid-feedback d-block">{errors.password}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="form-label fw-bold">Confirmar Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Repite tu contraseña"
                  aria-describedby="confirmPasswordHelp confirmPasswordError"
                  required
                />
                {errors.confirmPassword && <div id="confirmPasswordError" className="invalid-feedback d-block">{errors.confirmPassword}</div>}
              </div>

              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAdmin"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isAdmin">
                    Registrar como administrador
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-lg" style={buttonStyle} disabled={submitting}>
                  {submitting ? 'Registrando...' : 'Registrarse'}
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