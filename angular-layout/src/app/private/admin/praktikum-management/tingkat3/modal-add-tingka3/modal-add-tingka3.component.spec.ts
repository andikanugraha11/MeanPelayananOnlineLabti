import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTingka3Component } from './modal-add-tingka3.component';

describe('ModalAddTingka3Component', () => {
  let component: ModalAddTingka3Component;
  let fixture: ComponentFixture<ModalAddTingka3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddTingka3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTingka3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
