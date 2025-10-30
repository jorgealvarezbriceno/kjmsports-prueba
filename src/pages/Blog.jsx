
import React from 'react';
import { Link } from 'react-router-dom';

const VideoEmbed = ({ videoId, title }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div
      className="ratio ratio-16x9"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)', borderRadius: '8px', overflow: 'hidden' }}
    >
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default function Blog() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2
          className="display-3 fw-bold text-uppercase text-dark"
          style={{
            letterSpacing: '5px',
            transition: 'all 0.3s ease-in-out',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          KJM BLOG <span role="img" aria-label="blog-emoji"></span>
        </h2>
        <div
          className="mx-auto bg-primary"
          style={{ height: '3px', width: '80px', marginTop: '10px', borderRadius: '5px' }}
        ></div>
      </div>

      {/* Artículo 1: Ciclismo (VIDEO) */}
      <div className="row align-items-center mb-5 p-4 shadow-sm rounded bg-light">
        <div className="col-md-6 mb-4 mb-md-0">
          <VideoEmbed videoId="mRnD3lrCMbQ" title="Entrenamiento de Intervalos - Ciclismo en Ruta" />
        </div>
        <div className="col-md-6">
          <span className="badge bg-success mb-2">Ciclismo</span>
          <h3 className="lead fw-bold">Entrenamiento de Intervalos: La Clave para la Resistencia en Ruta</h3>
          <p>
            ¿Buscas pedalear más fuerte y durante más tiempo? La incorporación de sesiones de alta intensidad
            (HIIT) en tus recorridos de bicicleta es fundamental. Analizamos cómo estructurar tus entrenamientos
            por intervalos para maximizar la capacidad pulmonar, mejorar la potencia en las piernas y superar
            ascensos desafiantes. Conoce los mejores métodos y el equipamiento esencial que necesitas.
          </p>
          <Link to="/blog/ciclismo" className="btn btn-primary mt-2" aria-label="Leer reseña completa ciclismo">
            Leer reseña completa
          </Link>
        </div>
      </div>

      {/* Artículo 2: Fútbol (VIDEO) */}
      <div className="row align-items-center mb-5 p-4 shadow-sm rounded">
        <div className="col-md-6 order-md-2 mb-4 mb-md-0">
          <VideoEmbed videoId="3jDsm4fP-Yw" title="Dominio del Balón - Calzado y Técnica" />
        </div>
        <div className="col-md-6 order-md-1">
          <span className="badge bg-warning text-dark mb-2">Fútbol</span>
          <h3 className="lead fw-bold">El Dominio del Balón: El Calzado que Necesitas en Terreno Firme</h3>
          <p>
            La tecnología de las zapatillas de fútbol ha evolucionado drásticamente. Exploramos los nuevos modelos
            con tacos FG (Firm Ground) y su impacto en la tracción y el control del balón. Si juegas en césped
            natural, tu calzado es tu herramienta principal: te mostramos las diferencias entre el Gripknit y los
            materiales sintéticos, y cómo elegir el par que potencie tu precisión.
          </p>
          <Link to="/blog/futbol" className="btn btn-primary mt-2" aria-label="Leer reseña completa futbol">
            Leer reseña completa
          </Link>
        </div>
      </div>

      {/* Artículo 3: Natación (VIDEO) */}
      <div className="row align-items-center mb-5 p-4 shadow-sm rounded bg-light">
        <div className="col-md-6 mb-4 mb-md-0">
          <VideoEmbed videoId="EH5bEgvfHkk" title="Técnica de Crol - Brazada y Respiración" />
        </div>
        <div className="col-md-6">
          <span className="badge bg-info mb-2">Natación</span>
          <h3 className="lead fw-bold">Consejos para el Croll: Mejora tu Técnica de Brazada y Respiración</h3>
          <p>
            Para reducir la fatiga y aumentar la velocidad en la piscina, es vital perfeccionar la técnica de
            croll (estilo libre). Detallamos los errores más comunes en la fase de recobro y el giro de la cabeza
            para respirar. Además, destacamos la importancia de unos lentes anti-vaho y anti-rayos UV para mantener
            la concentración. ¡Domina el agua!
          </p>
          <Link to="/blog/natacion" className="btn btn-primary mt-2" aria-label="Leer reseña completa natacion">
            Leer reseña completa
          </Link>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">¡Pronto más artículos de entrenamiento!</p>
      </div>
    </div>
  );
}
