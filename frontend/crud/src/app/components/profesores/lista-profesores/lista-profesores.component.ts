import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../interfaces/profesor';
import { ProfesoresService } from '../../../services/profesores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrl: './lista-profesores.component.css'
})
export class ListaProfesoresComponent implements OnInit {
  profesores: Profesor[] = [];  // Lista de profesores

  constructor(private profesorService: ProfesoresService) {}

  ngOnInit(): void {
    this.obtenerProfesores();
  }

  // Método para obtener todos los profesores
  obtenerProfesores(): void {
    this.profesorService.getProfesores().subscribe(
      (data) => {
        this.profesores = data;
      },
      (error) => {
        console.error('Error al obtener profesores:', error);
      }
    );
  }

  // Método para eliminar un profesor
  eliminarProfesor(id: any): void {
    Swal.fire({
      title: "¿Eliminar?",
      text: "¿Está seguro de que desea eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesorService.deleteProfesor(id).subscribe(
          () => {
            this.profesores = this.profesores.filter(prof => prof.id !== id);
            Swal.fire({
              title: "Eliminado!",
              text: "El registro ha sido eliminado.",
              icon: "success"
            });
          },
          (error) => {
            console.error('Error al eliminar profesor:', error);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar el registro. Inténtelo de nuevo.",
              icon: "error"
            });
          }
        );
      }
    });
  }
}
