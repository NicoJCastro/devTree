import express from 'express'; // ESM EcmaScript Module
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
const app = express();

connectDB();

//Leer datos
app.use(express.json());

app.use('/', router); // Usamos el router que hemos creado en el archivo router.ts

export default app; // Exportamos la aplicación para poder importarla en otros archivos