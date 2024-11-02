import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfesoresService } from '../../../services/profesores.service';
import { Profesor } from '../../../interfaces/profesor';

@Component({
  selector: 'app-editar-profesores',
  templateUrl: './editar-profesores.component.html',
  styleUrl: './editar-profesores.component.css'
})
export class EditarProfesoresComponent implements OnInit {
  editarProfesorForm: FormGroup;
  profesorId: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private profesorService: ProfesoresService
  ) {
    this.editarProfesorForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde la URL
    this.profesorId = +this.route.snapshot.paramMap.get('id')!;
    if (this.profesorId) {
      this.cargarProfesor();
    } else {
      this.toastr.error('ID de profesor no válido');
      this.router.navigate(['/lista-profesores']); // Redirige si el ID es inválido
    }
    this.cargarProfesor();
  }

  // Cargar datos del estudiante en el formulario
  cargarProfesor(): void {
    this.profesorService.getProfesorById(this.profesorId).subscribe(
      (data) => {
        this.editarProfesorForm.patchValue({
          nombre: data.nombre
        });
      },
      (error) => {
        console.error('Error al cargar profesor:', error);
        this.toastr.error('No se pudo cargar el profesor');
      }
    );
  }

  // Método para actualizar el estudiante
  actualizarProfesor(): void {
    if (this.editarProfesorForm.invalid) {
      this.toastr.error('Todos los campos son obligatorios');
      return;
    }

    const profesor: Profesor = {
      id: this.profesorId,
      nombre: this.editarProfesorForm.value.nombre
    };

    this.profesorService.updateProfesor(this.profesorId, profesor).subscribe(
      () => {
        this.toastr.success('Profesor actualizado con éxito');
        this.router.navigate(['/lista-profesores']);  // Redirige a la lista de estudiantes
      },
      (error) => {
        console.error('Error al actualizar profesor:', error);
        this.toastr.error('Error al actualizar profesor');
      }
    );
  }

}
