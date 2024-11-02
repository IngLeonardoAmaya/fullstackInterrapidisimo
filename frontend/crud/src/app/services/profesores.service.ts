import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from '../interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private apiUrl = `${environment.apiUrl}/profesor`;

  constructor(private http: HttpClient) {}

  // Obtener todos los profesores
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  // Obtener un profesor por ID
  getProfesorById(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo profesor
  createProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, profesor);
  }

  // Actualizar un profesor
  updateProfesor(id: number, profesor: Profesor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, profesor);
  }

  // Eliminar un profesor
  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
