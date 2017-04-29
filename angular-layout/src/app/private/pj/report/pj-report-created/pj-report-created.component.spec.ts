import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjReportCreatedComponent } from './pj-report-created.component';

describe('PjReportCreatedComponent', () => {
  let component: PjReportCreatedComponent;
  let fixture: ComponentFixture<PjReportCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjReportCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjReportCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
