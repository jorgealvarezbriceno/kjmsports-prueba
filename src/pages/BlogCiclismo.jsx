
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

export default function BlogCiclismo() {
  return (
    <div className="container my-5">
      <Link to="/blog" className="btn btn-primary mb-3">← Volver al blog</Link>

      <h1 className="mb-3">Entrenamiento de Intervalos: La Clave para la Resistencia en Ruta</h1>

      <VideoEmbed videoId="mRnD3lrCMbQ" title="Entrenamiento de Intervalos - Ciclismo en Ruta" />

      <article>
        <p>
          Esta reseña ofrece una guía práctica para integrar intervalos en tus entrenamientos de ciclismo en ruta.
          Los intervalos (series de alta intensidad seguidas por recuperaciones) aumentan capacidad aeróbica y potencia.
        </p>

        <h4>Estructura básica</h4>
        <p>
          Calentamiento: 15 a 20 minutos en zona fácil. Series principales: 4 a 8 repeticiones de 4 a 6 minutos a ritmo de
          umbral/VO2max (esfuerzo 8/10) con 3 a 4 minutos de recuperación activa entre series. Vuelta a la calma: 10 a 15 minutos.
          Frecuencia: 1 a 2 sesiones de calidad por semana, combinadas con rodajes suaves.
        </p>

        <h4>Ejemplo de microciclo</h4>
        <p>
          Lunes: recuperación activa 45 min. Martes: intervalos 6x4' (umbral) con 3' rec. Miércoles: sesión técnica o gimnasio.
          Jueves: rodaje largo 2 a 3 h suave. Viernes: series cortas 8x1' alta intensidad con 2' rec. Sábado: fondo. Domingo: descanso activo.
        </p>

        <h4>Progresión, nutrición y equipo</h4>
        <p>
          Aumenta volumen e intensidad gradualmente; aporte proteico post-entreno; usa casco homologado y considera sensor de potencia.
        </p>

        <p className="mt-3 text-muted">Consejo: registra sesiones y sensaciones para ajustar intensidad sin sobreentrenarte.</p>
      </article>
    </div>
  );
}
