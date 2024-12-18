import express from 'express'
import estudiantesController from '../controllers/estudiantesController'
const router = express.Router()

// reuperar estudiantes
router.get('/', estudiantesController.consultar)

//ingresar estudiante 
router.post('/', estudiantesController.ingresar )

// ruta dinamica para mandar el id
router.route('/:id')
    .get( estudiantesController.consultarDetalle)
    .put( estudiantesController.actualizar)
    .delete( estudiantesController.borrar)



export default router