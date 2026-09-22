const productosMock = [
    {id: 1, nombre: 'Pan hojaldrado', precio: 500, stock: 30, dias_vencimiento: 4, unidad: 'unidad'},
    {id: 2, nombre: 'Pan de molde', precio: 600, stock: 20, dias_vencimiento: 5, unidad: 'unidad'},
    {id: 3, nombre: 'Pan cuadrado', precio: 500, stock: 30, dias_vencimiento: 3, unidad: 'unidad'},
    {id: 4, nombre: 'Pan integral', precio: 700, stock: 15, dias_vencimiento: 6, unidad: 'unidad'},
];

export const getProductos = async (req, res) => {
    try {
        res.json(
            {
                success: true,
                data: productosMock
            }
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
}

export const getAlertas = async (req, res) => {
    try {
        const stockBajo = productosMock.filter(producto => producto.stock < 20);
        const productosVencidos = productosMock.filter(producto => producto.dias_vencimiento < 5);

        res.json({
            success: true,
            alertas: {
                stockBajo,
                productosVencidos
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las alertas',
            error: error.message
        });
    }
}