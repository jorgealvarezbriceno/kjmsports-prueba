import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Carrito from './pages/Carrito';
import Contactanos from './pages/Contactanos';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />

          {/* 🟢 CONTENEDOR CENTRAL DE ANCHO LIMITADO */}
          <div className="content-container">
            <main style={{ minHeight: '80vh' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/contactanos" element={<Contactanos />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>

          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;