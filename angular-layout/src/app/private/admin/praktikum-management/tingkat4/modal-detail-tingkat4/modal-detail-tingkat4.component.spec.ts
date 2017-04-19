import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailTingkat4Component } from './modal-detail-tingkat4.component';

describe('ModalDetailTingkat4Component', () => {
  let component: ModalDetailTingkat4Component;
  let fixture: ComponentFixture<ModalDetailTingkat4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailTingkat4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailTingkat4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
