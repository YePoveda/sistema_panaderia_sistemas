import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rutaProductos from './rutas/rutaProductos.js';
import rutaVentas from './rutas/rutaVentas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());    

app.use('/api/productos', rutaProductos);
app.use('/api/ventas', rutaVentas); 

app.get('/', (req, res) => {
    res.send('Prueba Panaderia ');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

