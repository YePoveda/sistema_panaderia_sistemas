import { pool } from '../config/db.js';

export const registrarVenta = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id_cliente = 1, id_usuario = 1, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'La venta debe contener al menos un producto.' });
    }

    await connection.beginTransaction();

    let totalVenta = 0;
    for (const item of items) {
      totalVenta += item.cantidad * item.precio_unitario;
    }

    const [resultVenta] = await connection.query(
      `INSERT INTO ventas (id_cliente, id_usuario, total, estado) VALUES (?, ?, ?, 'Pagada')`,
      [id_cliente, id_usuario, totalVenta]
    );
    const idVentaInsertada = resultVenta.insertId;

    for (const item of items) {
      // Insertar renglón en detalle_venta
      const subtotal = item.cantidad * item.precio_unitario;
      await connection.query(
        `INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) 
         VALUES (?, ?, ?, ?, ?)`,
        [idVentaInsertada, item.id_producto, item.cantidad, item.precio_unitario, subtotal]
      );

      const [updateResult] = await connection.query(
        `UPDATE productos SET stock = stock - ? WHERE id_producto = ? AND stock >= ?`,
        [item.cantidad, item.id_producto, item.cantidad]
      );

      if (updateResult.affectedRows === 0) {
        throw new Error(`Stock insuficiente para el producto ID: ${item.id_producto}`);
      }
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Venta registrada con éxito e inventario actualizado.',
      data: { id_venta: idVentaInsertada, total: totalVenta }
    });

  } catch (error) {

    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

export const getReporteDiario = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(id_venta) AS total_ventas,
        IFNULL(SUM(total), 0) AS reacaudo_total
      FROM ventas 
      WHERE DATE(fecha_venta) = CURDATE() AND estado = 'Pagada'
    `);

    res.json({
      success: true,
      reporte: rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        v.id_venta,
        v.fecha_venta,
        v.total,
        v.estado,
        c.nombre AS cliente,
        u.nombre AS vendedor
      FROM ventas v
      INNER JOIN clientes c ON v.id_cliente = c.id_cliente
      INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
      ORDER BY v.fecha_venta DESC
    `);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};