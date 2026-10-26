import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './config/db.js';
import rutaProductos from './rutas/rutaProductos.js';
import rutaVentas from './rutas/rutaVentas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

// Middleware para evitar la pantalla de advertencia de Ngrok
app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});

// ==========================================
// CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS
// ==========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apunta a la subcarpeta 'paginas' dentro de 'frontend'
const rutaFrontend = path.resolve(__dirname, '../../frontend/paginas');

console.log('📂 Sirviendo páginas desde:', rutaFrontend);

app.use(express.static(rutaFrontend));

// ==========================================
// 1. RUTAS DE LA API
// ==========================================

app.use('/api/productos', rutaProductos);
app.use('/api/ventas', rutaVentas); 

// Endpoint de Login
app.post('/api/login', async (req, res) => {
  const { correo, contraseña } = req.body || {};

  if (!correo || !contraseña) {
    return res.status(400).json({ success: false, message: 'Faltan credenciales' });
  }

  try {
    const query = `
      SELECT u.id_usuario, u.nombre, u.apellido, u.correo, u.contraseña, u.estado, r.nombre AS nombre_rol
      FROM usuarios u
      INNER JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.correo = ? AND u.estado = 'Activo'
    `;

    const [results] = await pool.query(query, [correo]);

    if (!results || results.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado o inactivo' });
    }

    const usuario = results[0];

    if (usuario.contraseña !== contraseña) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    res.json({
      success: true,
      data: {
        id_usuario: usuario.id_usuario,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        rol: usuario.nombre_rol
      }
    });

  } catch (err) {
    console.error('❌ Error de MySQL en /api/login:', err);
    res.status(500).json({ success: false, message: 'Error en la base de datos: ' + err.message });
  }
});

// Endpoint de Registro (Cliente id_rol = 2)
app.post('/api/registro', async (req, res) => {
  const { nombre, apellido, documento, correo, telefono, contraseña } = req.body || {};

  if (!nombre || !apellido || !documento || !correo || !contraseña) {
    return res.status(400).json({ success: false, message: 'Por favor complete todos los campos obligatorios.' });
  }

  try {
    const [existentes] = await pool.query(
      'SELECT id_usuario FROM usuarios WHERE correo = ? OR documento = ?',
      [correo, documento]
    );

    if (existentes && existentes.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'El correo electrónico o número de documento ya se encuentra registrado.' 
      });
    }

    const ID_ROL_CLIENTE = 2;

    const queryInsert = `
      INSERT INTO usuarios (id_rol, nombre, apellido, documento, correo, telefono, contraseña, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Activo')
    `;

    await pool.query(queryInsert, [
      ID_ROL_CLIENTE,
      nombre,
      apellido,
      documento,
      correo,
      telefono || null,
      contraseña
    ]);

    res.status(201).json({
      success: true,
      message: 'Usuario cliente registrado correctamente.'
    });

  } catch (err) {
    console.error('❌ Error en /api/registro:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error en la base de datos: ' + err.message 
    });
  }
});

// Redirección automática a la vista de login al ingresar a la raíz
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// ==========================================
// 2. ENCENDER SERVIDOR
// ==========================================

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});