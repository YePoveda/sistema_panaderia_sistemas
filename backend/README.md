# Documentation - API REST Panadería (Backend)

## Endpoints Disponibles

### Productos e Inventario
* `GET /api/productos`
  * Descripción: Obtiene la lista completa de productos.
* `GET /api/productos/alertas`
  * Descripción: Devuelve alertas de productos con stock crítico (<= 5) o próximos a vencer (<= 2 días)[cite: 1].

### Ventas y Transacciones
* `POST /api/ventas`
  * Descripción: Registra una venta reduciendo el inventario de forma transaccional[cite: 1].
  * Body (JSON):
    ```json
    {
      "metodo_pago": "efectivo",
      "total": 4000,
      "items": [
        { "id_producto": 1, "cantidad": 2, "precio_unitario": 2000 }
      ]
    }
    ```
* `GET /api/ventas/reporte-diario`
  * Descripción: Retorna el acumulado del día por método de pago (Efectivo/Transferencia)[cite: 1].