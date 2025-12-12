# Étape 1 : build de l'app Vue 3 avec Node 22
FROM node:22-alpine AS build

# Répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Install des dépendances
RUN npm ci --omit=dev=false

# Copie du reste du code
COPY . .

# Build de l'app (Vite / Vue 3)
RUN npm run build

# Étape 2 : serveur nginx pour servir les fichiers statiques
FROM nginx:alpine

# On supprime la config par défaut (optionnel mais propre)
RUN rm /etc/nginx/conf.d/default.conf

# Si tu as un fichier nginx.conf custom pour gérer le mode history de Vue Router :
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie du build généré par Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Port exposé
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
