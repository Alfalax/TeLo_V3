const whatsappService = require('../services/whatsappService');
const aiService = require('../services/aiService');
const solicitudService = require('../services/solicitudService');

class WhatsAppController {
  async receiveMessage(req, res) {
    try {
      const { from, body, type, mediaUrl } = req.body;
      
      console.log(`📱 Mensaje recibido de ${from}: ${body}`);
      
      // Procesar mensaje con IA
      const processedMessage = await aiService.processMessage({
        from,
        content: body,
        type,
        mediaUrl
      });
      
      // Si es una solicitud de repuesto, crear solicitud
      if (processedMessage.intent === 'solicitud_repuesto') {
        await solicitudService.createSolicitud(processedMessage.data);
      }
      
      // Enviar respuesta
      await whatsappService.sendMessage(from, processedMessage.response);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error procesando mensaje:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async sendMessage(req, res) {
    try {
      const { to, message } = req.body;
      
      await whatsappService.sendMessage(to, message);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async getStatus(req, res) {
    try {
      const status = await whatsappService.getConnectionStatus();
      res.status(200).json(status);
    } catch (error) {
      console.error('Error obteniendo estado:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new WhatsAppController();