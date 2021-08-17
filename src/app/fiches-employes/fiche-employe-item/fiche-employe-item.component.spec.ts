import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEmployeItemComponent } from './fiche-employe-item.component';

describe('FicheEmployeItemComponent', () => {
  let component: FicheEmployeItemComponent;
  let fixture: ComponentFixture<FicheEmployeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheEmployeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEmployeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
