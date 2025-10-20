const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.initialize();
  }
  
  initialize() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });
    
    this.client.on('qr', (qr) => {
      console.log('📱 Escanea el código QR:');
      qrcode.generate(qr, { small: true });
    });
    
    this.client.on('ready', () => {
      console.log('✅ WhatsApp conectado exitosamente');
      this.isReady = true;
    });
    
    this.client.on('message', async (message) => {
      // Los mensajes se procesan a través del webhook
      console.log(`📨 Mensaje recibido: ${message.body}`);
    });
    
    this.client.initialize();
  }
  
  async sendMessage(to, message) {
    if (!this.isReady) {
      throw new Error('WhatsApp no está conectado');
    }
    
    try {
      const chatId = to.includes('@c.us') ? to : `${to}@c.us`;
      await this.client.sendMessage(chatId, message);
      console.log(`✅ Mensaje enviado a ${to}`);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      throw error;
    }
  }
  
  async getConnectionStatus() {
    return {
      connected: this.isReady,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new WhatsAppService();