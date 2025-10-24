import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link


// Si estas rutas fallan, debes verificar el nombre exacto en tu carpeta.
import Ciclismo4Img from '../assets/images/ciclismo4.webp'; // Dejamos minúsculas
import Futbol2Img from '../assets/images/Futbol2.png';      // Probamos con mayúscula inicial si falló antes
import Natacion1Img from '../assets/images/Natacion1.webp';  // Probamos con mayúscula inicial


export default function Blog() {
    return (
        <div className="container my-5">
            
            {/* Título Modernizado (Similar a Productos.jsx) */}
            <div className="text-center mb-5">
                <h2 
                    className="display-3 fw-bold text-uppercase text-dark"
                    style={{
                        letterSpacing: '5px',
                        transition: 'all 0.3s ease-in-out',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}
                > 
                    KJM BLOG <span role="img" aria-label="blog-emoji"></span>
                </h2>
                <div 
                    className="mx-auto bg-primary"
                    style={{ height: '3px', width: '80px', marginTop: '10px', borderRadius: '5px' }}
                ></div>
            </div>


            {/* Artículo 1: Ciclismo - Texto Derecha, Imagen Izquierda */}
            <div className="row align-items-center mb-5 p-4 shadow-sm rounded bg-light">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img
                        src={Ciclismo4Img}
                        alt="Ciclista subiendo una colina"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <span className="badge bg-success mb-2">Ciclismo</span>
                    <h3 className="lead fw-bold">Entrenamiento de Intervalos: La Clave para la Resistencia en Ruta</h3>
                    <p>
                        ¿Buscas pedalear más fuerte y durante más tiempo? La incorporación de sesiones de alta intensidad (HIIT) en tus recorridos de bicicleta es fundamental. Analizamos cómo estructurar tus entrenamientos por intervalos para maximizar la capacidad pulmonar, mejorar la potencia en las piernas y superar ascensos desafiantes. Conoce los mejores métodos y el equipamiento esencial que necesitas.
                    </p>
                    <Link to="#" className="btn btn-sm btn-outline-primary">Leer más</Link>
                </div>
            </div>

            {/* Artículo 2: Fútbol - Texto Izquierda, Imagen Derecha (Alternado) */}
            <div className="row align-items-center mb-5 p-4 shadow-sm rounded">
                <div className="col-md-6 order-md-2 mb-4 mb-md-0">
                    <img
                        src={Futbol2Img}
                        alt="Zapatillas de fútbol en el césped"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6 order-md-1"> {/* order-md-1 fuerza este elemento a la izquierda en desktop */}
                    <span className="badge bg-warning text-dark mb-2">Fútbol</span>
                    <h3 className="lead fw-bold">El Dominio del Balón: El Calzado que Necesitas en Terreno Firme</h3>
                    <p>
                        La tecnología de las zapatillas de fútbol ha evolucionado drásticamente. Exploramos los nuevos modelos con tacos FG (Firm Ground) y su impacto en la tracción y el control del balón. Si juegas en césped natural, tu calzado es tu herramienta principal: te mostramos las diferencias entre el Gripknit y los materiales sintéticos, y cómo elegir el par que potencie tu precisión.
                    </p>
                    <Link to="#" className="btn btn-sm btn-outline-warning">Leer más</Link>
                </div>
            </div>

            {/* Artículo 3: Natación - Texto Derecha, Imagen Izquierda */}
            <div className="row align-items-center mb-5 p-4 shadow-sm rounded bg-light">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img
                        src={Natacion1Img}
                        alt="Nadadora emergiendo del agua"
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <span className="badge bg-info mb-2">Natación</span>
                    <h3 className="lead fw-bold">Consejos para el Croll: Mejora tu Técnica de Brazada y Respiración</h3>
                    <p>
                        Para reducir la fatiga y aumentar la velocidad en la piscina, es vital perfeccionar la técnica de croll (estilo libre). Detallamos los errores más comunes en la fase de recobro y el giro de la cabeza para respirar. Además, destacamos la importancia de unos lentes anti-vaho y anti-rayos UV para mantener la concentración. ¡Domina el agua!
                    </p>
                    <Link to="#" className="btn btn-sm btn-outline-info">Leer más</Link>
                </div>
            </div>
            
            <div className="text-center mt-5">
                 <p className="text-muted">¡Pronto más artículos de entrenamiento!</p>
            </div>
        </div>
    );
}
