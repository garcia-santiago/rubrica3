const router = require('express').Router();
const controller = require('../controllers/bitacora.controller');

router.get('/usuarios/:id_usuario', controller.obtenerBitacoraUsuario);
router.get('/usuarios/:id_usuario/resumen', controller.obtenerResumenBitacoraUsuario);

module.exports = router;
