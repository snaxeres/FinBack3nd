import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://Enrialegre:Metamorfos1s@cluster0.oldnu.mongodb.net/Backend3FinalAltaClase?retryWrites=true&w=majority&appName=Cluster0`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Pet Adoption API',
            version: '1.0.0',
            description: 'API for managing pet adoptions',
        },
    },
    apis: ["./src/docs/**/*.yaml"]
}

const specs = swaggerJsDoc(swaggerOptions);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs));