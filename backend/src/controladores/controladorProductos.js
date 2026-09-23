import { pool } from '../config/db.js';

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, p.estado, c.nombre AS categoria
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
      WHERE p.estado = 'Disponible'
    `);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAlertas = async (req, res) => {
  try {
    const [stockBajo] = await pool.query(`
      SELECT id_producto, nombre, stock, precio 
      FROM productos 
      WHERE stock <= 5 AND estado = 'Disponible'
    `);

    res.json({
      success: true,
      alertas: {
        stockBajo,
        proximosAVencer: [] 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { id_categoria, nombre, descripcion, precio, stock } = req.body;

    if (!id_categoria || !nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Por favor complete todos los campos obligatorios (categoría, nombre, precio, stock).' 
      });
    }

    const [result] = await pool.query(
      `INSERT INTO productos (id_categoria, nombre, descripcion, precio, stock, estado) 
       VALUES (?, ?, ?, ?, ?, 'Disponible')`,
      [id_categoria, nombre, descripcion || '', precio, stock]
    );

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente.',
      data: { id_producto: result.insertId, nombre, precio, stock }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
