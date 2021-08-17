import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesModelesComponent } from './gestion-des-modeles.component';

describe('GestionDesModelesComponent', () => {
  let component: GestionDesModelesComponent;
  let fixture: ComponentFixture<GestionDesModelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesModelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDesModelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
