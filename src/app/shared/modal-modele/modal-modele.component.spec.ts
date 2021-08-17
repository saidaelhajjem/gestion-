import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModeleComponent } from './modal-modele.component';

describe('ModalModeleComponent', () => {
  let component: ModalModeleComponent;
  let fixture: ComponentFixture<ModalModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
