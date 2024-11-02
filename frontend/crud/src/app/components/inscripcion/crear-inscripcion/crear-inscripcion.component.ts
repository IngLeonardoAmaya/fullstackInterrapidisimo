import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscripcionesService } from '../../../services/inscripciones.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Estudiante } from '../../../interfaces/estudiante';
import { Materia } from '../../../interfaces/materia';
import { Profesor } from '../../../interfaces/profesor';
import { Inscripcion } from '../../../interfaces/inscripcion';

@Component({
  selector: 'app-crear-inscripcion',
  templateUrl: './crear-inscripcion.component.html',
  styleUrl: './crear-inscripcion.component.css'
})
export class CrearInscripcionComponent implements OnInit {
  inscripcionForm: FormGroup;
  estudiantes: Estudiante[] = [];
  materias: Materia[] = [];
  profesores: Profesor[] = [];

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.inscripcionForm = this.fb.group({
      estudianteId: [null, Validators.required],
      materiaId: [null, Validators.required],
      profesorId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarListas();
  }

  cargarListas(): void {
    this.inscripcionService.getEstudiantes().subscribe((data) => (this.estudiantes = data));
    this.inscripcionService.getMaterias().subscribe((data) => (this.materias = data));
    this.inscripcionService.getProfesores().subscribe((data) => (this.profesores = data));
  }

  crearInscripcion(): void {
    if (this.inscripcionForm.invalid) {
      this.toastr.error('Todos los campos son obligatorios');
      return;
    }

    const inscripcion: Inscripcion = this.inscripcionForm.value;

    this.inscripcionService.createInscripcion(inscripcion).subscribe(
      () => {
        this.toastr.success('Inscripción creada con éxito');
        this.router.navigate(['/lista-inscripcion']);
      },
      (error) => {
        console.error('Error al crear inscripción:', error);
        this.toastr.error('Error al crear inscripción');
      }
    );
  }

}