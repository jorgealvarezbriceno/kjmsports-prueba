import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';


// Videos
const YOUTUBE_VIDEO_ID = 'mEgg83JgkFw';
const BOTTOM_YOUTUBE_VIDEO_ID = 'IyTv_SR2uUo'; 


// Imágenes para los sliders (colócalas en src/assets/images)
import RunningImg from '../assets/images/running.webp';
import NatacionImg from '../assets/images/natacion.jpg';
import FutbolImg from '../assets/images/futbol.jpg';

import SliderHomeImg from '../assets/images/sliderhome.jpg';
import SliderHome2Img from '../assets/images/sliderhome2.jpg';
import SliderHome3Img from '../assets/images/sliderhome3.jpg';


import Natacion1Img from '../assets/images/Natacion1.webp';
import Lentes2Img from '../assets/images/lentes2.webp';
import MancuernasImg from '../assets/images/Mancuernas.png';
import GuantesBoxeoImg from '../assets/images/GuantesBoxeo1.png';
import KitImg from '../assets/images/Kit.png';

import prod8 from '../assets/images/productos8.webp';
import prod9 from '../assets/images/productos9.webp';
import prod10 from '../assets/images/productos10.webp';
import prod11 from '../assets/images/productos11.webp';
import prod12 from '../assets/images/productos12.jpg';
import prod13 from '../assets/images/productos13.avif';


const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const popularProducts = [
  { id: 101, nombre: 'Sandalias adilette', precio: 65990, imagen: prod13, descripcion: 'Luego de su lanzamiento en 1972 las adilette comenzaron su viaje hacia la fama mundial, coronándose como las sandalias más populares de todos los tiempos.' },
  { id: 102, nombre: 'Polera ASICS Fujitrail Logo LS Top Manga Larga - Masculino - Beige', precio: 45000, imagen: prod8, descripcion: 'Traje hidrodinámico para máxima velocidad.' },
  { id: 103, nombre: 'Boxer Performance de algodón 3"para hombre 3pk Under Armour', precio: 22990, imagen: prod9, descripcion: 'Con tecnología que te mantiene fresco, los bóxers Under Armour Boxerjock ofrecen una sensación refrescante' },
  { id: 104, nombre: 'Lentes Natación Unisex Biofuse 2.0 Negro', precio: 32500, imagen: prod10, descripcion: 'Nuestras gafas Biofuse acaban de mejorar. Presentamos Biofuse 2.0. Aún con nuestra tecnología Speedo Biofuse® de mayor venta' },
  { id: 105, nombre: 'Naricera Natación Speedo Biofuse Clear', precio: 49990, imagen: prod11, descripcion: 'Nuestro clip para la nariz más cómodo hasta la fecha. El Clip para la Nariz Biofuse ofrece el nivel perfecto de seguridad y comodidad' },
  { id: 106, nombre: 'Gorra Futura deslavada sin estructura', precio: 15750, imagen: prod12, descripcion: 'Una gorra clásica de profundidad media con muchas opciones de estilo.' },
];

const Home = () => {
  const { addToCart } = useCart();

  const handleComprar = (producto, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    addToCart(producto);
    // Puedes cambiar alert por un toast (recomendado) en el futuro
    alert(`¡"${producto.nombre}" añadido al carrito!`);
  };

  return (
    <div className="container my-4">
      {/* Título principal */}
      <div className="text-center mb-5">
        <h2
          className="display-3 fw-bold text-uppercase text-dark"
          style={{
            letterSpacing: '5px',
            transition: 'all 0.3s ease-in-out',
            textShadow: '1px 1px 2px rgba(0,0,0,0.08)',
          }}
        >
          Bienvenido a KJM SPORTS <span role="img" aria-label="shopping-bags">🛍️</span>
        </h2>
        <div
          className="mx-auto bg-primary"
          style={{ height: '3px', width: '80px', marginTop: '10px', borderRadius: '5px' }}
        />
      </div>

      {/* CAJA PRINCIPAL: Video (izquierda) + Slider (derecha) */}
      <div className="card shadow-lg rounded-4 mb-5" style={{ border: 'none' }}>
        <div className="card-body p-4">
          <div className="row g-0 align-items-center">
            {/* IZQUIERDA: Video */}
            <div className="col-lg-6 col-md-12 p-4 order-1 order-lg-1">
              <div className="ratio ratio-16x9 shadow rounded-3 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                {/* Mantengo autoplay=1&mute=1 para permitir autoplay en la mayoría de navegadores */}
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?controls=1&modestbranding=1&autoplay=1&mute=1&rel=0`}
                  title="Video KJM SPORTS"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
            </div>

            {/* DERECHA: Carrusel superior (running, natacion, futbol) */}
            <div className="col-lg-6 col-md-12 p-4 order-2 order-lg-2">
              <div
                id="topCarousel"
                className="carousel slide rounded-3 overflow-hidden shadow-sm"
                data-bs-ride="carousel"
                data-bs-interval="4000"
              >
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#topCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#topCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#topCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>

                <div className="carousel-inner" style={{ minHeight: '240px' }}>
                  <div className="carousel-item active">
                    <picture>
                      <source type="image/webp" srcSet={RunningImg} />
                      <img
                        src={RunningImg}
                        className="d-block w-100"
                        alt="Running"
                        style={{ height: '320px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </picture>
                    <div className="carousel-caption d-none d-md-block text-start" style={{ left: '1rem', right: 'auto' }}>
                      <h5 className="text-white fw-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Running</h5>
                      <p className="small">Calzado y accesorios para running.</p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <picture>
                      <img
                        src={NatacionImg}
                        className="d-block w-100"
                        alt="Natación"
                        style={{ height: '320px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </picture>
                    <div className="carousel-caption d-none d-md-block text-start" style={{ left: '1rem', right: 'auto' }}>
                      <h5 className="text-white fw-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Natación</h5>
                      <p className="small">Trajes y lentes para un mejor rendimiento.</p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <picture>
                      <img
                        src={FutbolImg}
                        className="d-block w-100"
                        alt="Fútbol"
                        style={{ height: '320px', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </picture>
                    <div className="carousel-caption d-none d-md-block text-start" style={{ left: '1rem', right: 'auto' }}>
                      <h5 className="text-white fw-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>Fútbol</h5>
                      <p className="small">Balones y equipamiento oficial.</p>
                    </div>
                  </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#topCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#topCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lo Más Vendido */}
      <div className="card shadow-lg rounded-4 mb-5 featured-section" style={{ border: 'none' }}>
        <div className="card-body p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="mb-0 text-dark fw-bold">🔥 Lo Más Vendido de la Semana</h3>
            <Link to="/productos" className="btn btn-outline-dark">Ver Toda la Colección</Link>
          </div>

          <div className="row">
            {popularProducts.map((producto) => (
              <div key={producto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card h-100 product-card bg-white">
                  <div className="product-img overflow-hidden">
                    <picture>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="card-img-top"
                        loading="lazy"
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                      />
                    </picture>
                  </div>

                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-primary">{producto.nombre}</h5>
                      <p className="card-text text-muted" style={{ minHeight: '48px' }}>{producto.descripcion}</p>
                    </div>

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <div className="fw-bold text-dark">{formatPrice(producto.precio)}</div>

                      <div className="d-flex gap-2">
                        <button
                          onClick={(e) => handleComprar(producto, e)}
                          className="btn btn-warning btn-sm fw-bold"
                          aria-label={`Añadir ${producto.nombre} al carrito`}
                        >
                          Añadir al Carrito
                        </button>

                        <Link
                          to={`/producto/${producto.id}`}
                          state={{ product: producto }}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver Detalle
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* SEGUNDA CARD ABAJO: Video (izquierda) + Slider (derecha) con video looping */}
      <div className="card shadow-lg rounded-4 mb-5" style={{ border: 'none' }}>
        <div className="card-body p-4">
          <div className="row g-0 align-items-center">
            {/* IZQUIERDA: Video inferior que debe correr sin parar */}
            <div className="col-lg-6 col-md-12 p-4 order-1 order-lg-1">
              <div className="ratio ratio-16x9 shadow rounded-3 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                {/* Para que YouTube repita el video sin parar usamos loop=1 y playlist=VIDEO_ID,
                    además autoplay=1 y mute=1 para permitir autoplay en la mayoría de navegadores */}
                <iframe
                  src={`https://www.youtube.com/embed/${BOTTOM_YOUTUBE_VIDEO_ID}?controls=1&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=${BOTTOM_YOUTUBE_VIDEO_ID}&rel=0`}
                  title="Video KJM SPORTS - loop"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: 0 }}
                />
              </div>
            </div>

            {/* DERECHA: Carrusel inferior con sliderhome images */}
            <div className="col-lg-6 col-md-12 p-4 order-2 order-lg-2">
              <div
                id="bottomCarousel"
                className="carousel slide rounded-3 overflow-hidden shadow-sm"
                data-bs-ride="carousel"
                data-bs-interval="3500"
              >
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#bottomCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide A"></button>
                  <button type="button" data-bs-target="#bottomCarousel" data-bs-slide-to="1" aria-label="Slide B"></button>
                  <button type="button" data-bs-target="#bottomCarousel" data-bs-slide-to="2" aria-label="Slide C"></button>
                </div>

                <div className="carousel-inner" style={{ minHeight: '240px' }}>
                  <div className="carousel-item active">
                    <img
                      src={SliderHomeImg}
                      className="d-block w-100"
                      alt="Slide A"
                      style={{ height: '320px', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div className="carousel-caption d-none d-md-block text-start" style={{ left: '1rem', right: 'auto' }}>
                      <h5 className="text-white fw-bold">KJM Sports</h5>
                      <p className="small">Calidad y rendimiento para tu entrenamiento.</p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img
                      src={SliderHome2Img}
                      className="d-block w-100"
                      alt="Slide B"
                      style={{ height: '320px', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div className="carousel-caption d-none d-md-block text-start" style={{ left: '1rem', right: 'auto' }}>
                      <h5 className="text-white fw-bold">Novedades</h5>
                      <p className="small">Productos destacados y novedades KJM.</p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img
                      src={SliderHome3Img}
                      className="d-block w-100"
                      alt="Slide C"
                      style={{ height: '320px', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div className="carousel-caption d-none d-md-block text-start" style={{ left: '1rem', right: 'auto' }}>
                      <h5 className="text-white fw-bold">Ofertas</h5>
                      <p className="small">Aprovecha los descuentos semanales.</p>
                    </div>
                  </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#bottomCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#bottomCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-2 mb-5">
        <Link to="/productos" className="btn btn-outline-dark btn-lg">Ver Toda la Colección</Link>
      </div>
    </div>
  );
};

export default Home;