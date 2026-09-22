import { pool } from '../config/db.js';

export const obtenerTodosProductos = async () => {
    // cconst [rows] = await pool.query('SELECT * FROM productos');
    // return rows;

    return [
    {id: 1, nombre: 'Pan hojaldrado', precio: 500, stock: 30, dias_vencimiento: 4, unidad: 'unidad'},
    {id: 2, nombre: 'Pan de molde', precio: 600, stock: 20, dias_vencimiento: 5, unidad: 'unidad'},
    ]
}