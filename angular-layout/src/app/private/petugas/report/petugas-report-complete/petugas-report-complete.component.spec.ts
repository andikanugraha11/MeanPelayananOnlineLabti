import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetugasReportCompleteComponent } from './petugas-report-complete.component';

describe('PetugasReportCompleteComponent', () => {
  let component: PetugasReportCompleteComponent;
  let fixture: ComponentFixture<PetugasReportCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetugasReportCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetugasReportCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
