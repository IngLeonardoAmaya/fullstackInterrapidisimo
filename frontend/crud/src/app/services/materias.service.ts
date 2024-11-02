import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia } from '../interfaces/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiUrl = `${environment.apiUrl}/materia`;

  constructor(private http: HttpClient) {}

  // Obtener todas las materias
  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.apiUrl);
  }

  // Obtener una materia por ID
  getMateriaById(id: number): Observable<Materia> {
    return this.http.get<Materia>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva materia
  createMateria(materia: Materia): Observable<Materia> {
    debugger;
    console.log(materia);
    return this.http.post<Materia>(this.apiUrl, materia);
  }

  // Actualizar una materia
  updateMateria(id: number, materia: Materia): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, materia);
  }

  // Eliminar una materia
  deleteMateria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
