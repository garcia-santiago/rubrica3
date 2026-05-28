const router = require('express').Router();
const controller = require('../controllers/tareas.controller');

router.get('/', controller.obtenerTareas);
router.post('/', controller.crearTarea);
router.put('/:id', controller.actualizarTarea);
router.delete('/:id', controller.eliminarTarea);

module.exports = router;
