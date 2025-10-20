const aiService = require('../src/services/aiService');

// Mock OpenAI
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn()
        }
      }
    }))
  };
});

describe('AI Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('processMessage', () => {
    test('should process solicitud de repuesto correctly', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'solicitud_repuesto',
              data: {
                nombreRepuesto: 'filtro de aceite',
                marcaVehiculo: 'Toyota',
                lineaVehiculo: 'Corolla',
                anoModelo: 2020
              },
              response: 'He registrado tu solicitud de filtro de aceite.',
              confidence: 0.95
            })
          }
        }]
      };
      
      const OpenAI = require('openai');
      const mockCreate = OpenAI().chat.completions.create;
      mockCreate.mockResolvedValue(mockResponse);
      
      const messageData = {
        from: '573001234567',
        content: 'Necesito un filtro de aceite para Toyota Corolla 2020',
        type: 'text'
      };
      
      const result = await aiService.processMessage(messageData);
      
      expect(result.intent).toBe('solicitud_repuesto');
      expect(result.data.nombreRepuesto).toBe('filtro de aceite');
      expect(result.data.marcaVehiculo).toBe('Toyota');
      expect(result.confidence).toBe(0.95);
    });
    
    test('should handle consulta general', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'consulta_general',
              data: {},
              response: '¿En qué puedo ayudarte hoy?',
              confidence: 0.8
            })
          }
        }]
      };
      
      const OpenAI = require('openai');
      const mockCreate = OpenAI().chat.completions.create;
      mockCreate.mockResolvedValue(mockResponse);
      
      const messageData = {
        from: '573001234567',
        content: 'Hola, ¿cómo están?',
        type: 'text'
      };
      
      const result = await aiService.processMessage(messageData);
      
      expect(result.intent).toBe('consulta_general');
      expect(result.response).toBe('¿En qué puedo ayudarte hoy?');
    });
    
    test('should handle API errors gracefully', async () => {
      const OpenAI = require('openai');
      const mockCreate = OpenAI().chat.completions.create;
      mockCreate.mockRejectedValue(new Error('API Error'));
      
      const messageData = {
        from: '573001234567',
        content: 'Test message',
        type: 'text'
      };
      
      const result = await aiService.processMessage(messageData);
      
      expect(result.intent).toBe('error');
      expect(result.confidence).toBe(0);
      expect(result.response).toContain('no pude procesar');
    });
  });
  
  describe('generateResponse', () => {
    test('should generate contextual response', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'Gracias por tu consulta. Te ayudaremos pronto.'
          }
        }]
      };
      
      const OpenAI = require('openai');
      const mockCreate = OpenAI().chat.completions.create;
      mockCreate.mockResolvedValue(mockResponse);
      
      const context = {
        clienteId: 1,
        solicitudesAnteriores: 3
      };
      
      const userMessage = '¿Cuándo estará listo mi pedido?';
      
      const result = await aiService.generateResponse(context, userMessage);
      
      expect(result).toBe('Gracias por tu consulta. Te ayudaremos pronto.');
      expect(mockCreate).toHaveBeenCalledWith({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: expect.stringContaining(userMessage) }],
        temperature: 0.7,
        max_tokens: 200
      });
    });
    
    test('should handle generation errors', async () => {
      const OpenAI = require('openai');
      const mockCreate = OpenAI().chat.completions.create;
      mockCreate.mockRejectedValue(new Error('Generation Error'));
      
      const result = await aiService.generateResponse({}, 'Test message');
      
      expect(result).toBe('Gracias por tu mensaje. Te responderemos pronto.');
    });
  });
});