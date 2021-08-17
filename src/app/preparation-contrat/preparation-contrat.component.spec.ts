import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationContratComponent } from './preparation-contrat.component';

describe('PreparationContratComponent', () => {
  let component: PreparationContratComponent;
  let fixture: ComponentFixture<PreparationContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparationContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
