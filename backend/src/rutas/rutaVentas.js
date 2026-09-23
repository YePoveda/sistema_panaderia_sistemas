import { Router } from 'express';
import { registrarVenta, getReporteDiario } from '../controladores/controladorVentas.js';

const router = Router();

router.post('/', registrarVenta);
router.get('/reporte-diario', getReporteDiario);

export default router;