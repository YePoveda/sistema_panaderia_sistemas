import { Router } from "express";
import { getProductos, getAlertas } from "../controladores/controladorProductos.js";

const router = Router();

router.get('/', getProductos);
router.get('/alertas', getAlertas);

export default router;