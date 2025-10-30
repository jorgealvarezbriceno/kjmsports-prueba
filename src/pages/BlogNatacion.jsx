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

export default function BlogNatacion() {
  return (
    <div className="container my-5">
      <Link to="/blog" className="btn btn-primary mb-3">← Volver al blog</Link>

      <h1 className="mb-3">Consejos para el Crol: Mejora tu Técnica de Brazada y Respiración</h1>

      <VideoEmbed videoId="EH5bEgvfHkk" title="Técnica de Crol - Brazada y Respiración" />

      <article>
        <p>
          Reseña completa con ejercicios y un plan práctico para mejorar crol: posición corporal, técnica de brazada, y respiración.
        </p>

        <h4>Posición del cuerpo</h4>
        <p>
          Mantén el cuerpo alineado y lo más horizontal posible. Evita que las piernas se hundan; activa core para reducir
          resistencia. Cabeza en ligera mirada hacia abajo, no levantada.
        </p>

        <h4>Brazada y agarre</h4>
        <p>
          Entra la mano con el brazo extendido y ligeramente fuera de la línea de los hombros; realiza agarre efectivo empujando
          hacia atrás desde la cadera. Evita entradas cruzadas que generan torque y pierden eficiencia.
        </p>

        <h4>Respiración</h4>
        <p>
          Integra respiración bilateral o unilateral según tu ritmo. Gira cabeza lateralmente sin elevarla; la exhalación debe
          ser dentro del agua para que la inhalación sea rápida y controlada. Practica 3 a 5 respiraciones por cada 3 brazadas para bilateralidad.
        </p>

        <h4>Drills recomendados</h4>
        <p>
          1 Pull buoy + palas: trabaja agarre y potencia de brazos. 2 Catch-up drill: mejora extensión y sincronía. 3) Respiración con un
          solo brazo: corrige rotación y posición. 4 Series de velocidad con técnica enfocada (6x50 con 1' rec).
        </p>

        <h4>Plan de práctica (4 semanas)</h4>
        <p>
          Semana tipo: 3 sesiones/semana. Sesión A: técnica + 6x100 a ritmo sostenido. Sesión B: series de velocidad 8x50. Sesión C:
          resistencia 1x1200 combinado con drills. Incrementa volumen e intensidad progresivamente.
        </p>

        <p className="mt-3 text-muted">Consejo: graba tus entrenamientos o pide feedback del entrenador para corregir detalles técnicos.</p>
      </article>
    </div>
  );
}