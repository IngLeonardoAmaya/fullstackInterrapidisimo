import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Inscripcion } from '../interfaces/inscripcion';
import { Estudiante } from '../interfaces/estudiante';
import { Materia } from '../interfaces/materia';
import { Profesor } from '../interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService 
{
  private apiUrl = `${environment.apiUrl}/Inscripcion`;  // Asegúrate que coincida con el controlador

  constructor(private http: HttpClient) { }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}`);
  }

  getInscripcionById(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`);
  }

  createInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${this.apiUrl}`, inscripcion);
  }

  updateInscripcion(id: number, inscripcion: Inscripcion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, inscripcion);
  }

  deleteInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${environment.apiUrl}/Estudiantes`);
  }

  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${environment.apiUrl}/Materia`);
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${environment.apiUrl}/Profesor`);
  }

}
