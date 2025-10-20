FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Crear usuario no root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S core-telo -u 1001

# Cambiar permisos
RUN chown -R core-telo:nodejs /app
USER core-telo

EXPOSE 3002

CMD ["npm", "start"]