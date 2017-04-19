import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPraktikanComponent } from './modal-add-praktikan.component';

describe('ModalAddPraktikanComponent', () => {
  let component: ModalAddPraktikanComponent;
  let fixture: ComponentFixture<ModalAddPraktikanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddPraktikanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPraktikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
