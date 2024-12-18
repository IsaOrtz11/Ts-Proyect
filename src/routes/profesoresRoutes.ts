import express from 'express'
import ProfesoresController from '../controllers/profesoresController'
const router = express.Router()
// reuperar estudiantes
router.get('/', ProfesoresController.consultar)



//ingresar estudiante 
router.post('/', ProfesoresController.ingresar )


// ruta dinamica para mandar el id
router.route('/:id')
    .get( ProfesoresController.consultarDetalle)
    .put( ProfesoresController.actualizar)
    .delete( ProfesoresController.borrar)


export default router