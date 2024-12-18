import { Request, Response } from "express";
import { Curso } from "../models/cursoModel";
import { AppDataSource } from "../db/conexion";
import { Profesor } from "../models/profesorModel";
import { Estudiante } from "../models/estudianteModel";
class CursosController {
  constructor() {}
  async consultar(req: Request, res: Response) {
    try {
      const data = await AppDataSource.getRepository(Curso).find({relations: {profesor: true, estudiantes: true}});
       res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      }
    }
  }
  async consultarDetalle(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await AppDataSource.getRepository(Curso).findOne({ where:{ id: Number(id) }, relations: {profesor: true, estudiantes: true}});
      if (!registro) {
        throw new Error("Curso no encontrado");
      }
       res.status(200).json(registro);
    } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      }
    }
  }
  async ingresar(req: Request, res: Response) {
    try {
      const { profesor } = req.body;
      const profesorRegistro = await AppDataSource.getRepository(Profesor).findOneBy({
        id: Number(profesor),
      });
      if (!profesorRegistro) {
        throw new Error("Profesor no encontrado");
      }
      const cursoRepository = AppDataSource.getRepository(Curso);
      const nuevoCurso = cursoRepository.create(req.body);
      const data = await cursoRepository.save(nuevoCurso);

       res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      }
    }
  }

  async actualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { profesor } = req.body;
      const profesorActualizacion = await AppDataSource.getRepository(Profesor).findOneBy({
        id: Number(profesor),
      });
      if (!profesorActualizacion) {
        throw new Error("Profesor no encontrado");
      }
      const registro = await AppDataSource.getRepository(Curso).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Curso no encontrado");
      }
      await AppDataSource.getRepository(Curso).update(id, req.body);
      const registroActualizado = await AppDataSource.getRepository(
        Curso
      ).findOne({ where:{ id: Number(id) }, relations: {profesor: true, estudiantes: true}});
       res.status(200).json(registroActualizado);
    } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      }
    }
  }
  async borrar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const registro = await AppDataSource.getRepository(Curso).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Curso no encontrado");
      }
      await AppDataSource.getRepository(Curso).delete({ id: Number(id) });
       res.status(204);
    } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      }
    }
  }
  async asociarEstudiante(req: Request, res: Response){
    try {
      const {estudiante_id, curso_id} = req.body
      const estudiante = await AppDataSource.getRepository(Estudiante).findOneBy({id: Number(estudiante_id)})
      const curso = await AppDataSource.getRepository(Curso).findOneBy({id: Number(curso_id)})
      if(!curso){
        throw new Error('curso no encontrado')
      }
      if(!estudiante){
        throw new Error('Estudiante no encontrado')
      }
      curso.estudiantes = curso.estudiantes || []
      curso.estudiantes.push(estudiante)
      const cursoRepository = AppDataSource.getRepository(Curso)
      const registro = await cursoRepository.save(curso)
      res.status(200).json(registro)


    } catch (error) {
      
    }

  }
}

export default new CursosController();
