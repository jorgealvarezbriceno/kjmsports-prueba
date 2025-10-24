// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '10px 20px', backgroundColor: '#222', color: 'white', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} KJM SPORTS. Todos los derechos reservados.</p>
      {/* Aquí podrías añadir enlaces a redes sociales, información de contacto, etc. */}
    </footer>
  );
};

export default Footer;