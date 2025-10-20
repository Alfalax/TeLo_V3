const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const solicitudRoutes = require('./routes/solicitud');
const ofertaRoutes = require('./routes/oferta');
const asesorRoutes = require('./routes/asesor');
const clienteRoutes = require('./routes/cliente');
const repuestoRoutes = require('./routes/repuesto');

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/ofertas', ofertaRoutes);
app.use('/api/asesores', asesorRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/repuestos', repuestoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'Core TeLo',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Core TeLo ejecutándose en puerto ${PORT}`);
});

module.exports = app;