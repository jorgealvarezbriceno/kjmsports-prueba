import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';

const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        region: '',
        codigoPostal: '',
        comentarios: '',
        metodoPago: 'tarjeta'
    });

    const [errors, setErrors] = useState({});
    const [ordenGenerada, setOrdenGenerada] = useState(null);


    const calculateTotal = () => {
        return cart.reduce((sum, item) => {
            const precioFinal = item.precioOferta || item.precio;
            return sum + parseFloat(precioFinal * item.quantity);
        }, 0);
    };


    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
        if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
        if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es requerida';
        if (!formData.region.trim()) newErrors.region = 'La región es requerida';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };


    const generarNumeroOrden = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `KJM-${timestamp}-${random}`;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }


        const orden = {
            numeroOrden: generarNumeroOrden(),
            fecha: new Date().toLocaleString('es-CL'),
            cliente: {
                nombre: `${formData.nombre} ${formData.apellido}`,
                email: formData.email,
                telefono: formData.telefono,
                direccion: `${formData.direccion}, ${formData.ciudad}, ${formData.region}`,
                codigoPostal: formData.codigoPostal
            },
            productos: cart.map(item => ({
                nombre: item.nombre,
                cantidad: item.quantity,
                precioUnitario: item.precioOferta || item.precio,
                subtotal: (item.precioOferta || item.precio) * item.quantity
            })),
            comentarios: formData.comentarios,
            metodoPago: formData.metodoPago,
            total: calculateTotal()
        };

        setOrdenGenerada(orden);


        const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
        ordenes.push(orden);
        localStorage.setItem('ordenes', JSON.stringify(ordenes));


        setTimeout(() => {
            clearCart();
        }, 2000);
    };


    if (cart.length === 0 && !ordenGenerada) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning text-center">
                    <h4>Tu carrito está vacío</h4>
                    <p>Agrega productos antes de proceder al checkout</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/productos')}>
                        Ir a Productos
                    </button>
                </div>
            </div>
        );
    }

    if (ordenGenerada) {
        return (
            <div className="container my-5">
                <div className="card shadow-lg">
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <div className="text-success mb-3">
                                <i className="fas fa-check-circle fa-5x"></i>
                            </div>
                            <h2 className="text-success mb-3">¡Pago Exitoso!</h2>
                            <p className="lead">Tu orden ha sido procesada correctamente</p>
                        </div>

                        <div className="border-top pt-4">
                            <h4 className="mb-3">Detalles de la Orden</h4>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <strong>Número de Orden:</strong>
                                    <p className="text-primary">{ordenGenerada.numeroOrden}</p>
                                </div>
                                <div className="col-md-6">
                                    <strong>Fecha:</strong>
                                    <p>{ordenGenerada.fecha}</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <strong>Cliente:</strong>
                                <p className="mb-0">{ordenGenerada.cliente.nombre}</p>
                                <p className="mb-0">{ordenGenerada.cliente.email}</p>
                                <p className="mb-0">{ordenGenerada.cliente.telefono}</p>
                            </div>

                            <div className="mb-3">
                                <strong>Dirección de Entrega:</strong>
                                <p>{ordenGenerada.cliente.direccion}</p>
                            </div>

                            {ordenGenerada.comentarios && (
                                <div className="mb-3">
                                    <strong>Comentarios de Entrega:</strong>
                                    <p className="fst-italic">{ordenGenerada.comentarios}</p>
                                </div>
                            )}

                            <div className="mb-3">
                                <strong>Productos:</strong>
                                <ul className="list-group mt-2">
                                    {ordenGenerada.productos.map((prod, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between">
                                            <span>{prod.nombre} x {prod.cantidad}</span>
                                            <span className="fw-bold">{formatPrice(prod.subtotal)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-3">
                                <strong>Método de Pago:</strong>
                                <p className="text-capitalize">{ordenGenerada.metodoPago === 'tarjeta' ? 'Tarjeta de Crédito/Débito' : ordenGenerada.metodoPago}</p>
                            </div>

                            <div className="border-top pt-3">
                                <h4 className="text-end">Total: <span className="text-success">{formatPrice(ordenGenerada.total)}</span></h4>
                            </div>
                        </div>

                        <div className="text-center mt-4 no-print">
                            <button className="btn btn-primary btn-lg me-2" onClick={() => navigate('/productos')}>
                                Seguir Comprando
                            </button>
                            <button className="btn btn-outline-secondary btn-lg" onClick={() => window.print()}>
                                <i className="fas fa-print me-2"></i>Imprimir Orden
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    const totalCompra = calculateTotal();

    return (
        <div className="container my-5">
            <h2 className="text-center mb-5 display-5 fw-bold">Finalizar Compra</h2>

            <div className="row">

                <div className="col-lg-7">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Información del Cliente</h4>

                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Nombre *</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Apellido *</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                            name="apellido"
                                            value={formData.apellido}
                                            onChange={handleChange}
                                        />
                                        {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Teléfono *</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder="+56 9 1234 5678"
                                        />
                                        {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                                    </div>
                                </div>

                                <h5 className="mt-4 mb-3">Dirección de Entrega</h5>

                                <div className="mb-3">
                                    <label className="form-label">Dirección *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        placeholder="Calle, número, depto/casa"
                                    />
                                    {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-5">
                                        <label className="form-label">Ciudad *</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                                            name="ciudad"
                                            value={formData.ciudad}
                                            onChange={handleChange}
                                        />
                                        {errors.ciudad && <div className="invalid-feedback">{errors.ciudad}</div>}
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Región *</label>
                                        <select
                                            className={`form-control ${errors.region ? 'is-invalid' : ''}`}
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                        >
                                            <option value="">Seleccionar...</option>
                                            <option value="Región Metropolitana">Región Metropolitana</option>
                                            <option value="Valparaíso">Valparaíso</option>
                                            <option value="Biobío">Biobío</option>
                                            <option value="Maule">Maule</option>
                                            <option value="Los Lagos">Los Lagos</option>
                                            <option value="Antofagasta">Antofagasta</option>
                                            <option value="Coquimbo">Coquimbo</option>
                                            <option value="Araucanía">Araucanía</option>
                                            <option value="Atacama">Atacama</option>
                                            <option value="O'Higgins">O'Higgins</option>
                                            <option value="Aysén">Aysén</option>
                                            <option value="Magallanes">Magallanes</option>
                                            <option value="Tarapacá">Tarapacá</option>
                                            <option value="Los Ríos">Los Ríos</option>
                                            <option value="Arica y Parinacota">Arica y Parinacota</option>
                                            <option value="Ñuble">Ñuble</option>
                                        </select>
                                        {errors.region && <div className="invalid-feedback">{errors.region}</div>}
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">Código Postal</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="codigoPostal"
                                            value={formData.codigoPostal}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Comentarios de Entrega</label>
                                    <textarea
                                        className="form-control"
                                        name="comentarios"
                                        value={formData.comentarios}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Ej: Tocar timbre 2 veces, entregar en conserjería, etc."
                                    ></textarea>
                                </div>

                                <h5 className="mt-4 mb-3">Método de Pago</h5>

                                <div className="mb-3">
                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="metodoPago"
                                            id="tarjeta"
                                            value="tarjeta"
                                            checked={formData.metodoPago === 'tarjeta'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="tarjeta">
                                            <i className="fas fa-credit-card me-2"></i>Tarjeta de Crédito/Débito
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="metodoPago"
                                            id="transferencia"
                                            value="transferencia"
                                            checked={formData.metodoPago === 'transferencia'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="transferencia">
                                            <i className="fas fa-exchange-alt me-2"></i>Transferencia Bancaria
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="metodoPago"
                                            id="efectivo"
                                            value="efectivo"
                                            checked={formData.metodoPago === 'efectivo'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="efectivo">
                                            <i className="fas fa-money-bill-wave me-2"></i>Pago en Efectivo (contra entrega)
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success btn-lg w-100 mt-4">
                                    <i className="fas fa-lock me-2"></i>Confirmar y Pagar {formatPrice(totalCompra)}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>


                <div className="col-lg-5">
                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body">
                            <h4 className="card-title mb-4">Resumen del Pedido</h4>

                            <div className="mb-3">
                                {cart.map((item) => (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                                        <div className="flex-grow-1">
                                            <div className="fw-bold small">{item.nombre}</div>
                                            <div className="text-muted small">
                                                Cantidad: {item.quantity} x {formatPrice(item.precioOferta || item.precio)}
                                            </div>
                                        </div>
                                        <div className="fw-bold">
                                            {formatPrice((item.precioOferta || item.precio) * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-top pt-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal ({cart.length} productos):</span>
                                    <span>{formatPrice(totalCompra)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Envío:</span>
                                    <span className="text-success">GRATIS</span>
                                </div>
                                <div className="d-flex justify-content-between fw-bold fs-5 text-success border-top pt-2">
                                    <span>Total:</span>
                                    <span>{formatPrice(totalCompra)}</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
