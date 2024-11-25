// Dependências
import express from 'express';
import cors from 'cors';
import router from "./controllers/routes.js";
import swaggerUi from 'swagger-ui-express';
import {specs} from './lib/swaggerDocument.js';
// Configuração do express
const app = express();
const port = 3001; // Porta do servidor

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', router)

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}/`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

///////////////////////////////////////////////////////////////////////////////////////////
//FERREIRA NAO APAGA ISSO É O BACK DO CHAT
import { WebSocketServer } from 'ws'
import dotenv from "dotenv"

dotenv.config()

const wss = new WebSocketServer({ port: 3002 })

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()))
    })

    console.log("client connected")
})
///////////////////////////////////////////////////////////////////////////
//BACKEND DA API PAGAMENTO

