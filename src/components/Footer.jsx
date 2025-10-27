
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '10px 20px', backgroundColor: '#222', color: 'white', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} KJM SPORTS. Todos los derechos reservados.</p>
    
    </footer>
  );
};

export default Footer;