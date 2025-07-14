# Étape 1 : build Vite
FROM node:18 AS builder
WORKDIR /app

# Installation des dépendances
COPY package*.json ./

RUN npm install

# Copie des fichiers source
COPY . .

RUN npm run build

# Étape 2 : serveur NGINX
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
