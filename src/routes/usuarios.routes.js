const router = require('express').Router();
const controller = require('../controllers/usuarios.controller');

router.get('/', controller.obtenerUsuarios);
router.get('/:id', controller.obtenerUsuario);
router.put('/:id', controller.actualizarUsuario);
router.delete('/:id', controller.eliminarUsuario);

module.exports = router;
