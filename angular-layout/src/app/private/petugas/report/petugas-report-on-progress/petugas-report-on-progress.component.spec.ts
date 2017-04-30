import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetugasReportOnProgressComponent } from './petugas-report-on-progress.component';

describe('PetugasReportOnProgressComponent', () => {
  let component: PetugasReportOnProgressComponent;
  let fixture: ComponentFixture<PetugasReportOnProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetugasReportOnProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetugasReportOnProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
