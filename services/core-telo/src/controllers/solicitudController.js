const solicitudService = require('../services/solicitudService');
const { validarSolicitud } = require('../validators/solicitudValidator');

class SolicitudController {
  async obtenerSolicitudes(req, res) {
    try {
      const { page = 1, limit = 10, estado, asesorId } = req.query;
      
      const solicitudes = await solicitudService.obtenerSolicitudes({
        page: parseInt(page),
        limit: parseInt(limit),
        estado,
        asesorId
      });
      
      res.status(200).json(solicitudes);
    } catch (error) {
      console.error('Error obteniendo solicitudes:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async obtenerSolicitudPorId(req, res) {
    try {
      const { id } = req.params;
      
      const solicitud = await solicitudService.obtenerSolicitudPorId(id);
      
      if (!solicitud) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
      }
      
      res.status(200).json(solicitud);
    } catch (error) {
      console.error('Error obteniendo solicitud:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async crearSolicitud(req, res) {
    try {
      const { error, value } = validarSolicitud(req.body);
      
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      const solicitud = await solicitudService.crearSolicitud(value);
      
      res.status(201).json(solicitud);
    } catch (error) {
      console.error('Error creando solicitud:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async actualizarSolicitud(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = validarSolicitud(req.body, true);
      
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      
      const solicitud = await solicitudService.actualizarSolicitud(id, value);
      
      if (!solicitud) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
      }
      
      res.status(200).json(solicitud);
    } catch (error) {
      console.error('Error actualizando solicitud:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async eliminarSolicitud(req, res) {
    try {
      const { id } = req.params;
      
      const eliminada = await solicitudService.eliminarSolicitud(id);
      
      if (!eliminada) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
      }
      
      res.status(200).json({ message: 'Solicitud eliminada exitosamente' });
    } catch (error) {
      console.error('Error eliminando solicitud:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async obtenerSolicitudesPorAsesor(req, res) {
    try {
      const { asesorId } = req.params;
      const { page = 1, limit = 10, estado } = req.query;
      
      const solicitudes = await solicitudService.obtenerSolicitudesPorAsesor(asesorId, {
        page: parseInt(page),
        limit: parseInt(limit),
        estado
      });
      
      res.status(200).json(solicitudes);
    } catch (error) {
      console.error('Error obteniendo solicitudes por asesor:', error);
      res.status(500).json({ error: error.message });
    }
  }
  
  async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado, observaciones } = req.body;
      
      const solicitud = await solicitudService.cambiarEstado(id, estado, observaciones);
      
      if (!solicitud) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
      }
      
      res.status(200).json(solicitud);
    } catch (error) {
      console.error('Error cambiando estado:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SolicitudController();