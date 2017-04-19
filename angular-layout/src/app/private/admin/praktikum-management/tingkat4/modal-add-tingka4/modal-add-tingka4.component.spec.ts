import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTingka4Component } from './modal-add-tingka4.component';

describe('ModalAddTingka4Component', () => {
  let component: ModalAddTingka4Component;
  let fixture: ComponentFixture<ModalAddTingka4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddTingka4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTingka4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
