import express from 'express'
import cursosController from '../controllers/cursosController'
const router = express.Router()
// reuperar estudiantes
router.get('/', cursosController.consultar)



//ingresar estudiante 
router.post('/', cursosController.ingresar )
router.post('/registraEstudiante', cursosController.asociarEstudiante )


// ruta dinamica para mandar el id
router.route('/:id')
    .get( cursosController.consultarDetalle)
    .put( cursosController.actualizar)
    .delete( cursosController.borrar)



export default router