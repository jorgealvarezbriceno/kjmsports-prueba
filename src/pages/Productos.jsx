// src/pages/Productos.jsx

import React from 'react';
import useCart from '../hooks/useCart';
import Futbol3Img from '../assets/images/Futbol3.png';
import MancuernasImg from '../assets/images/Mancuernas.png';
import GuantesBoxeoImg from '../assets/images/GuantesBoxeo1.png';
import CuerdaImg from '../assets/images/Cuerda.png';
import KitImg from '../assets/images/Kit.png';
import LentesArenaImg from '../assets/images/lentes_arena_cobra.webp';
import BicicletaImg from '../assets/images/bicicleta_ruta.avif';
import NatacionImg from '../assets/images/natacion.jpg';
import HaalandImg from '../assets/images/haaland.avif';


const productosData = [
  {
    id: 1,
    nombre: 'Pelota de Fútbol Élite',
    precio: 55990, // ⬅️ CORREGIDO: Número entero
    imagen: Futbol3Img,
    descripcion: 'Balón oficial de alta calidad para rendimiento profesional.',
    unidad_moneda: 'CLP'
  },
  {
    id: 2,
    nombre: 'Mancuernas Ajustables KJM',
    precio: 35990, // CORREGIDO
    imagen: MancuernasImg,
    descripcion: 'Set de mancuernas ideales para entrenamiento de fuerza en casa.',
    unidad_moneda: 'CLP'
  },
  {
    id: 3,
    nombre: 'Guantes de Boxeo KJM Pro',
    precio: 49990, // CORREGIDO
    imagen: GuantesBoxeoImg,
    descripcion: 'Diseño ergonómico con acolchado de triple densidad.',
    unidad_moneda: 'CLP'
  },
  {
    id: 4,
    nombre: 'Cuerda para Saltar Profesional',
    precio: 15750, // CORREGIDO
    imagen: CuerdaImg,
    descripcion: 'Cuerda ligera y resistente, perfecta para cardio y coordinación.',
    unidad_moneda: 'CLP'
  },
  {
    id: 5,
    nombre: 'Kit de Entrenamiento KJM',
    precio: 120000, // CORREGIDO
    imagen: KitImg,
    descripcion: 'Todo lo que necesitas para tu entrenamiento en casa.',
    unidad_moneda: 'CLP'
  },
  {
    id: 6,
    nombre: 'Lentes de Arena KJM',
    precio: 25500, // CORREGIDO
    imagen: LentesArenaImg,
    descripcion: 'Lentes de alta calidad para natación, con protección UV.',
    unidad_moneda: 'CLP'
  },
  {
    id: 7,
    nombre: 'Bicicleta de Ruta Carbono',
    precio: 1899000, // CORREGIDO
    imagen: BicicletaImg,
    descripcion: 'Máximo rendimiento y ligereza para ciclistas avanzados.',
    unidad_moneda: 'CLP'
  },
  {
    id: 8,
    nombre: 'Traje de Natación KJM',
    precio: 30000, // ⬅️ CORREGIDO (30000 en lugar de 30.000)
    imagen: NatacionImg,
    descripcion: 'Traje hidrodinámico que mejora la velocidad en el agua.',
    unidad_moneda: 'CLP'
  },
  {
    id: 9,
    nombre: 'Haaland Jersey KJM',
    precio: 89990, // CORREGIDO
    imagen: HaalandImg,
    descripcion: 'Camiseta oficial de Erling Haaland, perfecta para los fanáticos del fútbol.',
    unidad_moneda: 'CLP'
  },
];

const formatPrice = (price) => {
  return price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const Productos = () => {
  const { addToCart } = useCart();
  const handleComprar = (producto) => {
    addToCart(producto);
    alert(`¡"${producto.nombre}" añadido al carrito!`);
  };
 return (
    <div className="container my-5">
         <h2 className="text-center mb-5 display-3 fw-bold"> 
            Nuestros Productos 
         </h2>
     <div className="row">
        {productosData.map((producto) => (
          <div key={producto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-primary">{producto.nombre}</h5>
                  <p className="card-text text-muted" style={{ minHeight: '40px' }}>{producto.descripcion}</p>
                </div>
                <div className="mt-3">
                  <h4 className="card-subtitle mb-2 text-dark">
                    <span className="fw-bold">
                      {formatPrice(producto.precio)}
                    </span>
                  </h4>
                  <button
                    onClick={() => handleComprar(producto)}
                    className="btn btn-success w-100 mt-2"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Productos;