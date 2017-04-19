import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPetugasComponent } from './modal-add-petugas.component';

describe('ModalAddPetugasComponent', () => {
  let component: ModalAddPetugasComponent;
  let fixture: ComponentFixture<ModalAddPetugasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddPetugasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPetugasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
