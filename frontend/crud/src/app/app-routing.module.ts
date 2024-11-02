import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEstudiantesComponent } from './components/estudiantes/lista-estudiantes/lista-estudiantes.component';
import { CrearEstudiantesComponent } from './components/estudiantes/crear-estudiantes/crear-estudiantes.component';
import { EditarEstudiantesComponent } from './components/estudiantes/editar-estudiantes/editar-estudiantes.component';
import { ListaProfesoresComponent } from './components/profesores/lista-profesores/lista-profesores.component';
import { CrearProfesoresComponent } from './components/profesores/crear-profesores/crear-profesores.component';
import { EditarProfesoresComponent } from './components/profesores/editar-profesores/editar-profesores.component';
import { ListarMateriasComponent } from './components/materias/listar-materias/listar-materias.component';
import { CrearMateriasComponent } from './components/materias/crear-materias/crear-materias.component';
import { EditarMateriasComponent } from './components/materias/editar-materias/editar-materias.component';
import { ListaInscripcionComponent } from './components/inscripcion/lista-inscripcion/lista-inscripcion.component';
import { CrearInscripcionComponent } from './components/inscripcion/crear-inscripcion/crear-inscripcion.component';
import { EditarInscripcionComponent } from './components/inscripcion/editar-inscripcion/editar-inscripcion.component';

const routes: Routes = [
  //rutas a configurar
  //si el usuario no coloca nada
  { path:'', redirectTo:'lista-estudiantes', pathMatch:'full'},
  { path:'lista-estudiantes', component:ListaEstudiantesComponent},
  { path:'crear-estudiantes', component:CrearEstudiantesComponent},
  //se le va a pasar el parametro id para obtener por id y para editar
  { path:'editar-estudiantes/:id', component: EditarEstudiantesComponent },
  { path:'lista-profesores', component:ListaProfesoresComponent},
  { path:'crear-profesores', component:CrearProfesoresComponent},
  { path:'editar-profesores/:id', component:EditarProfesoresComponent},
  { path:'lista-materias', component:ListarMateriasComponent},
  { path:'crear-materias', component:CrearMateriasComponent},
  { path:'editar-materias/:id', component:EditarMateriasComponent},
  { path:'lista-inscripcion', component:ListaInscripcionComponent},
  { path:'crear-inscripcion', component:CrearInscripcionComponent},
  { path:'editar-inscripcion/:id', component:EditarInscripcionComponent},
  //si no es ninguna de estas rutas anteriores redirija al primer componente, siempre va a lo ultimo de todo
  { path:'**', redirectTo:'lista-estudiantes', pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
