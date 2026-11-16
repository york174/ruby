import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno, AlumnoPayload } from '../models/alumno.model';

@Injectable({ providedIn: 'root' })
export class AlumnosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/alumnos';

  obtenerTodos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  crear(alumno: AlumnoPayload): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, { alumno });
  }

  actualizar(id: number, alumno: AlumnoPayload): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, { alumno });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
