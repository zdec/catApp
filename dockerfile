# Etapa de construcción
FROM node:18 AS build

# Define el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación en modo producción
RUN npm run build --prod --output-path=dist/cat-app

# Etapa de producción
FROM nginx:latest

# Copia los archivos construidos a la carpeta de Nginx
COPY --from=build /app/dist/cat-app /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["ng serve", "main.ts", "-g", "daemon off;"]

