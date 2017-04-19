import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailTingkat2Component } from './modal-detail-tingkat2.component';

describe('ModalDetailTingkat2Component', () => {
  let component: ModalDetailTingkat2Component;
  let fixture: ComponentFixture<ModalDetailTingkat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailTingkat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailTingkat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
