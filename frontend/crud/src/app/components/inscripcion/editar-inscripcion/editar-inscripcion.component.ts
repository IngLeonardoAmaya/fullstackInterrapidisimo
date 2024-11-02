import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../../services/inscripciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../../interfaces/estudiante';
import { Materia } from '../../../interfaces/materia';
import { Profesor } from '../../../interfaces/profesor';
import { Inscripcion } from '../../../interfaces/inscripcion';

@Component({
  selector: 'app-editar-inscripcion',
  templateUrl: './editar-inscripcion.component.html',
  styleUrl: './editar-inscripcion.component.css'
})
export class EditarInscripcionComponent implements OnInit{
  inscripcionForm: FormGroup;
  estudiantes: Estudiante[] = [];
  materias: Materia[] = [];
  profesores: Profesor[] = [];
  inscripcionId: number;

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inscripcionForm = this.fb.group({
      estudianteId: [null, Validators.required],
      materiaId: [null, Validators.required],
      profesorId: [null, Validators.required]
    });

    // Obtener el ID de la inscripción desde la URL
    this.inscripcionId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.cargarListas();
    this.cargarInscripcion();
  }

  cargarListas(): void {
    this.inscripcionService.getEstudiantes().subscribe((data) => (this.estudiantes = data));
    this.inscripcionService.getMaterias().subscribe((data) => (this.materias = data));
    this.inscripcionService.getProfesores().subscribe((data) => (this.profesores = data));
  }

  cargarInscripcion(): void {
    this.inscripcionService.getInscripcionById(this.inscripcionId).subscribe(
      (inscripcion) => {
        this.inscripcionForm.patchValue({
          estudianteId: inscripcion.estudianteId,
          materiaId: inscripcion.materiaId,
          profesorId: inscripcion.profesorId
        });
      },
      (error) => {
        this.toastr.error('Error al cargar la inscripción');
        console.error('Error al cargar inscripción:', error);
      }
    );
  }

  actualizarInscripcion(): void {
    if (this.inscripcionForm.invalid) {
      this.toastr.error('Todos los campos son obligatorios');
      return;
    }

    const inscripcion: Inscripcion = {
      ...this.inscripcionForm.value,
      id: this.inscripcionId
    };

    this.inscripcionService.updateInscripcion(this.inscripcionId, inscripcion).subscribe(
      () => {
        this.toastr.success('Inscripción actualizada con éxito');
        this.router.navigate(['/lista-inscripcion']);
      },
      (error) => {
        console.error('Error al actualizar inscripción:', error);
        this.toastr.error('Error al actualizar inscripción');
      }
    );
  }
}
