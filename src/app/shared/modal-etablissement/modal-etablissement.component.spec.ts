import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEtablissementComponent } from './modal-etablissement.component';

describe('ModalEtablissementComponent', () => {
  let component: ModalEtablissementComponent;
  let fixture: ComponentFixture<ModalEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEtablissementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
