import { Router } from "express";
import { getProductos, getAlertas, crearProducto } from "../controladores/controladorProductos.js";

const router = Router();

router.get('/', getProductos);
router.get('/alertas', getAlertas);
router.post('/', crearProducto);

export default router;