const express = require('express');
const router = express.Router();
const controller = require('../controllers/observatorioController');

router.get('/empresas', controller.getEmpresas);
router.get('/estadisticas', controller.getEstadisticas);
router.get('/noticias', controller.getNoticias);

module.exports = router;
