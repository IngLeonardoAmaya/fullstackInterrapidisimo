import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../../../interfaces/inscripcion';
import { InscripcionesService } from '../../../services/inscripciones.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-inscripcion',
  templateUrl: './lista-inscripcion.component.html',
  styleUrl: './lista-inscripcion.component.css'
})
export class ListaInscripcionComponent implements OnInit {
  inscripciones: Inscripcion[] = [];

  constructor(private inscripcionService: InscripcionesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.inscripcionService.getInscripciones().subscribe(
      (data) => this.inscripciones = data,
      (error) => this.toastr.error('Error al cargar las inscripciones')
    );
  }

  eliminarInscripcion(id: any): void {
    this.inscripcionService.deleteInscripcion(id).subscribe(
      () => {
        this.toastr.success('Inscripción eliminada con éxito');
        this.cargarInscripciones(); // Refrescar la lista
      },
      (error) => this.toastr.error('Error al eliminar la inscripción')
    );
  }
}
