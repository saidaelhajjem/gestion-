import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployeurComponent } from './modal-employeur.component';

describe('ModalEmployeurComponent', () => {
  let component: ModalEmployeurComponent;
  let fixture: ComponentFixture<ModalEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEmployeurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
