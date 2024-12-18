import { Request, Response } from "express";
import { Estudiante } from "../models/estudianteModel";
import { AppDataSource } from "../db/conexion";
class EstudiantesController {
  constructor() {

  }
  async consultar(req: Request, res: Response) {
    try {
      const data = await AppDataSource.getRepository(Estudiante).find({});
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
      const registro = await AppDataSource.getRepository(Estudiante).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Estudiante no encontrado");
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
      const estudianteRepository = AppDataSource.getRepository(Estudiante);
      const nuevoEstudiante = estudianteRepository.create(req.body);
      const data = await estudianteRepository.save(nuevoEstudiante);

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
      const registro = await AppDataSource.getRepository(Estudiante).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Estudiante no encontrado");
      }
      await AppDataSource.getRepository(Estudiante).update(id, req.body);
      const registroActualizado = await AppDataSource.getRepository(
        Estudiante
      ).findOneBy({ id: Number(id) });
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
      const registro = await AppDataSource.getRepository(Estudiante).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Estudiante no encontrado");
      }
      await AppDataSource.getRepository(Estudiante).delete({ id: Number(id) });
       res.status(204);
    } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      }
    }
  }
}

export default new EstudiantesController();
