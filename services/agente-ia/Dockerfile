FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema para Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Configurar Puppeteer para usar Chromium instalado
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Crear usuario no root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S agente-ia -u 1001

# Cambiar permisos
RUN chown -R agente-ia:nodejs /app
USER agente-ia

EXPOSE 3001

CMD ["npm", "start"]