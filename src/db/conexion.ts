
import { DataSource } from "typeorm"
import { Profesor } from "../models/profesorModel"
import { Estudiante } from "../models/estudianteModel"
import { Curso } from "../models/cursoModel"
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "cursos",
    logging: true,
    entities: [Estudiante, Profesor, Curso],
    synchronize: false,
    subscribers: [],
    migrations: [],
})