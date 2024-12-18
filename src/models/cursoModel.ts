import { UpdateDateColumn, CreateDateColumn, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Profesor } from "./profesorModel";
import { Estudiante } from "./estudianteModel";

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: String;

  @Column('text')
  descripcion: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Profesor , (profesor) => profesor.cursos)
  @JoinColumn({name: 'profesor_id'})
  profesor: Profesor

  @ManyToMany(() => Estudiante)
  @JoinTable({
    name: 'cursos_estudiantes',
    joinColumn: {name: 'curso_id'},
    inverseJoinColumn: { name: 'estudiante_id'}
  })
  estudiantes: Estudiante[]
}
