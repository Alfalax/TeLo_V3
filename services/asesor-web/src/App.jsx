import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Solicitudes from './pages/Solicitudes'
import Ofertas from './pages/Ofertas'
import Clientes from './pages/Clientes'
import Perfil from './pages/Perfil'

function App() {
  return (
    <Router>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/solicitudes" element={<Solicitudes />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App