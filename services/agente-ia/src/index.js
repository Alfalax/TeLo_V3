const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const whatsappRoutes = require('./routes/whatsapp');
const aiRoutes = require('./routes/ai');
const solicitudRoutes = require('./routes/solicitud');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/solicitud', solicitudRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'Agente IA',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`🤖 Agente IA ejecutándose en puerto ${PORT}`);
});

module.exports = app;