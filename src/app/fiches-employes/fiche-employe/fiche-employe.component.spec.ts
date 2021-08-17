import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEmployeComponent } from './fiche-employe.component';

describe('FicheEmployeComponent', () => {
  let component: FicheEmployeComponent;
  let fixture: ComponentFixture<FicheEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FicheEmployeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
