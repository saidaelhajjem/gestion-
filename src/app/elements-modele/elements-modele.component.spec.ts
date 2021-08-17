import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsModeleComponent } from './elements-modele.component';

describe('ElementsModeleComponent', () => {
  let component: ElementsModeleComponent;
  let fixture: ComponentFixture<ElementsModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
