import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { Estudiante } from '../../../interfaces/estudiante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-estudiantes',
  templateUrl: './crear-estudiantes.component.html',
  styleUrl: './crear-estudiantes.component.css'
})
export class CrearEstudiantesComponent implements OnInit
{
  estudiantes: Estudiante[] = [];
  crearEstudiante:FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private estudianteService: EstudiantesService,
    private router: Router)
  {
    this.crearEstudiante = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  // Método para obtener estudiantes y llenar el arreglo
  obtenerEstudiantes(): void {
    this.estudianteService.getEstudiantes().subscribe(
      (data) => this.estudiantes = data,
      (error) => console.error('Error al obtener estudiantes:', error)
    );
  }

  // Método para agregar un nuevo estudiante
  agregarEstudiante(): void 
  {
      if(this.crearEstudiante.value.nombre == '')
      {
        this.toastr.error('el campo nombre es obligatorio');
        return;
      }
  
      if(this.crearEstudiante.value.apellido == '')
      {
        this.toastr.error('el campo apellido es obligatorio');
        return;
      }
  
      if(this.crearEstudiante.invalid)
      {
        this.toastr.error('los campos son obligatorios');
        return;
      }
      else
      {
        const estudiante:Estudiante = 
        {
          nombre: this.crearEstudiante.value.nombre,
          apellidos: this.crearEstudiante.value.apellido
        }

        this.estudianteService.createEstudiante(estudiante).subscribe(
          (data) => 
          {
            this.estudiantes.push(data);
            this.toastr.success('Estudiante agregado con éxito');
            this.crearEstudiante.reset();
            this.router.navigate(['/lista-estudiantes']); 
          },
          (error) => 
          {
            console.log(error);
            this.toastr.error('Error al agregar estudiante:', error);
          }
        );
      }
    
  }

}
