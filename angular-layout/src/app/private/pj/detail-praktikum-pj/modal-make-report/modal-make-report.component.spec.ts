import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMakeReportComponent } from './modal-make-report.component';

describe('ModalMakeReportComponent', () => {
  let component: ModalMakeReportComponent;
  let fixture: ComponentFixture<ModalMakeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMakeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMakeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
