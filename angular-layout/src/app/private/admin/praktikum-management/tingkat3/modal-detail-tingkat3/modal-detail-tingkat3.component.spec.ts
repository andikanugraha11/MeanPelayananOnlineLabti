import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailTingkat3Component } from './modal-detail-tingkat3.component';

describe('ModalDetailTingkat3Component', () => {
  let component: ModalDetailTingkat3Component;
  let fixture: ComponentFixture<ModalDetailTingkat3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailTingkat3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailTingkat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
