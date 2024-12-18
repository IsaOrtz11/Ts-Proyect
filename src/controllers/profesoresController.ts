import { Request, Response } from "express";
import { Profesor } from "../models/profesorModel";
import { AppDataSource } from "../db/conexion";
class ProfesoresController {
  constructor() {

  }
  async consultar(req: Request, res: Response) {
    try {
      const data = await AppDataSource.getRepository(Profesor).find({});
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
      const registro = await AppDataSource.getRepository(Profesor).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Profesor no encontrado");
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
      const profesorRepository = AppDataSource.getRepository(Profesor);
      const nuevoProfesor = profesorRepository.create(req.body);
      const data = await profesorRepository.save(nuevoProfesor);

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
      const registro = await AppDataSource.getRepository(Profesor).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Profesor no encontrado");
      }
      await AppDataSource.getRepository(Profesor).update(id, req.body);
      const registroActualizado = await AppDataSource.getRepository(
        Profesor
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
      const registro = await AppDataSource.getRepository(Profesor).findOneBy({
        id: Number(id),
      });
      if (!registro) {
        throw new Error("Profesor no encontrado");
      }
      await AppDataSource.getRepository(Profesor).delete({ id: Number(id) });
       res.status(204);
    } catch (error) {
      if (error instanceof Error) {
         res.status(500).send(error.message);
      }
    }
  }
}

export default new ProfesoresController();
