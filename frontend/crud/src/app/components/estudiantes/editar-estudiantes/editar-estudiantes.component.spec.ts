import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstudiantesComponent } from './editar-estudiantes.component';

describe('EditarEstudiantesComponent', () => {
  let component: EditarEstudiantesComponent;
  let fixture: ComponentFixture<EditarEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
