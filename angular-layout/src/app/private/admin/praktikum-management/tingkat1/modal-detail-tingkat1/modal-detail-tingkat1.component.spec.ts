import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailTingkat1Component } from './modal-detail-tingkat1.component';

describe('ModalDetailTingkat1Component', () => {
  let component: ModalDetailTingkat1Component;
  let fixture: ComponentFixture<ModalDetailTingkat1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailTingkat1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailTingkat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
