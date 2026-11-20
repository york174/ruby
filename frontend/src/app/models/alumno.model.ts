export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  direccion: string;
}

export type AlumnoPayload = Omit<Alumno, 'id'>;
