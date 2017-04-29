import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjReportOnProgressComponent } from './pj-report-on-progress.component';

describe('PjReportOnProgressComponent', () => {
  let component: PjReportOnProgressComponent;
  let fixture: ComponentFixture<PjReportOnProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjReportOnProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjReportOnProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
