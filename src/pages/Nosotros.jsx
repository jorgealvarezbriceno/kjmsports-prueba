import React from 'react';
import { Link } from 'react-router-dom';


const YOUTUBE_VIDEO_ID = 'mEgg83JgkFw'; 

const Nosotros = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
            <h2 
                className="display-3 fw-bold text-uppercase text-dark"
                style={{
                    letterSpacing: '5px',
                    transition: 'all 0.3s ease-in-out',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
            > 
                Nosotros y Nuestra Visión
            </h2>
            <div 
                className="mx-auto bg-primary"
                style={{ height: '3px', width: '80px', marginTop: '10px', borderRadius: '5px' }}
            ></div>
        </div>
      
     
      <div className="row align-items-center mb-5 p-4 shadow-lg rounded bg-white"> 
        
       
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4"> 
          <h3 className="fw-bold text-primary">Nuestra Visión: Líderes en Equipamiento Deportivo</h3>
          <p className="lead">
            Visualizamos un futuro donde cada persona, sin importar su nivel de habilidad, tenga acceso al equipo de más alta tecnología para alcanzar sus metas deportivas. En KJM SPORTS, nuestra visión es ser el punto de referencia en Chile para la excelencia en rendimiento y calidad.
          </p>
          <p>
            Trabajamos día a día para innovar en nuestra selección de productos, desde zapatillas de fútbol con la última tecnología de agarre hasta bicicletas de carbono ultraligeras, asegurando que tu pasión se encuentre con la performance.
          </p>
          <Link to="/productos" className="btn btn-warning mt-3">Ver Nuestra Colección</Link>
        </div>

       
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

      </div>
      <hr className="my-5" />
      <h3 className="text-center mb-4 fw-bold">Valores Fundamentales</h3>
      <div className="row p-4 rounded shadow-lg bg-secondary text-white"> 
          
          
          <div className="col-md-4 mb-4">
            <div className="card h-100 p-3 text-center border-0 shadow-sm bg-dark text-white"> 
                <i className="fas fa-running fa-3x text-success mb-3"></i>
                <h5 className="fw-bold">Rendimiento</h5>
                <p className="text-light">Comprometidos a ofrecer productos que garantizan la máxima eficiencia y resultados.</p>
            </div>
          </div>

       
          <div className="col-md-4 mb-4">
            <div className="card h-100 p-3 text-center border-0 shadow-sm bg-dark text-white">
                <i className="fas fa-hands-helping fa-3x text-info mb-3"></i>
                <h5 className="fw-bold">Integridad</h5>
                <p className="text-light">Transparencia total en nuestros procesos y un servicio al cliente honesto.</p>
            </div>
          </div>

         
          <div className="col-md-4 mb-4">
            <div className="card h-100 p-3 text-center border-0 shadow-sm bg-dark text-white">
                <i className="fas fa-users fa-3x text-warning mb-3"></i>
                <h5 className="fw-bold">Comunidad</h5>
                <p className="text-light">Creemos en el poder del deporte para unir, inspirar y crear un impacto positivo.</p>
            </div>
          </div>
          
      </div>

    </div>
  );
};

export default Nosotros;
