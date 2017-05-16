import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailPraktikanComponent } from './modal-detail-praktikan.component';

describe('ModalDetailPraktikanComponent', () => {
  let component: ModalDetailPraktikanComponent;
  let fixture: ComponentFixture<ModalDetailPraktikanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailPraktikanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailPraktikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
