import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUploadPraktikanComponent } from './modal-add-upload-praktikan.component';

describe('ModalAddUploadPraktikanComponent', () => {
  let component: ModalAddUploadPraktikanComponent;
  let fixture: ComponentFixture<ModalAddUploadPraktikanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddUploadPraktikanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUploadPraktikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
