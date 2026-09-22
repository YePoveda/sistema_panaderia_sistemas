import { pool } from '../config/db.js';

export const procesarVentaTransaccional = async (datosVenta) => {

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();

    // const [resultVenta] = await connection.query(
    //   'INSERT INTO ventas (metodo_pago, total, fecha) VALUES (?, ?, NOW())',
    //   [datosVenta.metodo_pago, datosVenta.total]
    // );
    // const idVenta = resultVenta.insertId;

    // for (const item of datosVenta.items) {
    //   await connection.query(
    //     'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
    //     [item.cantidad, item.id_producto, item.cantidad]
    //   );
    // }


    await connection.commit();
    return { success: true, message: 'Transacción completada exitosamente.' };

  } catch (error) {

    await connection.rollback();
    throw error;
  } finally {

    connection.release();
  }
};