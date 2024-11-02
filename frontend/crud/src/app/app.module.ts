import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaEstudiantesComponent } from './components/estudiantes/lista-estudiantes/lista-estudiantes.component';
import { CrearEstudiantesComponent } from './components/estudiantes/crear-estudiantes/crear-estudiantes.component';
import { EditarEstudiantesComponent } from './components/estudiantes/editar-estudiantes/editar-estudiantes.component';
import { ListaProfesoresComponent } from './components/profesores/lista-profesores/lista-profesores.component';
import { EditarProfesoresComponent } from './components/profesores/editar-profesores/editar-profesores.component';
import { CrearProfesoresComponent } from './components/profesores/crear-profesores/crear-profesores.component';
import { CrearMateriasComponent } from './components/materias/crear-materias/crear-materias.component';
import { ListarMateriasComponent } from './components/materias/listar-materias/listar-materias.component';
import { EditarMateriasComponent } from './components/materias/editar-materias/editar-materias.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditarInscripcionComponent } from './components/inscripcion/editar-inscripcion/editar-inscripcion.component';
import { CrearInscripcionComponent } from './components/inscripcion/crear-inscripcion/crear-inscripcion.component';
import { ListaInscripcionComponent } from './components/inscripcion/lista-inscripcion/lista-inscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaEstudiantesComponent,
    CrearEstudiantesComponent,
    EditarEstudiantesComponent,
    ListaProfesoresComponent,
    EditarProfesoresComponent,
    CrearProfesoresComponent,
    CrearMateriasComponent,
    ListarMateriasComponent,
    EditarMateriasComponent,
    NavbarComponent,
    ListaInscripcionComponent,
    EditarInscripcionComponent,
    CrearInscripcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
