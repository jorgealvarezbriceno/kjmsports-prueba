
import React from 'react';
import { Link } from 'react-router-dom';

const VideoEmbed = ({ videoId, title }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="ratio ratio-16x9 mb-4" style={{ borderRadius: 8, overflow: 'hidden' }}>
      <iframe src={embedUrl} title={title} frameBorder="0" allowFullScreen loading="lazy" />
    </div>
  );
};

export default function BlogFutbol() {
  return (
    <div className="container my-5">
      <Link to="/blog" className="btn btn-primary mb-3">← Volver al blog</Link>

      <h1 className="mb-3">El Dominio del Balón: El Calzado que Necesitas en Terreno Firme</h1>

      <VideoEmbed videoId="3jDsm4fP-Yw" title="Dominio del Balón - Calzado y Técnica" />

      <article>
        <p>
          Reseña completa sobre elección de calzado para césped firme: materiales, suela, tacos y ajuste para mejorar tracción y control.
        </p>

        <h4>Materiales y ajuste</h4>
        <p>
          Knit aporta ajuste y sensibilidad; sintéticos ofrecen durabilidad. Ajuste ceñido pero cómodo evita desplazamientos y ampollas.
        </p>

        <h4>Suela y tacos</h4>
        <p>
          En FG busca tacos diseñados para distribuir presión y facilitar giros. Prueba distintos modelos para tu tipo de pie.
        </p>

        <h4>Mantenimiento</h4>
        <p>
          Limpia barro, seca a temperatura ambiente y revisa desgaste de tacos. Cambia calzado si pierdes tracción o soporte.
        </p>

        <p className="mt-3 text-muted">Consejo: prueba varias tallas y juega con el par antes de decidir.</p>
      </article>
    </div>
  );
}
