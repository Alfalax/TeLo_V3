const request = require('supertest');
const app = require('../src/index');

describe('Core TeLo API', () => {
  describe('Health Check', () => {
    test('GET /health should return 200', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('service', 'Core TeLo');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
  
  describe('Solicitudes API', () => {
    test('GET /api/solicitudes should return solicitudes list', async () => {
      const response = await request(app)
        .get('/api/solicitudes')
        .expect(200);
      
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page');
      expect(response.body).toHaveProperty('limit');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
    
    test('POST /api/solicitudes should create new solicitud', async () => {
      const nuevaSolicitud = {
        clienteId: 1,
        asesorId: 1,
        nombreRepuesto: 'Filtro de aceite test',
        lineaVehiculo: 'Corolla',
        anoModelo: 2020,
        marcaVehiculo: 'Toyota'
      };
      
      const response = await request(app)
        .post('/api/solicitudes')
        .send(nuevaSolicitud)
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body.nombreRepuesto).toBe(nuevaSolicitud.nombreRepuesto);
      expect(response.body.estado).toBe('pendiente');
    });
    
    test('GET /api/solicitudes/:id should return specific solicitud', async () => {
      // Primero crear una solicitud
      const nuevaSolicitud = {
        clienteId: 1,
        asesorId: 1,
        nombreRepuesto: 'Pastillas de freno test',
        lineaVehiculo: 'Civic',
        anoModelo: 2019,
        marcaVehiculo: 'Honda'
      };
      
      const createResponse = await request(app)
        .post('/api/solicitudes')
        .send(nuevaSolicitud);
      
      const solicitudId = createResponse.body.id;
      
      // Luego obtenerla por ID
      const response = await request(app)
        .get(`/api/solicitudes/${solicitudId}`)
        .expect(200);
      
      expect(response.body.id).toBe(solicitudId);
      expect(response.body.nombreRepuesto).toBe(nuevaSolicitud.nombreRepuesto);
    });
    
    test('PUT /api/solicitudes/:id should update solicitud', async () => {
      // Crear solicitud
      const nuevaSolicitud = {
        clienteId: 1,
        asesorId: 1,
        nombreRepuesto: 'Bujías test',
        lineaVehiculo: 'Aveo',
        anoModelo: 2018,
        marcaVehiculo: 'Chevrolet'
      };
      
      const createResponse = await request(app)
        .post('/api/solicitudes')
        .send(nuevaSolicitud);
      
      const solicitudId = createResponse.body.id;
      
      // Actualizar
      const datosActualizacion = {
        ...nuevaSolicitud,
        descripcion: 'Descripción actualizada',
        prioridad: 'alta'
      };
      
      const response = await request(app)
        .put(`/api/solicitudes/${solicitudId}`)
        .send(datosActualizacion)
        .expect(200);
      
      expect(response.body.descripcion).toBe('Descripción actualizada');
      expect(response.body.prioridad).toBe('alta');
    });
    
    test('PATCH /api/solicitudes/:id/estado should change estado', async () => {
      // Crear solicitud
      const nuevaSolicitud = {
        clienteId: 1,
        asesorId: 1,
        nombreRepuesto: 'Amortiguador test',
        lineaVehiculo: 'Spark',
        anoModelo: 2021,
        marcaVehiculo: 'Chevrolet'
      };
      
      const createResponse = await request(app)
        .post('/api/solicitudes')
        .send(nuevaSolicitud);
      
      const solicitudId = createResponse.body.id;
      
      // Cambiar estado
      const response = await request(app)
        .patch(`/api/solicitudes/${solicitudId}/estado`)
        .send({
          estado: 'en_proceso',
          observaciones: 'Iniciando búsqueda'
        })
        .expect(200);
      
      expect(response.body.estado).toBe('en_proceso');
      expect(response.body.observaciones).toBe('Iniciando búsqueda');
    });
    
    test('DELETE /api/solicitudes/:id should delete solicitud', async () => {
      // Crear solicitud
      const nuevaSolicitud = {
        clienteId: 1,
        asesorId: 1,
        nombreRepuesto: 'Llanta test',
        lineaVehiculo: 'Logan',
        anoModelo: 2017,
        marcaVehiculo: 'Renault'
      };
      
      const createResponse = await request(app)
        .post('/api/solicitudes')
        .send(nuevaSolicitud);
      
      const solicitudId = createResponse.body.id;
      
      // Eliminar
      await request(app)
        .delete(`/api/solicitudes/${solicitudId}`)
        .expect(200);
      
      // Verificar que no existe
      await request(app)
        .get(`/api/solicitudes/${solicitudId}`)
        .expect(404);
    });
  });
  
  describe('Validation Tests', () => {
    test('POST /api/solicitudes should validate required fields', async () => {
      const solicitudIncompleta = {
        clienteId: 1,
        // Faltan campos requeridos
      };
      
      const response = await request(app)
        .post('/api/solicitudes')
        .send(solicitudIncompleta)
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });
    
    test('POST /api/solicitudes should validate data types', async () => {
      const solicitudInvalida = {
        clienteId: 'invalid', // Debe ser número
        asesorId: 1,
        nombreRepuesto: 'Test',
        lineaVehiculo: 'Test',
        anoModelo: 'invalid', // Debe ser número
        marcaVehiculo: 'Test'
      };
      
      const response = await request(app)
        .post('/api/solicitudes')
        .send(solicitudInvalida)
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });
  });
});