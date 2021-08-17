import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetsEnCoursComponent } from './projets-en-cours.component';

describe('ProjetsEnCoursComponent', () => {
  let component: ProjetsEnCoursComponent;
  let fixture: ComponentFixture<ProjetsEnCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetsEnCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetsEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
