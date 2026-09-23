import { Router } from 'express';
import { registrarVenta, getReporteDiario, getVentas } from '../controladores/controladorVentas.js';

const router = Router();

router.get('/', getVentas);
router.post('/', registrarVenta);
router.get('/reporte-diario', getReporteDiario);

export default router;
