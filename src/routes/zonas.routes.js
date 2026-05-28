const router = require('express').Router();
const controller = require('../controllers/zonas.controller');

router.get('/', controller.obtenerZonas);
router.post('/', controller.crearZona);
router.put('/:id', controller.actualizarZona);
router.delete('/:id', controller.eliminarZona);

module.exports = router;
