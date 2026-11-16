export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
}

export type AlumnoPayload = Omit<Alumno, 'id'>;
