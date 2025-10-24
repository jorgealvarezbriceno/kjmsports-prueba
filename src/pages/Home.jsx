import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart'; // Necesario para la funcionalidad de compra

// 🟢 ID del video de YouTube del usuario
const YOUTUBE_VIDEO_ID = 'mEgg83JgkFw';


import Futbol3Img from '../assets/images/Futbol3.png'; // Usaremos esta
import Natacion1Img from '../assets/images/Natacion1.webp'; // Usaremos esta
import Lentes2Img from '../assets/images/lentes2.webp'; // Usaremos esta
import MancuernasImg from '../assets/images/Mancuernas.png'; // Usaremos esta
import GuantesBoxeoImg from '../assets/images/GuantesBoxeo1.png'; // Usaremos esta
import KitImg from '../assets/images/Kit.png'; // Usaremos esta


const formatPrice = (price) => {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};


const popularProducts = [
    { id: 101, nombre: 'Balón Oficial de Fútbol', precio: 65990, imagen: Futbol3Img, descripcion: 'Balón de entrenamiento, durabilidad extrema.' },
    { id: 102, nombre: 'Traje de Natación Pro', precio: 45000, imagen: Natacion1Img, descripcion: 'Traje hidrodinámico para máxima velocidad.' },
    { id: 103, nombre: 'Lentes Natación Fénix', precio: 22990, imagen: Lentes2Img, descripcion: 'Lentes con anti-vaho y amplio campo de visión.' },
    { id: 104, nombre: 'Mancuernas 5kg (Par)', precio: 32500, imagen: MancuernasImg, descripcion: 'Ideal para entrenamiento de fuerza y tonificación.' },
    { id: 105, nombre: 'Guantes Boxeo Amateur', precio: 49990, imagen: GuantesBoxeoImg, descripcion: 'Protección acolchada para sparring y saco.' },
    { id: 106, nombre: 'Kit de Primeros Auxilios', precio: 15750, imagen: KitImg, descripcion: 'Esenciales para lesiones menores en el campo o gimnasio.' },
];


const Home = () => {
    const { addToCart } = useCart();

    const handleComprar = (producto) => {
        addToCart(producto);
        alert(`¡"${producto.nombre}" añadido al carrito!`);
    };

    return (
        <div className="container my-4">

            {/* Título y Divisor (Sección Superior) */}
            <div className="text-center mb-5">
                <h2
                    className="display-3 fw-bold text-uppercase text-dark"
                    style={{
                        letterSpacing: '5px',
                        transition: 'all 0.3s ease-in-out',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}
                >
                    Bienvenido a KJM SPORTS <span role="img" aria-label="shopping-bags">🛍️</span>
                </h2>
                <div
                    className="mx-auto bg-primary"
                    style={{ height: '3px', width: '80px', marginTop: '10px', borderRadius: '5px' }}
                ></div>
            </div>

            {/* Fila 1: Reseña y Video (Autoplay Silenciado) */}
            <div className="row align-items-center mb-5">
                {/* Columna Izquierda: Reseña de la tienda */}
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <h3>Tu Pasión, Nuestro Compromiso</h3>
                    <p>En KJM SPORTS, somos un equipo de apasionados...</p>
                    <p>Equipate, Entrena y Triunfa!</p>
                </div>

                {/* Columna Derecha: Video */}
                <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                    <div className="ratio ratio-16x9 shadow-lg rounded">
                        <iframe
                            className="embed-responsive-item"
                            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?controls=1&modestbranding=1&autoplay=1&mute=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Video KJM SPORTS"
                        ></iframe>
                    </div>
                </div>
            </div> {/* Fin de Fila 1 */}

            <hr className="my-5" />

            {/* 🟢 SECCIÓN DE PRODUCTOS MÁS VENDIDOS */}
            <div className="text-center mb-5">
                <h3 className="fw-bold display-6 text-dark">
                    🔥 Lo Más Vendido de la Semana
                </h3>
            </div>

            <div className="row">
                {popularProducts.map((producto) => (

                    <div key={producto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">

                        <div className="card h-100 shadow-lg border-primary border-3">

                            <img
                                src={producto.imagen}
                                className="card-img-top"
                                alt={producto.nombre}
                                style={{ maxHeight: '200px', objectFit: 'cover' }}
                            />

                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="card-title text-primary">{producto.nombre}</h5>
                                    <p className="card-text text-muted">{producto.descripcion}</p>
                                </div>

                                <div className="mt-3">
                                    <h4 className="card-subtitle mb-2 text-dark">
                                        <span className="fw-bold">
                                            {formatPrice(producto.precio)}
                                        </span>
                                    </h4>

                                    <button
                                        onClick={() => handleComprar(producto)}
                                        className="btn btn-warning w-100 mt-2 fw-bold"
                                    >
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                <Link to="/productos" className="btn btn-outline-dark btn-lg">
                    Ver Toda la Colección
                </Link>
            </div>
        </div>
    );
};

export default Home;
