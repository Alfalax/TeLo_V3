const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

// Obtener todas las solicitudes
router.get('/', solicitudController.obtenerSolicitudes);

// Obtener solicitud por ID
router.get('/:id', solicitudController.obtenerSolicitudPorId);

// Crear nueva solicitud
router.post('/', solicitudController.crearSolicitud);

// Actualizar solicitud
router.put('/:id', solicitudController.actualizarSolicitud);

// Eliminar solicitud
router.delete('/:id', solicitudController.eliminarSolicitud);

// Obtener solicitudes por asesor
router.get('/asesor/:asesorId', solicitudController.obtenerSolicitudesPorAsesor);

// Cambiar estado de solicitud
router.patch('/:id/estado', solicitudController.cambiarEstado);

module.exports = router;