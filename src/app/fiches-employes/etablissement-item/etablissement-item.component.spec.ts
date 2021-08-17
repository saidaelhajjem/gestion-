import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementItemComponent } from './etablissement-item.component';

describe('EtablissementItemComponent', () => {
  let component: EtablissementItemComponent;
  let fixture: ComponentFixture<EtablissementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtablissementItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
