import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import estudiantesRoutes from './routes/estudiantesRoutes'
import profesoresRoutes from './routes/profesoresRoutes'
import cursosRoutes from './routes/cursosRoutes'
import { Request, Response } from 'express';

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

app.use('/estudiantes', estudiantesRoutes)
app.use('/profesores', profesoresRoutes)
app.use('/cursos', cursosRoutes)

app.get('/', (req: Request, resp: Response) =>{
    console.log('Hola mundo')
    resp.send('Hola mundo')
})

export default app
