import express from 'express'; // ESM EcmaScript Module
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
import { corsOptions } from './config/cors';
connectDB();
const app = express();

//Cors
app.use(cors(corsOptions));


//Leer datos
app.use(express.json());

app.use('/', router); // Usamos el router que hemos creado en el archivo router.ts

export default app; // Exportamos la aplicación para poder importarla en otros archivos