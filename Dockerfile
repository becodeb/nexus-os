# ---- Build Stage ----
FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install && \
    npm install "lightningcss-linux-$(uname -m | sed 's/x86_64/x64/' | sed 's/aarch64/arm64/')-gnu" --no-save --no-audit --no-fund

COPY . .
RUN npm run build

# ---- Runtime Stage ----
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
