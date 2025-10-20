const OpenAI = require('openai');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  async processMessage(messageData) {
    try {
      const { from, content, type } = messageData;
      
      // Prompt para procesar solicitudes de repuestos
      const prompt = `
        Eres un asistente especializado en solicitudes de repuestos automotrices.
        Analiza el siguiente mensaje y extrae la información relevante:
        
        Mensaje: "${content}"
        
        Si es una solicitud de repuesto, extrae:
        - Nombre del repuesto
        - Código del repuesto (si se menciona)
        - Línea de vehículo
        - Año del modelo
        - Marca del vehículo
        - Datos del cliente (nombre, ciudad, dirección si se mencionan)
        
        Responde en formato JSON con:
        {
          "intent": "solicitud_repuesto" | "consulta_general" | "pqr",
          "data": { datos extraídos },
          "response": "respuesta amigable para el cliente",
          "confidence": 0.0-1.0
        }
      `;
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      });
      
      const result = JSON.parse(completion.choices[0].message.content);
      
      return {
        intent: result.intent,
        data: result.data,
        response: result.response,
        confidence: result.confidence
      };
      
    } catch (error) {
      console.error('Error procesando con IA:', error);
      return {
        intent: 'error',
        data: {},
        response: 'Disculpa, no pude procesar tu mensaje. ¿Podrías intentar de nuevo?',
        confidence: 0
      };
    }
  }
  
  async generateResponse(context, userMessage) {
    try {
      const prompt = `
        Contexto: ${JSON.stringify(context)}
        Mensaje del usuario: ${userMessage}
        
        Genera una respuesta amigable y profesional para el cliente.
      `;
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 200
      });
      
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generando respuesta:', error);
      return 'Gracias por tu mensaje. Te responderemos pronto.';
    }
  }
}

module.exports = new AIService();