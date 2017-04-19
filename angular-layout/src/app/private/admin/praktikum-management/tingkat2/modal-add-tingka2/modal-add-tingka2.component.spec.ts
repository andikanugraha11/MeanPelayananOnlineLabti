import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTingka2Component } from './modal-add-tingka2.component';

describe('ModalAddTingka2Component', () => {
  let component: ModalAddTingka2Component;
  let fixture: ComponentFixture<ModalAddTingka2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddTingka2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTingka2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
