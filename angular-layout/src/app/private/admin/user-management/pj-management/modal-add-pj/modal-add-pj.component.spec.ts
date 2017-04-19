import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPjComponent } from './modal-add-pj.component';

describe('ModalAddPjComponent', () => {
  let component: ModalAddPjComponent;
  let fixture: ComponentFixture<ModalAddPjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddPjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
