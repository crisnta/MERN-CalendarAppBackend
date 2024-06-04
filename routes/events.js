/* Rutas de Usuarios / Auth
    host + /api/events
*/  
const { Router } = require('express')
const { getEventos, crearEvento, actualizarEventos, eliminarEventos } = require('../controllers/events')
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')
const router = Router()

//Validacion de jwt para todas las rutas
router.use(validarJWT)

router.get('/', getEventos)

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
] ,crearEvento)

router.put('/:id',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos],
    actualizarEventos)

router.delete('/:id', eliminarEventos)

module.exports = router