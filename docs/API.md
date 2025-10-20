# TeLo V3 - Documentación de API

## Core TeLo API (Puerto 3002)

### Autenticación
Todos los endpoints requieren autenticación JWT excepto los de salud.

```
Authorization: Bearer <token>
```

### Endpoints de Solicitudes

#### GET /api/solicitudes
Obtener todas las solicitudes con paginación.

**Parámetros de consulta:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)
- `estado` (opcional): Filtrar por estado
- `asesorId` (opcional): Filtrar por asesor

**Respuesta:**
```json
{
  "data": [
    {
      "id": 1,
      "clienteId": 1,
      "asesorId": 1,
      "nombreRepuesto": "Filtro de aceite",
      "codigoRepuesto": "FLT001",
      "lineaVehiculo": "Corolla",
      "anoModelo": 2020,
      "marcaVehiculo": "Toyota",
      "estado": "pendiente",
      "fechaCreacion": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

#### GET /api/solicitudes/:id
Obtener solicitud específica por ID.

#### POST /api/solicitudes
Crear nueva solicitud.

**Body:**
```json
{
  "clienteId": 1,
  "asesorId": 1,
  "nombreRepuesto": "Filtro de aceite",
  "codigoRepuesto": "FLT001",
  "lineaVehiculo": "Corolla",
  "anoModelo": 2020,
  "marcaVehiculo": "Toyota",
  "descripcion": "Filtro de aceite para mantenimiento",
  "prioridad": "media"
}
```

#### PUT /api/solicitudes/:id
Actualizar solicitud existente.

#### DELETE /api/solicitudes/:id
Eliminar solicitud.

#### PATCH /api/solicitudes/:id/estado
Cambiar estado de solicitud.

**Body:**
```json
{
  "estado": "en_proceso",
  "observaciones": "Iniciando búsqueda de proveedores"
}
```

### Endpoints de Ofertas

#### GET /api/ofertas
Obtener todas las ofertas.

#### POST /api/ofertas
Crear nueva oferta.

**Body:**
```json
{
  "solicitudId": 1,
  "proveedor": "Repuestos ABC",
  "precio": 25000,
  "tiempoEntrega": 3,
  "calidad": "original",
  "garantia": "6 meses",
  "observaciones": "Disponible inmediatamente"
}
```

### Estados de Solicitud
- `pendiente`: Solicitud recién creada
- `en_proceso`: Asesor trabajando en la solicitud
- `cotizada`: Se han generado ofertas
- `finalizada`: Proceso completado
- `cancelada`: Solicitud cancelada

### Códigos de Error
- `400`: Bad Request - Datos inválidos
- `401`: Unauthorized - Token inválido o faltante
- `404`: Not Found - Recurso no encontrado
- `500`: Internal Server Error - Error del servidor

## Agente IA API (Puerto 3001)

### Endpoints de WhatsApp

#### POST /api/whatsapp/webhook
Recibir mensajes de WhatsApp.

#### POST /api/whatsapp/send
Enviar mensaje a WhatsApp.

**Body:**
```json
{
  "to": "573001234567",
  "message": "Hola, hemos recibido tu solicitud de repuesto."
}
```

#### GET /api/whatsapp/status
Obtener estado de conexión de WhatsApp.

### Endpoints de IA

#### POST /api/ai/process
Procesar mensaje con IA.

**Body:**
```json
{
  "from": "573001234567",
  "content": "Necesito un filtro de aceite para Toyota Corolla 2020",
  "type": "text"
}
```

**Respuesta:**
```json
{
  "intent": "solicitud_repuesto",
  "data": {
    "nombreRepuesto": "filtro de aceite",
    "marcaVehiculo": "Toyota",
    "lineaVehiculo": "Corolla",
    "anoModelo": 2020
  },
  "response": "He registrado tu solicitud de filtro de aceite para Toyota Corolla 2020. Un asesor te contactará pronto.",
  "confidence": 0.95
}
```

## Health Checks

Todos los servicios exponen un endpoint de salud:

- GET /health

**Respuesta:**
```json
{
  "status": "OK",
  "service": "Core TeLo",
  "timestamp": "2024-01-15T10:30:00Z"
}
```