FROM node 
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]


# Creamos el archivo de imagen de docker con: docker build -t nombre_imagen .
# con docker run -p 8081:8080 nombre_imagen
# accedemos a la aplicacion en http://localhost:8081