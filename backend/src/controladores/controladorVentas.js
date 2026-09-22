// Registrar una venta (Simulación de Transacción ACID)
export const registrarVenta = async (req, res) => {
  try {
    const { items, metodo_pago, total, id_cajero } = req.body;

    // Validación básica de datos de entrada
    if (!items || items.length === 0 || !metodo_pago || !total) {
      return res.status(400).json({
        success: false,
        message: 'Datos incompletos. Se requieren ítems, método de pago y total.'
      });
    }

    // Aquí irá el START TRANSACTION / COMMIT / ROLLBACK con MySQL
    console.log(`[VENTA SIMULADA] Registrando venta por $${total} - Método: ${metodo_pago}`);

    res.status(201).json({
      success: true,
      message: 'Venta registrada e inventario actualizado correctamente.',
      data: {
        id_venta: Math.floor(Math.random() * 1000) + 1,
        metodo_pago,
        total,
        fecha: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Resumen del cierre del día (Requerimiento Administrador)
export const getReporteDiario = async (req, res) => {
  try {
    res.json({
      success: true,
      reporte: {
        fecha: new Date().toLocaleDateString('es-CO'),
        ventas_totales: 15,
        recaudo_efectivo: 120000,
        recaudo_transferencia: 85000,
        ingreso_total: 205000,
        producto_mas_vendido: 'Pan de Bono'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 
