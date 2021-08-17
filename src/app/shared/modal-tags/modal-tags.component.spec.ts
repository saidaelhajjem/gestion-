import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTagsComponent } from './modal-tags.component';

describe('ModalTagsComponent', () => {
  let component: ModalTagsComponent;
  let fixture: ComponentFixture<ModalTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
