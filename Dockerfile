FROM node:18

WORKDIR /app

# Copie d'abord les fichiers de dépendances pour optimiser le cache
COPY package*.json ./

RUN npm install

# Puis copie le reste du projet
COPY . .

EXPOSE 5173

CMD ["npm", "run", "build", "--", "--host"]
