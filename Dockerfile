# --- ETAPA 1: Construcción ---
FROM node:22-alpine AS builder

WORKDIR /app

# Cache de dependencias: solo copiamos lo necesario para npm ci
COPY package.json package-lock.json ./
RUN npm ci

# Copiamos el resto y build
COPY . .
RUN npm run build

# --- ETAPA 2: Producción ---
FROM nginx:alpine

# Copiamos los archivos compilados de Vite a la carpeta pública de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Config para SPA routing (React Router)
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
