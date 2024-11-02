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
  estudianteInscripciones: Inscripcion[] = [];
  estudiantesCompartidos: string[] = []; 


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
    },{ validators: this.validarReglasNegocio.bind(this) });
  }

  ngOnInit(): void {
    this.cargarListas();
  }

  onMateriaChange(materiaId: number): void {
    if (materiaId) {
      this.inscripcionService.getEstudiantesCompartidos(materiaId).subscribe(
        (data) => {
          this.estudiantesCompartidos = data;
        },
        (error) => {
          console.error('Error al cargar estudiantes compartidos:', error);
          this.toastr.error('Error al cargar estudiantes compartidos');
        }
      );
    }
  }

  validarReglasNegocio(formGroup: FormGroup) {
    const estudianteId = formGroup.get('estudianteId')?.value;
    const materiaId = formGroup.get('materiaId')?.value;
    const profesorId = formGroup.get('profesorId')?.value;

    if (estudianteId && materiaId && profesorId) {
      // Validación para que el estudiante solo pueda seleccionar 3 materias
      this.inscripcionService.getInscripciones().subscribe((inscripciones) => {
        this.estudianteInscripciones = inscripciones.filter(i => i.estudianteId === estudianteId);

        if (this.estudianteInscripciones.length >= 3) {
          formGroup.get('materiaId')?.setErrors({ limiteMaterias: 'El estudiante ya tiene 3 materias inscritas.' });
        } else {
          formGroup.get('materiaId')?.setErrors(null);
        }

        // Validación para que el estudiante no tenga clases con el mismo profesor
        if (this.estudianteInscripciones.some(i => i.profesorId === profesorId)) {
          formGroup.get('profesorId')?.setErrors({ profesorDuplicado: 'El estudiante ya tiene una materia con este profesor.' });
        } else {
          formGroup.get('profesorId')?.setErrors(null);
        }
      });
    }

    return null;
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
