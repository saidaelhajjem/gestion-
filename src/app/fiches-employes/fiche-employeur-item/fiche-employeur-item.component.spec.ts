import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheEmployeurItemComponent } from './fiche-employeur-item.component';

describe('FicheEmployeurItemComponent', () => {
  let component: FicheEmployeurItemComponent;
  let fixture: ComponentFixture<FicheEmployeurItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheEmployeurItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheEmployeurItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
