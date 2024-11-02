import { Component, OnInit } from '@angular/core';
import { Materia } from '../../../interfaces/materia';
import { MateriasService } from '../../../services/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-materias',
  templateUrl: './listar-materias.component.html',
  styleUrl: './listar-materias.component.css'
})
export class ListarMateriasComponent implements OnInit {
  materias: Materia[] = [];  // Lista de materias

  constructor(private materiaService: MateriasService) {}

  ngOnInit(): void {
    this.obtenerMaterias();
  }

  // Método para obtener todas las materias
  obtenerMaterias(): void {
    this.materiaService.getMaterias().subscribe(
      (data) => {
        this.materias = data;
      },
      (error) => {
        console.error('Error al obtener materias:', error);
      }
    );
  }

  // Método para eliminar una materia
  eliminarMateria(id: any): void {
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
        this.materiaService.deleteMateria(id).subscribe(
          () => {
            this.materias = this.materias.filter(materia => materia.id !== id);
            Swal.fire({
              title: "Eliminado!",
              text: "El registro ha sido eliminado.",
              icon: "success"
            });
          },
          (error) => {
            console.error('Error al eliminar materia:', error);
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
