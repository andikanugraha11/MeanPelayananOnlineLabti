import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjReportCompleteComponent } from './pj-report-complete.component';

describe('PjReportCompleteComponent', () => {
  let component: PjReportCompleteComponent;
  let fixture: ComponentFixture<PjReportCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjReportCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjReportCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
