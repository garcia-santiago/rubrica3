const router = require('express').Router();
const controller = require('../controllers/participaciones.controller');

router.post('/', controller.registrarParticipacion);
router.put('/:id', controller.actualizarParticipacion);
router.delete('/:id', controller.eliminarParticipacion);

module.exports = router;
