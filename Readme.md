https://hub.docker.com/repository/docker/enriialegre/login-usuarios/general

# 🐶 Adoptame - Backend API

**Adoptame** es una aplicación web que permite gestionar adopciones de mascotas. Esta API fue desarrollada con Node.js, Express y MongoDB.

---

## 📁 Estructura del proyecto

```
backend3-main/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   └── app.js
├── test/
│   └── adoptions.test.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Mocha, Chai y Supertest para testing

---

## 🔐 Autenticación

La API utiliza JWT para proteger rutas. Se requiere enviar el token en el header:

```
Authorization: Bearer <token>
```

Podés obtener el token iniciando sesión en `/api/sessions/login`.

---

## 📌 Endpoints principales

### 🐾 Adopciones

- `GET /api/adoptions/`: Devuelve todas las adopciones.
- `GET /api/adoptions/:aid`: Devuelve una adopción por ID.
- `POST /api/adoptions/:uid/:pid`: Crea una nueva adopción para el usuario y la mascota.
- `DELETE /api/adoptions/:aid`: Elimina una adopción por ID.

### 👤 Usuarios

- `POST /api/sessions/register`: Crea un nuevo usuario.
- `POST /api/sessions/login`: Inicia sesión y devuelve el token JWT.
- `GET /api/users/:uid`: Devuelve datos del usuario autenticado.

---

## ✅ Tests

Para correr los tests:

```bash
npm run test
```

Tests implementados:

- Obtener todas las adopciones
- Obtener una adopción específica
- Manejo de IDs inválidos
- Crear una adopción válida
- Fallo al crear adopciones con datos inválidos

---

## 🔧 Variables de entorno

En el archivo `.env`:

```
PORT=8080
MONGO_URL=mongodb://localhost:27017/adoptame
JWT_SECRET=claveSuperSecreta
```

---

## 📌 Consideraciones

- Una mascota no puede ser adoptada más de una vez.
- Solo usuarios registrados y autenticados pueden adoptar.
- Las adopciones están relacionadas con usuarios y mascotas en la base de datos.

---
s