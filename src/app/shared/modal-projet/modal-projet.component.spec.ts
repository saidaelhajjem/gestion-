import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProjetComponent } from './modal-projet.component';

describe('ModalProjetComponent', () => {
  let component: ModalProjetComponent;
  let fixture: ComponentFixture<ModalProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
