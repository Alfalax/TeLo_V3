const Joi = require('joi');

const solicitudSchema = Joi.object({
  clienteId: Joi.number().integer().positive().required(),
  asesorId: Joi.number().integer().positive().required(),
  nombreRepuesto: Joi.string().min(3).max(200).required(),
  codigoRepuesto: Joi.string().max(50).optional(),
  lineaVehiculo: Joi.string().min(2).max(100).required(),
  anoModelo: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required(),
  marcaVehiculo: Joi.string().min(2).max(50).required(),
  descripcion: Joi.string().max(1000).optional(),
  prioridad: Joi.string().valid('baja', 'media', 'alta', 'urgente').default('media'),
  observaciones: Joi.string().max(500).optional()
});

const solicitudUpdateSchema = Joi.object({
  clienteId: Joi.number().integer().positive().optional(),
  asesorId: Joi.number().integer().positive().optional(),
  nombreRepuesto: Joi.string().min(3).max(200).optional(),
  codigoRepuesto: Joi.string().max(50).optional(),
  lineaVehiculo: Joi.string().min(2).max(100).optional(),
  anoModelo: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
  marcaVehiculo: Joi.string().min(2).max(50).optional(),
  descripcion: Joi.string().max(1000).optional(),
  prioridad: Joi.string().valid('baja', 'media', 'alta', 'urgente').optional(),
  observaciones: Joi.string().max(500).optional(),
  estado: Joi.string().valid('pendiente', 'en_proceso', 'cotizada', 'finalizada', 'cancelada').optional()
});

function validarSolicitud(data, isUpdate = false) {
  const schema = isUpdate ? solicitudUpdateSchema : solicitudSchema;
  return schema.validate(data);
}

module.exports = {
  validarSolicitud,
  solicitudSchema,
  solicitudUpdateSchema
};