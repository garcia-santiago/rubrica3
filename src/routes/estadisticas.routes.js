const router = require('express').Router();
const controller = require('../controllers/estadisticas.controller');

router.get('/horas', controller.obtenerHoras);
router.get('/zonas', controller.obtenerParticipacionZonas);

module.exports = router;