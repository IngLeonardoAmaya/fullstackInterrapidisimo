import { Component } from '@angular/core';
import { Profesor } from '../../../interfaces/profesor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfesoresService } from '../../../services/profesores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-profesores',
  templateUrl: './crear-profesores.component.html',
  styleUrl: './crear-profesores.component.css'
})
export class CrearProfesoresComponent {
  profesores: Profesor[] = [];
  crearProfesor:FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private profesorService: ProfesoresService,
    private router: Router)
  {
    this.crearProfesor = this.fb.group({
      nombre:['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  // Método para obtener estudiantes y llenar el arreglo
  obtenerEstudiantes(): void {
    this.profesorService.getProfesores().subscribe(
      (data) => this.profesores = data,
      (error) => console.error('Error al obtener profesores:', error)
    );
  }

  // Método para agregar un nuevo estudiante
  agregarEstudiante(): void 
  {
      if(this.crearProfesor.value.nombre == '')
      {
        this.toastr.error('el campo nombre es obligatorio');
        return;
      }
  
      if(this.crearProfesor.invalid)
      {
        this.toastr.error('los campos son obligatorios');
        return;
      }
      else
      {
        const profesor:Profesor = 
        {
          nombre: this.crearProfesor.value.nombre
        }

        this.profesorService.createProfesor(profesor).subscribe(
          (data) => 
          {
            this.profesores.push(data);
            this.toastr.success('profesor agregado con éxito');
            this.crearProfesor.reset();
            this.router.navigate(['/lista-profesores']); 
          },
          (error) => 
          {
            console.log(error);
            this.toastr.error('Error al agregar profesor:', error);
          }
        );
      }
    
  }

}
