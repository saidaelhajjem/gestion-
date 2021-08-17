import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeurEmployeComponent } from './employeur-employe.component';

describe('EmployeurEmployeComponent', () => {
  let component: EmployeurEmployeComponent;
  let fixture: ComponentFixture<EmployeurEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeurEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeurEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
