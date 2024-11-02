import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profesor } from '../../../interfaces/profesor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MateriasService } from '../../../services/materias.service';
import { ProfesoresService } from '../../../services/profesores.service';
import { Materia } from '../../../interfaces/materia';

@Component({
  selector: 'app-editar-materias',
  templateUrl: './editar-materias.component.html',
  styleUrl: './editar-materias.component.css'
})
export class EditarMateriasComponent implements OnInit {
  editarMateriaForm: FormGroup;
  materiaId: number = 0;
  profesores: Profesor[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private materiasService: MateriasService,
    private profesoresService: ProfesoresService
  ) {
    this.editarMateriaForm = this.fb.group({
      nombre: ['', Validators.required],
      creditos: [3, [Validators.required, Validators.min(1)]],
      profesorId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.materiaId = +this.route.snapshot.paramMap.get('id')!;
    if (this.materiaId) {
      this.cargarMateria();
      this.cargarProfesores();
    } else {
      this.toastr.error('ID de materia no válido');
      this.router.navigate(['/lista-materias']);
    }
  }

  cargarMateria(): void {
    this.materiasService.getMateriaById(this.materiaId).subscribe(
      (data) => {
        this.editarMateriaForm.patchValue({
          nombre: data.nombre,
          creditos: data.creditos,
          profesorId: data.profesorId
        });
      },
      (error) => {
        this.toastr.error('No se pudo cargar la materia');
        console.error('Error al cargar la materia:', error);
      }
    );
  }

  cargarProfesores(): void {
    this.profesoresService.getProfesores().subscribe(
      (data) => this.profesores = data,
      (error) => this.toastr.error('Error al cargar los profesores')
    );
  }

  actualizarMateria(): void {
    if (this.editarMateriaForm.invalid) {
      this.toastr.error('Todos los campos son obligatorios');
      return;
    }

    const materia: Materia = {
      id: this.materiaId,
      nombre: this.editarMateriaForm.value.nombre,
      creditos: this.editarMateriaForm.value.creditos,
      profesorId: this.editarMateriaForm.value.profesorId
    };

    this.materiasService.updateMateria(this.materiaId, materia).subscribe(
      () => {
        this.toastr.success('Materia actualizada con éxito');
        this.router.navigate(['/lista-materias']);
      },
      (error) => {
        this.toastr.error('Error al actualizar la materia');
        console.error('Error al actualizar la materia:', error);
      }
    );
  }
}
