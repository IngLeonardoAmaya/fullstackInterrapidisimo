import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../../interfaces/estudiante';
import { EstudiantesService } from '../../../services/estudiantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrl: './lista-estudiantes.component.css'
})
export class ListaEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[] = [];  // Lista de estudiantes

  constructor(private estudianteService: EstudiantesService) {}

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  // Método para obtener todos los estudiantes
  obtenerEstudiantes(): void {
    this.estudianteService.getEstudiantes().subscribe(
      (data) => {
        this.estudiantes = data;
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }

  // Método para eliminar un estudiante
eliminarEstudiante(id: any): void 
{
  Swal.fire({
    title: "¿Eliminar?",
    text: "¿Esta seguro que desea eliminar el registro!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!"
  }).then((result) => {
    if (result.isConfirmed) 
    {
      this.estudianteService.deleteEstudiante(id).subscribe(
        () => 
        {
            this.estudiantes = this.estudiantes.filter(est => est.id !== id);
            //console.log(`Estudiante con ID ${id} eliminado`);
            Swal.fire({
              title: "Eliminado!",
              text: "El registro ha sido eliminado.",
              icon: "success"
            });
        },
        (error) => 
        {
            // Manejo del error
            console.error('Error al eliminar estudiante:', error);
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
