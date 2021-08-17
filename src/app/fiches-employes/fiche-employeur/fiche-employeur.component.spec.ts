import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEmployeurComponent } from './fiche-employeur.component';

describe('FicheEmployeurComponent', () => {
  let component: FicheEmployeurComponent;
  let fixture: ComponentFixture<FicheEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FicheEmployeurComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
