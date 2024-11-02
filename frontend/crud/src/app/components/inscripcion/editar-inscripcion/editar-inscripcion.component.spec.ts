import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInscripcionComponent } from './editar-inscripcion.component';

describe('EditarInscripcionComponent', () => {
  let component: EditarInscripcionComponent;
  let fixture: ComponentFixture<EditarInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarInscripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
