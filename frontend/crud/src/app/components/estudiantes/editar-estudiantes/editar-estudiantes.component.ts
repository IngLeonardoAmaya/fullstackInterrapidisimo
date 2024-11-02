import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { Estudiante } from '../../../interfaces/estudiante';

@Component({
  selector: 'app-editar-estudiantes',
  templateUrl: './editar-estudiantes.component.html',
  styleUrl: './editar-estudiantes.component.css'
})
export class EditarEstudiantesComponent implements OnInit
{
  editarEstudianteForm: FormGroup;
  estudianteId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private estudianteService: EstudiantesService
  ) {
    this.editarEstudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde la URL
    this.estudianteId = +this.route.snapshot.paramMap.get('id')!;
    if (this.estudianteId) {
      this.cargarEstudiante();
    } else {
      this.toastr.error('ID de estudiante no válido');
      this.router.navigate(['/lista-estudiantes']); // Redirige si el ID es inválido
    }
    this.cargarEstudiante();
  }

  // Cargar datos del estudiante en el formulario
  cargarEstudiante(): void {
    this.estudianteService.getEstudianteById(this.estudianteId).subscribe(
      (data) => {
        this.editarEstudianteForm.patchValue({
          nombre: data.nombre,
          apellidos: data.apellidos
        });
      },
      (error) => {
        console.error('Error al cargar estudiante:', error);
        this.toastr.error('No se pudo cargar el estudiante');
      }
    );
  }

  // Método para actualizar el estudiante
  actualizarEstudiante(): void {
    if (this.editarEstudianteForm.invalid) {
      this.toastr.error('Todos los campos son obligatorios');
      return;
    }

    const estudiante: Estudiante = {
      id: this.estudianteId,
      nombre: this.editarEstudianteForm.value.nombre,
      apellidos: this.editarEstudianteForm.value.apellidos
    };

    this.estudianteService.updateEstudiante(this.estudianteId, estudiante).subscribe(
      () => {
        this.toastr.success('Estudiante actualizado con éxito');
        this.router.navigate(['/lista-estudiantes']);  // Redirige a la lista de estudiantes
      },
      (error) => {
        console.error('Error al actualizar estudiante:', error);
        this.toastr.error('Error al actualizar estudiante');
      }
    );
  }

}
