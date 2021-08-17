import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichesEmployesComponent } from './fiches-employes.component';

describe('FichesEmployesComponent', () => {
  let component: FichesEmployesComponent;
  let fixture: ComponentFixture<FichesEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichesEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichesEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
