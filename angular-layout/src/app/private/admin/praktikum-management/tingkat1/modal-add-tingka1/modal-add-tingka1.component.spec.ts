import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTingka1Component } from './modal-add-tingka1.component';

describe('ModalAddTingka1Component', () => {
  let component: ModalAddTingka1Component;
  let fixture: ComponentFixture<ModalAddTingka1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddTingka1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTingka1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
