const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// Webhook para recibir mensajes de WhatsApp
router.post('/webhook', whatsappController.receiveMessage);

// Enviar mensaje a WhatsApp
router.post('/send', whatsappController.sendMessage);

// Estado de la conexión
router.get('/status', whatsappController.getStatus);

module.exports = router;