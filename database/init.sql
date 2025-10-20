-- Crear base de datos TeLo V3
CREATE DATABASE IF NOT EXISTS telo_v3;
USE telo_v3;

-- Tabla de usuarios (asesores)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol ENUM('asesor', 'admin') DEFAULT 'asesor',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    ciudad VARCHAR(50),
    direccion TEXT,
    whatsapp VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de solicitudes
CREATE TABLE solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    asesor_id INT NOT NULL,
    nombre_repuesto VARCHAR(200) NOT NULL,
    codigo_repuesto VARCHAR(50),
    linea_vehiculo VARCHAR(100) NOT NULL,
    ano_modelo YEAR NOT NULL,
    marca_vehiculo VARCHAR(50) NOT NULL,
    descripcion TEXT,
    estado ENUM('pendiente', 'en_proceso', 'cotizada', 'finalizada', 'cancelada') DEFAULT 'pendiente',
    prioridad ENUM('baja', 'media', 'alta', 'urgente') DEFAULT 'media',
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (asesor_id) REFERENCES usuarios(id)
);

-- Tabla de ofertas
CREATE TABLE ofertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    proveedor VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    tiempo_entrega INT, -- días
    calidad ENUM('original', 'alterno', 'usado') NOT NULL,
    garantia VARCHAR(100),
    observaciones TEXT,
    estado ENUM('pendiente', 'aceptada', 'rechazada', 'vencida') DEFAULT 'pendiente',
    fecha_vencimiento DATETIME,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id)
);

-- Tabla de repuestos (catálogo)
CREATE TABLE repuestos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    marca VARCHAR(50),
    precio_referencia DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de historial de estados
CREATE TABLE historial_estados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitud_id INT NOT NULL,
    estado_anterior VARCHAR(50),
    estado_nuevo VARCHAR(50) NOT NULL,
    observaciones TEXT,
    usuario_id INT,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Insertar datos de prueba
INSERT INTO usuarios (nombre, email, password_hash, telefono, rol) VALUES
('Juan Pérez', 'juan.perez@telo.com', '$2b$10$example_hash', '3001234567', 'asesor'),
('María García', 'maria.garcia@telo.com', '$2b$10$example_hash', '3007654321', 'asesor'),
('Admin TeLo', 'admin@telo.com', '$2b$10$example_hash', '3009876543', 'admin');

INSERT INTO clientes (nombre, telefono, email, ciudad, whatsapp) VALUES
('Carlos Rodríguez', '3101234567', 'carlos@email.com', 'Bogotá', '3101234567'),
('Ana López', '3207654321', 'ana@email.com', 'Medellín', '3207654321'),
('Luis Martínez', '3159876543', 'luis@email.com', 'Cali', '3159876543');

INSERT INTO repuestos (codigo, nombre, descripcion, categoria, marca, precio_referencia) VALUES
('FLT001', 'Filtro de Aceite', 'Filtro de aceite para motor', 'Filtros', 'Toyota', 25000),
('BRK001', 'Pastillas de Freno', 'Pastillas de freno delanteras', 'Frenos', 'Chevrolet', 85000),
('SPK001', 'Bujías', 'Juego de bujías de encendido', 'Motor', 'NGK', 45000);