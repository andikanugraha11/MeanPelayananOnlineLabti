import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailPraktikumComponent } from './modal-detail-praktikum.component';

describe('ModalDetailPraktikumComponent', () => {
  let component: ModalDetailPraktikumComponent;
  let fixture: ComponentFixture<ModalDetailPraktikumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailPraktikumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailPraktikumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
