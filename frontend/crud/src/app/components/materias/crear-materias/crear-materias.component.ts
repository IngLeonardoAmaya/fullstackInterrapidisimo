import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriasService } from '../../../services/materias.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesoresService } from '../../../services/profesores.service';
import { Profesor } from '../../../interfaces/profesor';
import { Materia } from '../../../interfaces/materia';

@Component({
  selector: 'app-crear-materias',
  templateUrl: './crear-materias.component.html',
  styleUrl: './crear-materias.component.css'
})
export class CrearMateriasComponent {
  materiaForm: FormGroup;
  materiaId?: number;
  profesores: Profesor[] = [];

  constructor(
    private fb: FormBuilder,
    private materiaService: MateriasService,
    private profesorService: ProfesoresService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required],
      creditos: [3, [Validators.required, Validators.min(1)]],
      profesorId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.materiaId = +this.route.snapshot.paramMap.get('id')!;
    if (this.materiaId) {
      this.cargarMateria();
    }
    this.cargarProfesores(); 
  }

  // Cargar los profesores para el dropdown
  cargarProfesores(): void {
    this.profesorService.getProfesores().subscribe(
      (data) => this.profesores = data,
      (error) => this.toastr.error('Error al cargar los profesores')
    );
  }

  cargarMateria(): void {
    this.materiaService.getMateriaById(this.materiaId!).subscribe(
      (data) => this.materiaForm.patchValue(data),
      (error) => this.toastr.error('Error al cargar la materia')
    );
  }

  guardarMateria(): void {
    const profesorId = Number(this.materiaForm.get('profesorId')?.value);
    if (isNaN(profesorId) || profesorId <= 0) {
        this.toastr.error('Por favor, seleccione un profesor válido.');
        return;
    }

    const materia: Materia = {
        nombre: this.materiaForm.get('nombre')?.value,
        creditos: 3,
        profesorId: profesorId
    };

    console.log('Datos enviados:', JSON.stringify(materia));

    this.materiaService.createMateria(materia).subscribe(
        () => {
            this.toastr.success('Materia creada con éxito');
            this.router.navigate(['/lista-materias']);
        },
        (error) => {
            console.error('Error al crear la materia:', error);
            if (error.error && error.error.errors) {
                this.toastr.error('Error de validación: ' + JSON.stringify(error.error.errors));
            } else {
                this.toastr.error('Error al crear la materia');
            }
        }
    );
  }
}
