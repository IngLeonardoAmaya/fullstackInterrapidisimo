import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService 
{
  private apiUrl = `${environment.apiUrl}/estudiantes`; 

  constructor(private http: HttpClient) {}

   // Obtener todos los estudiantes
   getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

   // Obtener un estudiante por ID
   getEstudianteById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`);
  }


  // Crear un nuevo estudiante
  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, estudiante);
  }

  // Actualizar un estudiante
  updateEstudiante(id: number, estudiante: Estudiante): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, estudiante);
  }

  // Eliminar un estudiante
  deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
