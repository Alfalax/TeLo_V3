class SolicitudService {
  constructor() {
    // En un entorno real, aquí se inicializaría la conexión a la base de datos
    this.solicitudes = [];
    this.nextId = 1;
  }
  
  async obtenerSolicitudes(filtros = {}) {
    const { page = 1, limit = 10, estado, asesorId } = filtros;
    
    let solicitudesFiltradas = [...this.solicitudes];
    
    if (estado) {
      solicitudesFiltradas = solicitudesFiltradas.filter(s => s.estado === estado);
    }
    
    if (asesorId) {
      solicitudesFiltradas = solicitudesFiltradas.filter(s => s.asesorId === asesorId);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      data: solicitudesFiltradas.slice(startIndex, endIndex),
      total: solicitudesFiltradas.length,
      page,
      limit,
      totalPages: Math.ceil(solicitudesFiltradas.length / limit)
    };
  }
  
  async obtenerSolicitudPorId(id) {
    return this.solicitudes.find(s => s.id === parseInt(id));
  }
  
  async crearSolicitud(datosSolicitud) {
    const nuevaSolicitud = {
      id: this.nextId++,
      ...datosSolicitud,
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };
    
    this.solicitudes.push(nuevaSolicitud);
    
    return nuevaSolicitud;
  }
  
  async actualizarSolicitud(id, datosActualizacion) {
    const index = this.solicitudes.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      return null;
    }
    
    this.solicitudes[index] = {
      ...this.solicitudes[index],
      ...datosActualizacion,
      fechaActualizacion: new Date().toISOString()
    };
    
    return this.solicitudes[index];
  }
  
  async eliminarSolicitud(id) {
    const index = this.solicitudes.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      return false;
    }
    
    this.solicitudes.splice(index, 1);
    return true;
  }
  
  async obtenerSolicitudesPorAsesor(asesorId, filtros = {}) {
    const { page = 1, limit = 10, estado } = filtros;
    
    let solicitudesFiltradas = this.solicitudes.filter(s => s.asesorId === asesorId);
    
    if (estado) {
      solicitudesFiltradas = solicitudesFiltradas.filter(s => s.estado === estado);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      data: solicitudesFiltradas.slice(startIndex, endIndex),
      total: solicitudesFiltradas.length,
      page,
      limit,
      totalPages: Math.ceil(solicitudesFiltradas.length / limit)
    };
  }
  
  async cambiarEstado(id, nuevoEstado, observaciones = '') {
    const solicitud = await this.obtenerSolicitudPorId(id);
    
    if (!solicitud) {
      return null;
    }
    
    return await this.actualizarSolicitud(id, {
      estado: nuevoEstado,
      observaciones,
      fechaActualizacion: new Date().toISOString()
    });
  }
}

module.exports = new SolicitudService();